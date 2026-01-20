"use client";

import { XMarkIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import { useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import PreviewInvoiceModal from "./PreviewInvoiceModal";
import { AppDispatch } from "@/store/index";
import { addInvoice, closeInvoice } from "@/store/paymentSlice";
import { invoiceSchema, InvoiceFormData } from "@/utils/invoiceSchema";
import { supabase } from "@/lib/supabase/client";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface Item {
  name: string;
  qty: string;
  price: string;
}

export default function CreateInvoiceSlideOver({ open, onClose }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedRecipient, setSelectedRecipient] = useState(
    "Alex Parkinson (alex@email.com)"
  );
  const [recipientOpen, setRecipientOpen] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [items, setItems] = useState<Item[]>([
    { name: "Legal Advising", qty: "2", price: "500" },
    { name: "Consulting", qty: "1", price: "300" },
  ]);
  const [description, setDescription] = useState("Legal Consulting");
  const [issuedOn, setIssuedOn] = useState("2026-01-20");
  const [dueOn, setDueOn] = useState("2026-02-20");
  const [notes, setNotes] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [errors, setErrors] = useState<string[]>([]);
  const [newInvoiceNumber, setNewInvoiceNumber] = useState("");
  const [companyId, setCompanyId] = useState<string | null>(null);

  const recipients = [
    "Alex Parkinson (alex@email.com)",
    "Thomas Lee (thomas@email.com)",
    "Intutive Holdings Pvt. Ltd. (info@intutive.com)",
  ];

  const addItem = () => setItems([...items, { name: "", qty: "", price: "" }]);

  const totalSum = useMemo(() => {
    return items.reduce((sum, item) => {
      const qty = parseFloat(item.qty) || 0;
      const price = parseFloat(item.price) || 0;
      return sum + qty * price;
    }, 0);
  }, [items]);

  // Fetch logged-in user's company_id
  useEffect(() => {
    const fetchCompanyId = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("company_id")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.error("Failed to fetch company_id:", profileError);
        return;
      }

      console.log("Fetched company ID:", profileData.company_id);
      setCompanyId(profileData.company_id);
    };

    fetchCompanyId();
  }, []);

  const handleSend = async () => {
    if (!companyId) {
      alert("Cannot create invoice: missing company ID.");
      return;
    }

    const result = invoiceSchema.safeParse({
      recipient: selectedRecipient,
      description,
      issuedOn,
      dueOn,
      recurring,
      items,
      notes,
    });

    if (!result.success) {
      const newErrors = result.error.issues.map(
        (issue) => `${issue.path.join(".")}: ${issue.message}`
      );
      setErrors(newErrors);
      return;
    }

    setErrors([]);
    const formData: InvoiceFormData = result.data;
    const total = formData.items.reduce((sum, item) => sum + item.qty * item.price, 0);

    const invoiceNo = `INV${Math.floor(Math.random() * 9000 + 1000)}`;
    setNewInvoiceNumber(invoiceNo);

    // Log everything for debugging
    const invoicePayload = {
      company_id: companyId,
      invoice_number: invoiceNo,
      recipient: formData.recipient,
      recipient_address: "123 Main St, City, Country",
      description: formData.description,
      issued_on: formData.issuedOn,
      due_on: formData.dueOn,
      notes: formData.notes || "",
      total: total,
      status: formData.recurring ? "Draft" : "Pending",
    };
    console.log("Inserting invoice payload:", invoicePayload);

    try {
      const { data: invoiceData, error: invoiceError } = await supabase
        .from("invoices")
        .insert(invoicePayload)
        .select("id")
        .single();

      if (invoiceError) throw invoiceError;

      const invoiceId = invoiceData.id;

      const itemsToInsert = formData.items.map((item) => ({
        invoice_id: invoiceId,
        name: item.name,
        qty: item.qty,
        price: item.price,
        
      }));

      console.log("Inserting invoice items:", itemsToInsert);

      const { error: itemsError } = await supabase.from("invoice_items").insert(itemsToInsert);
      if (itemsError) throw itemsError;

      dispatch(
        addInvoice({
          id: invoiceNo,
          no: invoiceNo,
          date: formData.issuedOn,
          client: formData.recipient,
          amount: `$${total.toFixed(2)}`,
          status: formData.recurring ? "Draft" : "Pending",
        })
      );

      dispatch(closeInvoice());
      setModalOpen(false);
    } catch (error) {
      console.error("Supabase error:", error);
      alert("Failed to save invoice. Check console for details.");
    }
  };

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
        className={`fixed top-0 right-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "translate-x-full"} flex flex-col`}
      >
        {/* Header */}
        <div className="border-b px-6 py-6 flex items-start justify-between">
          <div className="flex-1 flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-black">Create new invoice</h2>
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold text-black">{`#${newInvoiceNumber || Math.floor(
                Math.random() * 9000 + 1000
              )}`}</p>
              <button className="flex items-center gap-1 text-blue-600 font-medium hover:underline">
                <ClipboardIcon className="w-4 h-4" />
                Copy payment link
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded absolute right-6 top-6"
          >
            <XMarkIcon className="w-5 h-5 text-black" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Recipient */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 relative">
            <label className="text-sm font-medium text-black mb-2 block">
              Recipient Email
            </label>
            <div
              className="w-full border rounded px-3 py-2 bg-white cursor-pointer flex justify-between items-center text-black"
              onClick={() => setRecipientOpen(!recipientOpen)}
            >
              <span>{selectedRecipient}</span>
              <svg
                className={`w-4 h-4 transform transition-transform ${
                  recipientOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {recipientOpen && (
              <ul className="absolute left-4 right-4 top-[60px] bg-white border border-gray-300 rounded shadow z-10 max-h-40 overflow-y-auto text-black">
                {recipients.map((r) => (
                  <li
                    key={r}
                    className="px-3 py-2 hover:bg-blue-100 cursor-pointer text-black"
                    onClick={() => {
                      setSelectedRecipient(r);
                      setRecipientOpen(false);
                    }}
                  >
                    {r}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-black">Project / Description</label>
            <input
              className="mt-1 w-full border rounded px-3 py-2 text-black"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-black">Issued on</label>
              <input
                className="mt-1 w-full border rounded px-3 py-2 text-black"
                value={issuedOn}
                onChange={(e) => setIssuedOn(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-black">Due on</label>
              <input
                className="mt-1 w-full border rounded px-3 py-2 text-black"
                value={dueOn}
                onChange={(e) => setDueOn(e.target.value)}
              />
            </div>
          </div>

          {/* Recurring */}
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={recurring}
              onChange={() => setRecurring(!recurring)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-0"
            />
            <span className="text-sm text-black">This is a recurring invoice (monthly)</span>
          </div>

          {/* Items */}
          <div className="space-y-2">
            <div className="flex text-sm font-medium text-black">
              <div className="flex-1">Item</div>
              <div className="w-16 text-center">Qty</div>
              <div className="w-20 text-center">Price</div>
              <div className="w-24 text-right">Total</div>
            </div>

            {items.map((item, index) => (
              <div key={index} className="flex gap-2 relative">
                <input
                  className="border rounded px-3 py-2 flex-1 text-black"
                  value={item.name}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index].name = e.target.value;
                    setItems(newItems);
                  }}
                />
                <input
                  className="border rounded px-2 py-2 w-16 text-black text-center"
                  value={item.qty}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index].qty = e.target.value;
                    setItems(newItems);
                  }}
                />
                <input
                  className="border rounded px-2 py-2 w-20 text-black text-center"
                  value={item.price}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index].price = e.target.value;
                    setItems(newItems);
                  }}
                />
                <span className="text-right py-2 w-24 text-black">
                  {item.qty && item.price
                    ? `$${(parseFloat(item.qty) * parseFloat(item.price)).toFixed(2)}`
                    : "$0.00"}
                </span>
              </div>
            ))}

            <div className="flex justify-between items-center mt-2">
              <button className="text-blue-600 text-sm font-medium" onClick={addItem}>
                + Add item
              </button>
              <div className="flex items-center gap-2">
                <div className="text-sm text-black mr-16">Total</div>
                <div className="text-lg font-bold text-black">${totalSum.toFixed(2)}</div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm font-medium text-black">Additional Notes</label>
            <textarea
              className="mt-1 w-full border rounded px-3 py-2 text-black"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Inline errors */}
          {errors.length > 0 && (
            <div className="mt-4 text-red-500 text-sm space-y-1">
              {errors.map((err, i) => (
                <p key={i}>{err}</p>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex justify-between items-center">
          <button
            className="text-blue-600 font-medium hover:underline"
            onClick={() => setModalOpen(true)}
          >
            Preview
          </button>
          <div className="flex gap-3">
            <button className="px-4 py-2 border rounded text-black" onClick={handleSend}>
              Save as draft
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Preview modal */}
      <PreviewInvoiceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        invoiceNumber={newInvoiceNumber}
        description={description}
        issuedOn={issuedOn}
        dueOn={dueOn}
        recipient={selectedRecipient}
        recipientAddress="123 Main St, City, Country"
        items={items}
        notes={notes}
        total={totalSum}
      />
    </>
  );
}
