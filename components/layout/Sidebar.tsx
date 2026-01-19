import { useState } from "react";
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
    { name: "Home", icon: <HomeIcon className="w-5 h-5" /> },
    { name: "Company", icon: <BuildingOffice2Icon className="w-5 h-5" /> },
    { name: "Perks", icon: <GiftIcon className="w-5 h-5" /> },
    { name: "Legal", icon: <DocumentTextIcon className="w-5 h-5" /> },
    { name: "Payment", icon: <CreditCardIcon className="w-5 h-5" /> },
    { name: "Settings", icon: <Cog6ToothIcon className="w-5 h-5" /> },
    { name: "Client", icon: <UserGroupIcon className="w-5 h-5" /> },
  ];

  const bottomLinks = [
    { name: "Get Help", icon: <HomeIcon className="w-5 h-5" /> }, // replace icon
    { name: "Chat with us", icon: <ChatBubbleBottomCenterIcon className="w-5 h-5" /> },
  ];

  return (
    <div className="w-64 bg-blue-700 text-white flex flex-col p-6 relative z-0">
      {/* Logo */}
      <div className="text-2xl font-bold mb-10">QuickPay</div>

      {/* Main links */}
      <nav className="flex flex-col gap-3 flex-1">
        {links.map((link) => (
          <a
            key={link.name}
            href="#"
            onClick={() => setActive(link.name)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition 
              ${active === link.name ? "bg-blue-900" : "hover:bg-blue-800"}`}
          >
            {link.icon}
            <span>{link.name}</span>
          </a>
        ))}
      </nav>

      {/* Separator */}
      <div className="border-t border-blue-500 my-4"></div>

      {/* Bottom links */}
      <nav className="flex flex-col gap-3">
        {bottomLinks.map((link) => (
          <a
            key={link.name}
            href="#"
            onClick={() => setActive(link.name)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition 
              ${active === link.name ? "bg-blue-900" : "hover:bg-blue-800"}`}
          >
            {link.icon}
            <span>{link.name}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
