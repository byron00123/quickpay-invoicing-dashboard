"use client";

import { BellIcon } from "@heroicons/react/24/outline";

export default function NotificationBell() {
  return (
    <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
      <BellIcon className="w-6 h-6 text-gray-600" />
      <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
    </button>
  );
}
