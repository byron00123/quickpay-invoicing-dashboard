"use client";

import { useSelector } from "react-redux";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { RootState } from "@/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client"; // Supabase client

interface Item {
  name: string;
  qty: string;
  price: string;
}

interface PreviewInvoiceModalProps {
  open: boolean;
  onClose: () => void;
  invoiceNumber: string;
  description: string;
  issuedOn: string;
  dueOn: string;
  recipient: string;
  recipientAddress: string;
  items: Item[];
  notes?: string;
  total: number;
}

interface CompanyInfo {
  name: string;
  logo_url: string;
  brand_color: string;
}

export default function PreviewInvoiceModal({
  open,
  onClose,
  invoiceNumber,
  description,
  issuedOn,
  dueOn,
  recipient,
  recipientAddress,
  items,
  notes,
  total,
}: PreviewInvoiceModalProps) {
  const { logoUrl, brandColor, companyName } = useSelector(
    (state: RootState) => state.settings
  );

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: companyName || "Your Company",
    logo_url: logoUrl || "https://via.placeholder.com/80",
    brand_color: brandColor || "#3b82f6",
  });

  // Fetch company info from Supabase if you want real-time data
  useEffect(() => {
    async function fetchCompanyInfo() {
      const { data, error } = await supabase
        .from("company_settings")
        .select("*")
        .single();

      if (data && !error) {
        setCompanyInfo({
          name: data.name || companyName || "Your Company",
          logo_url: data.logo_url || logoUrl || "https://via.placeholder.com/80",
          brand_color: data.brand_color || brandColor || "#3b82f6",
        });
      }
    }

    fetchCompanyInfo();
  }, [companyName, logoUrl, brandColor]);

  if (!open) return null;

  const { name: displayCompanyName, logo_url: companyLogoUrl, brand_color: primaryColor } =
    companyInfo;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl p-8 relative overflow-y-auto max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex justify-between mb-4">
            {/* Left */}
            <div>
              <h1 className="text-2xl font-bold text-black">{invoiceNumber}</h1>
              <p className="text-base text-black mt-1">{description}</p>

              <div className="flex gap-6 mt-2 text-base text-black">
                <div className="flex flex-col">
                  <span className="font-semibold">Issued on</span>
                  <span>{issuedOn}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">Due on</span>
                  <span>{dueOn}</span>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="text-right flex flex-col items-end">
              <img
                src={companyLogoUrl}
                alt="Company Logo"
                className="w-20 h-20 object-contain mb-2"
              />
              <p className="font-semibold" style={{ color: primaryColor }}>
                {displayCompanyName}
              </p>
            </div>
          </div>

          {/* Recipient */}
          <div className="mb-6 text-base text-black">
            <p className="font-semibold mb-1">Invoice for:</p>
            <p>{recipient}</p>
            <p>{recipientAddress}</p>
          </div>

          {/* Items */}
          <div className="bg-gray-50 rounded-lg shadow p-4 mb-4 overflow-x-auto">
            <table className="w-full border-collapse text-base text-black">
              <thead>
                <tr>
                  <th className="border-b py-3 text-left">Item</th>
                  <th className="border-b py-3 text-center">Qty</th>
                  <th className="border-b py-3 text-center">Price</th>
                  <th className="border-b py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => {
                  const lineTotal =
                    (parseFloat(item.qty) || 0) * (parseFloat(item.price) || 0);
                  return (
                    <tr key={idx}>
                      <td className="py-3">{item.name}</td>
                      <td className="py-3 text-center">{item.qty}</td>
                      <td className="py-3 text-center">${item.price}</td>
                      <td className="py-3 text-right">${lineTotal.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Notes + Total */}
          <div className="flex justify-between items-start mb-6 gap-4">
            <div className="flex-1 border rounded p-3 text-black min-h-[96px]">
              <p className="font-semibold mb-1">Notes</p>
              <p className="text-sm whitespace-pre-wrap">
                {notes || "No additional notes provided."}
              </p>
            </div>

            <div className="flex-shrink-0 text-xl font-bold text-black">
              Total: ${total.toFixed(2)}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto flex justify-between items-start pt-6 border-t">
            <div className="flex flex-col gap-1">
              <div
                className="flex items-center gap-2 font-medium cursor-pointer hover:underline"
                style={{ color: primaryColor }}
              >
                <ArrowDownTrayIcon className="w-5 h-5" />
                DOWNLOAD INVOICE
              </div>

              <p className="text-sm text-black">
                Update logo and brand color in{" "}
                <Link
                  href="/dashboard/settings"
                  className="font-medium hover:underline"
                  style={{ color: primaryColor }}
                >
                  payment settings
                </Link>
                .
              </p>
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 border border-black rounded bg-white hover:bg-gray-100 font-medium text-black"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
