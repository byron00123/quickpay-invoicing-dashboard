"use client";

import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MagnifyingGlassIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

import CreateInvoiceSlideOver from "@/components/invoices/CreateInvoiceSlideOver";
import PaymentDetailModal from "@/components/payments/PaymentDetailModal";
import NotificationBell from "@/components/notification/NotificationBell";
import ProfileDropdown from "@/components/Profile/ProfileDropdown";

import { RootState, AppDispatch } from "@/store/index";
import { openInvoice, closeInvoice, selectPayment, addInvoice } from "@/store/paymentSlice";
import { supabase } from "@/lib/supabase/client";

export default function PaymentsPage() {
  const dispatch = useDispatch<AppDispatch>();

  const invoices = useSelector((state: RootState) => state.payment.invoices);
  const selectedPayment = useSelector((state: RootState) => state.payment.selectedPayment);
  const invoiceOpen = useSelector((state: RootState) => state.payment.invoiceOpen);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Show All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const statusStyles: Record<string, { text: string; border: string; dot: string }> = {
    Paid: { text: "text-green-600", border: "border-green-600", dot: "bg-green-600" },
    Draft: { text: "text-yellow-600", border: "border-yellow-600", dot: "bg-yellow-600" },
    Pending: { text: "text-blue-600", border: "border-blue-600", dot: "bg-blue-600" },
  };

  // Fetch invoices
  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("invoices")
        .select("id, invoice_number, recipient, total, status, issued_on")
        .order("issued_on", { ascending: false });

      if (error) throw error;

      if (data) {
        const fetchedInvoices = data.map((inv: any) => ({
          id: inv.id, // <-- add unique ID for React key
          no: inv.invoice_number,
          client: inv.recipient,
          amount: `$${parseFloat(inv.total).toFixed(2)}`,
          status: inv.status,
          date: inv.issued_on,
        }));

        fetchedInvoices.forEach((inv) => dispatch(addInvoice(inv)));
      }
    } catch (err) {
      console.error("Failed to fetch invoices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchesSearch =
        inv.no.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.client.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "Show All" ||
        (statusFilter === "Show Pending" && inv.status === "Pending") ||
        (statusFilter === "Show Paid" && inv.status === "Paid") ||
        (statusFilter === "Show Draft" && inv.status === "Draft");

      return matchesSearch && matchesStatus;
    });
  }, [invoices, searchQuery, statusFilter]);

  const statusOptions = ["Show All", "Show Paid", "Show Pending", "Show Draft"];

  return (
    <>
      <div className="flex flex-col gap-6 p-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Payments</h1>
          <div className="flex items-center gap-4">
            <NotificationBell />
            <ProfileDropdown />
          </div>
        </div>

        {/* Top Cards */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-blue-50 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700">Total Received</h2>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {invoices
                .filter((inv) => inv.status === "Paid")
                .reduce((sum, inv) => sum + parseFloat(inv.amount.replace("$", "")), 0)
                .toFixed(2)}
            </p>
            <div className="flex gap-4 mt-2 text-sm text-gray-600">
              <span>
                Pending: $
                {invoices
                  .filter((inv) => inv.status === "Pending")
                  .reduce((sum, inv) => sum + parseFloat(inv.amount.replace("$", "")), 0)
                  .toFixed(2)}
              </span>
              <span>
                In Drafts: $
                {invoices
                  .filter((inv) => inv.status === "Draft")
                  .reduce((sum, inv) => sum + parseFloat(inv.amount.replace("$", "")), 0)
                  .toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex-1 bg-blue-50 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700">quickpay.to/publicnote</h2>
            <p className="text-sm text-gray-600 mt-1">
              QuickPay lets you receive payments on the fly. You can generate an invoice or share the payment link.
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded px-10 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative w-48">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 font-medium hover:bg-gray-50 transition"
              >
                <span>{statusFilter}</span>
                <ChevronDownIcon className="w-4 h-4 text-gray-600" />
              </button>

              {dropdownOpen && (
                <div className="absolute mt-1 w-full bg-white border rounded shadow-lg z-20">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setStatusFilter(status);
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-black"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>
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
            {loading ? (
              <p className="text-gray-500 text-center py-4">Loading invoices...</p>
            ) : filteredInvoices.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No invoices found.</p>
            ) : (
              filteredInvoices.map((inv) => {
                const status = statusStyles[inv.status];
                return (
                  <div
                    key={inv.id} // <-- use unique ID here
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
              })
            )}
          </div>
        </div>
      </div>

      <CreateInvoiceSlideOver open={invoiceOpen} onClose={() => dispatch(closeInvoice())} />

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
