"use client";

import { Provider } from "react-redux";
import { store } from "@/store"; // path to your Redux store
import AppShell from "@/components/layout/AppShell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Wrap AppShell with Redux Provider
  return (
    <Provider store={store}>
      <AppShell>{children}</AppShell>
    </Provider>
  );
}
