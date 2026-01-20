"use client";

import { Provider } from "react-redux";
import { store } from "@/store"; // path to your Redux store
import AppShell from "@/components/layout/AppShell";
import { Toaster } from "sonner"; // Add sonner

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AppShell>
        {children}
        <Toaster /> {/* Make toasts available throughout the dashboard */}
      </AppShell>
    </Provider>
  );
}
