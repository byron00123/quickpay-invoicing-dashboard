"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const user = { name: "John Doe" };
  const initial = user.name[0];
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out successfully!");
      router.push("/auth/login");
    }
  };

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition"
      >
        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
          {initial}
        </div>
        <span className="text-gray-900 font-medium">{user.name}</span>
        <ChevronDownIcon className="w-4 h-4 text-gray-900" />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-20">
          <button className="w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-100 font-medium">
            Profile
          </button>
          <button className="w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-100 font-medium">
            Settings
          </button>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-100 font-medium"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
