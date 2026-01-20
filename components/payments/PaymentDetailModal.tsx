"use client";

import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/index"; // make sure this points to your store entry

interface Item {
  name: string;
  qty: string;
  price: string;
}

interface PaymentDetailModalProps {
  open: boolean;
  onClose: () => void;
  invoiceNumber: string; // payment ID
  description: string;
  issuedOn: string;
  dueOn: string;
  recipient: string;
  recipientAddress: string;
  items: Item[];
  total: number;
}

export default function PaymentDetailModal({
  open,
  onClose,
  invoiceNumber,
  description,
  issuedOn,
  dueOn,
  recipient,
  recipientAddress,
  items,
  total,
}: PaymentDetailModalProps) {
  const [notes, setNotes] = useState("");

  // Get company info from Redux
  const companyInfo = useSelector((state: RootState) => ({
    name: state.payment.companyInfo.name,
    address: state.payment.companyInfo.address,
    logoUrl: state.payment.companyInfo.logoUrl,
  }));

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl p-8 relative overflow-y-auto max-h-[90vh] flex flex-col">
          
          {/* Header */}
          <div className="flex justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-black">{invoiceNumber}</h1>
              <p className="text-base font-medium text-black mt-1">{description}</p>
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

            {/* Company info */}
            <div className="text-right flex flex-col items-end">
              {companyInfo.logoUrl && (
                <img
                  src={companyInfo.logoUrl}
                  alt="Company Logo"
                  className="w-20 h-20 object-contain mb-2"
                />
              )}
              <p className="font-semibold text-black">{companyInfo.name}</p>
              <p className="text-sm text-black">{companyInfo.address}</p>
            </div>
          </div>

          {/* Recipient */}
          <div className="mb-6 text-base text-black">
            <p className="font-semibold mb-1">Payment to:</p>
            <p>{recipient}</p>
            <p>{recipientAddress}</p>
          </div>

          {/* Items Table */}
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
                      <td className="py-3 text-black">{item.name}</td>
                      <td className="py-3 text-center text-black">{item.qty}</td>
                      <td className="py-3 text-center text-black">${item.price}</td>
                      <td className="py-3 text-right text-black">${lineTotal.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Notes + Total */}
          <div className="flex justify-between items-start mb-6 gap-4">
            <textarea
              className="flex-1 border rounded p-2 text-base text-black placeholder-gray-400 resize-none"
              placeholder="Add notes about this payment..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
            <div className="flex-shrink-0 flex flex-col justify-start text-xl font-bold text-black">
              <span>Total: ${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto flex justify-between items-start pt-6 border-t">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-blue-600 font-medium cursor-pointer hover:underline">
                <ArrowDownTrayIcon className="w-5 h-5" />
                DOWNLOAD PAYMENT
              </div>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-black text-black rounded bg-white hover:bg-gray-100 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
