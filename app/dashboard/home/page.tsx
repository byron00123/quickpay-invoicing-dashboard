"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartBar, ChartPie, Users, DollarSign } from "lucide-react";

const mockData = {
  totalRevenue: 15230,
  totalInvoices: 24,
  pendingPayments: 5,
  recentClients: [
    { name: "John Doe", amount: 120, status: "Paid" },
    { name: "Jane Smith", amount: 250, status: "Pending" },
    { name: "Acme Corp", amount: 500, status: "Paid" },
    { name: "Beta LLC", amount: 300, status: "Pending" },
  ],
};

export default function DashboardHome() {
  const [data] = useState(mockData);

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Welcome Back to QuickPay!</h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-blue-50 hover:scale-105 transition-transform">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-700 font-semibold">
              <ChartBar className="w-5 h-5 text-blue-600" /> Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">${data.totalRevenue}</p>
          </CardContent>
        </Card>

        <Card className="bg-green-50 hover:scale-105 transition-transform">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-700 font-semibold">
              <DollarSign className="w-5 h-5 text-green-600" /> Total Invoices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">{data.totalInvoices}</p>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 hover:scale-105 transition-transform">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-700 font-semibold">
              <ChartPie className="w-5 h-5 text-yellow-600" /> Pending Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">{data.pendingPayments}</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 hover:scale-105 transition-transform">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-700 font-semibold">
              <Users className="w-5 h-5 text-purple-600" /> Recent Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">{data.recentClients.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Clients Table */}
      <Card className="bg-white shadow-lg rounded-xl overflow-hidden">
        <CardHeader>
          <CardTitle className="text-gray-700 font-semibold text-lg">Recent Clients & Invoices</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-gray-600">Client</th>
                <th className="py-2 px-4 text-gray-600">Amount</th>
                <th className="py-2 px-4 text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.recentClients.map((client, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50 transition">
                  <td className="py-2 px-4">{client.name}</td>
                  <td className="py-2 px-4">${client.amount}</td>
                  <td
                    className={`py-2 px-4 font-semibold ${
                      client.status === "Paid" ? "text-green-600" : "text-yellow-600"
                    }`}
                  >
                    {client.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 shadow-lg rounded-lg">
          + Create Invoice
        </Button>
      </div>
    </div>
  );
}
