import AppShell from "@/components/layout/AppShell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Simply wrap all pages with AppShell (Sidebar + Topbar)
  return <AppShell>{children}</AppShell>;
}
