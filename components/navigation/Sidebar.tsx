import Link from "next/link";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Payments", href: "/payments" },
  { label: "Invoices", href: "/invoices" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-blue-600 text-white flex flex-col">
      <div className="px-6 py-5 text-xl font-semibold tracking-tight">
        QuickPay
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-md px-4 py-2 text-sm hover:bg-blue-500 transition"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
