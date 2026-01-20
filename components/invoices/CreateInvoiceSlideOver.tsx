"use client";

import { XMarkIcon, ClipboardIcon } from "@heroicons/react/24/outline";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateInvoiceSlideOver({ open, onClose }: Props) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 transition-opacity z-40 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Slide panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-lg font-semibold">Create new invoice</h2>
            <p className="text-sm text-gray-500">#AL2545</p>
          </div>

          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto h-[calc(100%-140px)] space-y-5">
          {/* Recipient */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Recipient Email
            </label>
            <input
              className="mt-1 w-full border rounded px-3 py-2"
              defaultValue="Alex Parkinson (alex@email.com)"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Project / Description
            </label>
            <input
              className="mt-1 w-full border rounded px-3 py-2"
              defaultValue="Legal Consulting"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Issued on
              </label>
              <input className="mt-1 w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Due on
              </label>
              <input className="mt-1 w-full border rounded px-3 py-2" />
            </div>
          </div>

          {/* Items */}
          <div className="space-y-2">
            <div className="grid grid-cols-4 text-sm text-gray-500">
              <span>Item</span>
              <span>Qty</span>
              <span>Price</span>
              <span className="text-right">Total</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <input className="border rounded px-2 py-1 col-span-1" defaultValue="Legal Advising" />
              <input className="border rounded px-2 py-1" defaultValue="2" />
              <input className="border rounded px-2 py-1" defaultValue="500" />
              <span className="text-right py-1">$1000</span>
            </div>

            <button className="text-blue-600 text-sm font-medium">
              + Add item
            </button>
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Additional Notes
            </label>
            <textarea className="mt-1 w-full border rounded px-3 py-2" />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex justify-between items-center">
          <button className="text-blue-600 font-medium flex items-center gap-2">
            <ClipboardIcon className="w-4 h-4" />
            Copy payment link
          </button>

          <div className="flex gap-3">
            <button className="px-4 py-2 border rounded text-gray-700">
              Save as draft
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
