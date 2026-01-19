import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QuickPay Dashboard",
  description: "Invoicing & payments dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-slate-50">
      <body className="h-full bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
