"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";

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
  total: number;
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
  total,
}: PreviewInvoiceModalProps) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative overflow-y-auto max-h-full">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded"
          >
            <XMarkIcon className="w-5 h-5 text-black" />
          </button>

          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-xl font-bold">{invoiceNumber}</h1>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
            <div className="text-right text-sm text-gray-600">
              <p>Issued on: {issuedOn}</p>
              <p>Due on: {dueOn}</p>
            </div>
          </div>

          {/* Recipient */}
          <div className="mb-4 text-sm">
            <p className="font-medium">Invoice for:</p>
            <p>{recipient}</p>
            <p>{recipientAddress}</p>
          </div>

          {/* Items table */}
          <table className="w-full border-collapse mb-4 text-sm">
            <thead>
              <tr>
                <th className="border-b py-2 text-left">Item</th>
                <th className="border-b py-2 text-center">Qty</th>
                <th className="border-b py-2 text-center">Price</th>
                <th className="border-b py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => {
                const lineTotal =
                  (parseFloat(item.qty) || 0) * (parseFloat(item.price) || 0);
                return (
                  <tr key={idx}>
                    <td className="py-2">{item.name}</td>
                    <td className="py-2 text-center">{item.qty}</td>
                    <td className="py-2 text-center">${item.price}</td>
                    <td className="py-2 text-right">${lineTotal}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Total */}
          <div className="flex justify-end text-lg font-bold">
            <span>Total Amount: ${total}</span>
          </div>

          {/* Footer notes */}
          <p className="mt-4 text-xs text-gray-500">
            Here we can write additional notes for the client to get a better understanding of this invoice.
          </p>
        </div>
      </div>
    </>
  );
}
