"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BellIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import CreateInvoiceSlideOver from "@/components/invoices/CreateInvoiceSlideOver";
import PaymentDetailModal from "@/components/payments/PaymentDetailModal";

import { RootState, AppDispatch } from "@/store/index";
import { openInvoice, closeInvoice, selectPayment } from "@/store/paymentSlice";

export default function PaymentsPage() {
  const dispatch = useDispatch<AppDispatch>();

  // Get state from Redux
  const invoices = useSelector((state: RootState) => state.payment.invoices);
  const selectedPayment = useSelector(
    (state: RootState) => state.payment.selectedPayment
  );
  const invoiceOpen = useSelector((state: RootState) => state.payment.invoiceOpen);

  const [profileOpen, setProfileOpen] = useState(false);

  const user = { name: "John Doe" };
  const initial = user.name[0];

  const statusStyles: Record<
    string,
    { text: string; border: string; dot: string }
  > = {
    Paid: {
      text: "text-green-600",
      border: "border-green-600",
      dot: "bg-green-600",
    },
    Draft: {
      text: "text-yellow-600",
      border: "border-yellow-600",
      dot: "bg-yellow-600",
    },
    Pending: {
      text: "text-blue-600",
      border: "border-blue-600",
      dot: "bg-blue-600",
    },
  };

  return (
    <>
      <div className="flex flex-col gap-6 p-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Payments</h1>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
              <BellIcon className="w-6 h-6 text-gray-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition"
              >
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                  {initial}
                </div>
                <span className="text-gray-700 font-medium">{user.name}</span>
                <ChevronDownIcon className="w-4 h-4 text-gray-500" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-20">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
                    Profile
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
                    Settings
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Top Cards */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-blue-50 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700">
              Total Received
            </h2>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              $84,254.58
            </p>
            <div className="flex gap-4 mt-2 text-sm text-gray-600">
              <span>Pending: $1254.50</span>
              <span>In Drafts: $0.00</span>
            </div>
          </div>

          <div className="flex-1 bg-blue-50 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700">
              quickpay.to/publicnote
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              QuickPay lets you receive payments on the fly. You can generate an
              invoice or share the payment link to request the payment.
            </p>
          </div>
        </div>

        {/* Invoices Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Invoices</h2>

            <button
              onClick={() => dispatch(openInvoice())}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              + New Invoice
            </button>
          </div>

          {/* Search + Filter */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute w-5 h-5 left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search an Invoice"
                className="w-full border border-gray-300 rounded px-10 py-2
                           text-gray-900 placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              className="w-48 flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg
                         bg-white text-gray-900 font-medium hover:bg-gray-50 transition"
            >
              <span>Show all</span>
              <span className="h-5 w-px bg-gray-300 mx-2" />
              <ChevronDownIcon className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Column Headers */}
          <div className="hidden md:flex bg-gray-100 p-3 rounded-t-xl font-semibold text-gray-800">
            <span className="w-24">No.</span>
            <span className="w-32">Date</span>
            <span className="flex-1">Client</span>
            <span className="w-40 text-right pr-4">Amount</span>
            <span className="w-40 text-right">Status</span>
          </div>

          {/* Invoice Cards */}
          <div className="flex flex-col gap-4 mt-2">
            {invoices.map((inv) => {
              const status = statusStyles[inv.status];
              return (
                <div
                  key={inv.no}
                  className="flex flex-col md:flex-row md:items-center bg-white p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
                  onClick={() => dispatch(selectPayment(inv))}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 flex-1 text-gray-900 font-medium">
                    <span className="w-24">{inv.no}</span>
                    <span className="w-32">{inv.date}</span>
                    <span className="flex-1">{inv.client}</span>
                    <span className="w-40 text-right pr-4">{inv.amount}</span>
                  </div>

                  <div
                    className={`mt-2 md:mt-0 w-40 flex items-center justify-center gap-2 px-3 py-1 border rounded-full
                                ${status.text} ${status.border} font-semibold`}
                  >
                    <span className={`w-2 h-2 rounded-full ${status.dot}`} />
                    {inv.status}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Invoice Drawer */}
      <CreateInvoiceSlideOver
        open={invoiceOpen}
        onClose={() => dispatch(closeInvoice())}
      />

      {/* Payment Detail Modal */}
      {selectedPayment && (
        <PaymentDetailModal
          open={!!selectedPayment}
          onClose={() => dispatch(selectPayment(null))}
          invoiceNumber={selectedPayment.no}
          description="Payment Details"
          issuedOn="Jan 1, 2023"
          dueOn="Jan 15, 2023"
          recipient={selectedPayment.client}
          recipientAddress="123 Client Street"
          items={[
            {
              name: "Service Fee",
              qty: "1",
              price: selectedPayment.amount.replace("$", ""),
            },
          ]}
          total={parseFloat(selectedPayment.amount.replace("$", ""))}
        />
      )}
    </>
  );
}
