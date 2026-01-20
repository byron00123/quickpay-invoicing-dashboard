"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  setCompanyName,
  setLogo,
  setBrandColor,
} from "@/store/settingsSlice";
import { supabase } from "@/lib/supabase/client";

export default function SettingsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const settings = useSelector((state: RootState) => state.settings);

  const [companyId, setCompanyId] = useState<string | null>(null);
  const [companyName, setCompanyNameLocal] = useState(settings.companyName);
  const [logoUrl, setLogoUrl] = useState(settings.logoUrl);
  const [brandColor, setBrandColorLocal] = useState(settings.brandColor);
  const [loading, setLoading] = useState(true);

  /**
   * 1️⃣ Load company from Supabase (or create if none exists)
   */
  useEffect(() => {
    const loadCompany = async () => {
      setLoading(true);

      try {
        // Get currently logged-in user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
          console.error("User not logged in:", userError);
          setLoading(false);
          return;
        }

        // Try to fetch existing company
        const { data: existingCompany, error: fetchError } = await supabase
          .from("companies")
          .select("*")
          .eq("user_id", user.id)
          .single();

        let company = existingCompany;

        // If company does not exist → create it
        if (fetchError || !existingCompany) {
          const { data: newCompany, error: insertError } = await supabase
            .from("companies")
            .insert({
              user_id: user.id,
              name: "My Company",
              brand_color: "#3b82f6",
              logo_url: "",
            })
            .select()
            .single();

          if (insertError) throw insertError;
          company = newCompany;
        }

        // Sync state & Redux
        setCompanyId(company.id);
        setCompanyNameLocal(company.name || "");
        setLogoUrl(company.logo_url || "");
        setBrandColorLocal(company.brand_color || "#3b82f6");

        dispatch(setCompanyName(company.name || ""));
        dispatch(setLogo(company.logo_url || ""));
        dispatch(setBrandColor(company.brand_color || "#3b82f6"));
      } catch (err) {
        console.error("Error loading company:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCompany();
  }, [dispatch]);

  /**
   * 2️⃣ Save updates to Supabase
   */
  const saveCompany = async (updates: {
    name?: string;
    logo_url?: string;
    brand_color?: string;
  }) => {
    if (!companyId) return;

    const { error } = await supabase
      .from("companies")
      .update(updates)
      .eq("id", companyId);

    if (error) console.error("Error saving company:", error);
  };

  /**
   * 3️⃣ Handle logo upload (reads file as base64 for now)
   */
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const url = reader.result as string;
      setLogoUrl(url);
      dispatch(setLogo(url));
      await saveCompany({ logo_url: url });
    };
    reader.readAsDataURL(file);
  };

  if (loading) {
    return <p className="p-6 text-black">Loading settings...</p>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-black">Company Branding</h1>
        <p className="text-black text-sm mt-1">
          This information appears on invoices and payment pages.
        </p>
      </div>

      {/* Company Name */}
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-black">Company Name</label>
        <input
          type="text"
          value={companyName}
          onChange={async (e) => {
            const value = e.target.value;
            setCompanyNameLocal(value);
            dispatch(setCompanyName(value));
            await saveCompany({ name: value });
          }}
          className="border border-black rounded px-3 py-2 text-black"
        />
      </div>

      {/* Logo */}
      <div className="flex flex-col gap-3">
        <label className="font-semibold text-black">Company Logo</label>
        <label className="w-44 px-4 py-2 border border-black rounded text-black cursor-pointer text-center hover:bg-gray-100">
          {logoUrl ? "Change Logo" : "Choose Logo"}
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="hidden"
          />
        </label>

        {logoUrl && (
          <div className="w-40 h-40 border rounded flex items-center justify-center">
            <img src={logoUrl} alt="Logo preview" className="object-contain w-full h-full" />
          </div>
        )}
      </div>

      {/* Brand Color */}
      <div className="flex flex-col gap-3">
        <label className="font-semibold text-black">Brand Color</label>
        <input
          type="color"
          value={brandColor}
          onChange={async (e) => {
            const value = e.target.value;
            setBrandColorLocal(value);
            dispatch(setBrandColor(value));
            await saveCompany({ brand_color: value });
          }}
          className="w-20 h-12 border rounded cursor-pointer"
        />
      </div>

      {/* Live Preview */}
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-black">Live Preview</p>
        <div className="flex items-center gap-4 p-4 border rounded" style={{ borderColor: brandColor }}>
          {logoUrl ? (
            <img src={logoUrl} className="w-20 h-20 object-contain" />
          ) : (
            <div className="w-20 h-20 bg-gray-200 flex items-center justify-center font-bold">Logo</div>
          )}
          <div>
            <h2 className="font-bold text-xl" style={{ color: brandColor }}>
              {companyName || "Your Company"}
            </h2>
            <p className="text-black text-sm">Powered by QuickPay</p>
          </div>
        </div>
      </div>
    </div>
  );
}
