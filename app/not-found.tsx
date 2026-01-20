"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Sidebar from "@/components/layout/Sidebar";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-6">
        <div className="text-center">
          <h1 className="text-6xl font-extrabold text-black mb-4">404</h1>
          <p className="text-xl text-black mb-2">
            Oops! The page you are looking for does not exist.
          </p>
          <p className="text-gray-600 mb-6">
            It might have been moved or deleted.
          </p>

          <button
            onClick={() => router.push("/dashboard/home")}
            className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Go Back Home
          </button>
        </div>

        <div className="mt-10">
          <img
            src="https://via.placeholder.com/400x300?text=404+Not+Found"
            alt="404 Not Found"
            className="mx-auto max-w-full"
          />
        </div>
      </div>
    </div>
  );
}
