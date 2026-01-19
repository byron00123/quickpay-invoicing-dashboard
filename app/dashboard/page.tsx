import Sidebar from "@/components/layout/Sidebar";

export default function DashboardHome() {
  return (
    <div className="min-h-screen flex bg-blue-50">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white shadow-2xl rounded-tl-3xl rounded-bl-3xl -ml-12 z-10">
        {/* Placeholder for content pages */}
        <h1 className="text-2xl font-semibold text-blue-700 mb-4">Dashboard</h1>
        {/* Additional content goes here */}
      </div>
    </div>
  );
}
