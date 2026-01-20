"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  HomeIcon,
  BuildingOffice2Icon,
  GiftIcon,
  DocumentTextIcon,
  CreditCardIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const [active, setActive] = useState("Home");

  const links = [
    { name: "Home", icon: <HomeIcon className="w-5 h-5" />, href: "/dashboard/home" },
    { name: "Company", icon: <BuildingOffice2Icon className="w-5 h-5" />, href: "/dashboard/company" },
    { name: "Perks", icon: <GiftIcon className="w-5 h-5" />, href: "/dashboard/perks" },
    { name: "Legal", icon: <DocumentTextIcon className="w-5 h-5" />, href: "/dashboard/legal" },
    { name: "Payment", icon: <CreditCardIcon className="w-5 h-5" />, href: "/dashboard/payments" },
    { name: "Settings", icon: <Cog6ToothIcon className="w-5 h-5" />, href: "/dashboard/settings" },
    { name: "Client", icon: <UserGroupIcon className="w-5 h-5" />, href: "/dashboard/client" },
  ];

  const bottomLinks = [
    { name: "Get Help", icon: <HomeIcon className="w-5 h-5" />, href: "/dashboard/help" },
    { name: "Chat with us", icon: <ChatBubbleBottomCenterIcon className="w-5 h-5" />, href: "/dashboard/chat" },
  ];

  return (
    <aside className="w-64 bg-blue-700 text-white flex flex-col p-6">
      {/* Logo */}
      <div className="mb-10 flex items-center gap-3">
        <Image
          src="/logos/Quick Pay LOGO.png"
          alt="QuickPay logo"
          width={160}
          height={40}
          priority
        />
        
      </div>

      {/* Main links */}
      <nav className="flex flex-col gap-3 flex-1">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setActive(link.name)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition
              ${active === link.name ? "bg-blue-900" : "hover:bg-blue-800"}`}
          >
            {link.icon}
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>

      {/* Separator */}
      <div className="border-t border-blue-500 my-4" />

      {/* Bottom links */}
      <nav className="flex flex-col gap-3">
        {bottomLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setActive(link.name)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition
              ${active === link.name ? "bg-blue-900" : "hover:bg-blue-800"}`}
          >
            {link.icon}
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
