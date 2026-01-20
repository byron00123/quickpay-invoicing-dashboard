import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Item {
  name: string;
  qty: string;
  price: string;
}

export interface Payment {
  no: string;
  date: string;
  client: string;
  amount: string;
  status: string;
}

export interface CompanyInfo {
  name: string;
  address: string;
  logoUrl: string;
}

export interface PaymentState {
  invoices: Payment[];
  selectedPayment: Payment | null;
  invoiceOpen: boolean;
  companyInfo: CompanyInfo;
}

const initialState: PaymentState = {
  invoices: [
    { no: "#BCS101", date: "Jun 21, 2020", client: "Alexander Parkinson", amount: "$1254.50", status: "Pending" },
    { no: "#CDF254", date: "May 16, 2020", client: "Intutive Holdings Pvt. Ltd.", amount: "$654.25", status: "Draft" },
    { no: "#SWE254", date: "Apr 12, 2020", client: "Thomas Lee", amount: "$2547.32", status: "Paid" },
    { no: "#SWE255", date: "Apr 12, 2020", client: "Thomas Lee", amount: "$2547.32", status: "Paid" },
  ],
  selectedPayment: null,
  invoiceOpen: false,
  companyInfo: {
    name: "Acme Corp.",
    address: "123 Main Street, Cityville, Country",
    logoUrl: "https://via.placeholder.com/80",
  },
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    openInvoice: (state) => {
      state.invoiceOpen = true;
    },
    closeInvoice: (state) => {
      state.invoiceOpen = false;
    },
    selectPayment: (state, action: PayloadAction<Payment | null>) => {
      state.selectedPayment = action.payload;
    },
    updateCompanyInfo: (state, action: PayloadAction<CompanyInfo>) => {
      state.companyInfo = action.payload;
    },
    addInvoice: (state, action: PayloadAction<Payment>) => {
      state.invoices.push(action.payload);
    },
  },
});

export const { openInvoice, closeInvoice, selectPayment, updateCompanyInfo, addInvoice } = paymentSlice.actions;

export default paymentSlice.reducer;
