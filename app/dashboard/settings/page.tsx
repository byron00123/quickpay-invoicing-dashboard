"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { setCompanyName, setLogo, setBrandColor } from "@/store/settingsSlice";
import NotificationBell from "@/components/notification/NotificationBell";
import ProfileDropdown from "@/components/Profile/ProfileDropdown";

export default function SettingsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const settings = useSelector((state: RootState) => state.settings);

  const [companyName, setCompanyNameLocal] = useState(settings.companyName);
  const [logoUrl, setLogoUrl] = useState(settings.logoUrl);
  const [brandColor, setBrandColorLocal] = useState(settings.brandColor);
  const [loading, setLoading] = useState(true);

  // Load saved settings from localStorage on mount
  useEffect(() => {
    const savedLogo = localStorage.getItem("companyLogo");
    const savedName = localStorage.getItem("companyName");
    const savedColor = localStorage.getItem("brandColor");

    if (savedLogo) {
      setLogoUrl(savedLogo);
      dispatch(setLogo(savedLogo));
    }

    if (savedName) {
      setCompanyNameLocal(savedName);
      dispatch(setCompanyName(savedName));
    }

    if (savedColor) {
      setBrandColorLocal(savedColor);
      dispatch(setBrandColor(savedColor));
    }

    setLoading(false);
  }, [dispatch]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      setLogoUrl(url);
      dispatch(setLogo(url));
      localStorage.setItem("companyLogo", url);
    };
    reader.readAsDataURL(file);
  };

  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCompanyNameLocal(value);
    dispatch(setCompanyName(value));
    localStorage.setItem("companyName", value);
  };

  const handleBrandColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBrandColorLocal(value);
    dispatch(setBrandColor(value));
    localStorage.setItem("brandColor", value);
  };

  if (loading) return <p className="p-6 text-black">Loading settings...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-6">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <div className="flex items-center gap-4">
          <NotificationBell />
          <ProfileDropdown />
        </div>
      </div>

      {/* Centered Content */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-lg flex flex-col gap-8">
          {/* Page Header */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Company Branding</h2>
            <p className="text-gray-700 text-sm">
              This information appears on invoices and payment pages.
            </p>
          </div>

          {/* Company Name */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-900">Company Name</label>
            <input
              type="text"
              value={companyName}
              onChange={handleCompanyNameChange}
              className="border border-gray-300 rounded px-3 py-2 text-gray-900"
              placeholder="Your company name"
            />
          </div>

          {/* Logo */}
          <div className="flex flex-col gap-3">
            <label className="font-semibold text-gray-900">Company Logo</label>
            <label className="w-44 px-4 py-2 border border-gray-300 rounded text-gray-900 cursor-pointer text-center hover:bg-gray-100">
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
            <label className="font-semibold text-gray-900">Brand Color</label>
            <input
              type="color"
              value={brandColor}
              onChange={handleBrandColorChange}
              className="w-20 h-12 border rounded cursor-pointer"
            />
          </div>

          {/* Live Preview */}
          <div className="flex flex-col gap-3">
            <p className="font-semibold text-gray-900">Live Preview</p>
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
                <p className="text-gray-700 text-sm">Powered by QuickPay</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
