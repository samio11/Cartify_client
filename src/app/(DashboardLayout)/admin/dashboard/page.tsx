"use client";

import React, { useEffect, useState } from "react";
import { getAllPaymentDataByAdmin } from "@/services/payment/payment.services";
import { getAllProductData } from "@/services/product/product.services";
import { getAllUserData } from "@/services/user/user.services";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Loader2,
  Users,
  Package,
  DollarSign,
  TrendingUp,
  Clock,
} from "lucide-react";

interface ProductChartData {
  name: string;
  quantity: number;
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [pendingSales, setPendingSales] = useState(0);
  const [chartData, setChartData] = useState<ProductChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [payments, products, users] = await Promise.all([
          getAllPaymentDataByAdmin(),
          getAllProductData(),
          getAllUserData(),
        ]);

        const completedSales =
          payments?.data?.filter((p: any) => p.status === "COMPLETE") || [];

        const pendingPayments =
          payments?.data?.filter((p: any) => p.status === "PENDING") || [];

        const salesAmount = completedSales.reduce(
          (total: number, payment: any) => total + (payment.amount || 0),
          0
        );

        const pendingAmount = pendingPayments.reduce(
          (total: number, payment: any) => total + (payment.amount || 0),
          0
        );

        setTotalSales(salesAmount);
        setPendingSales(pendingAmount);
        setTotalProducts(products?.data?.length || 0);
        setTotalUsers(users?.data?.length || 0);

        // ✅ Chart Data: Product Name vs Quantity
        const formattedChartData: ProductChartData[] =
          products?.data?.map((product: any) => ({
            name: product.title || "Unnamed",
            quantity: Number(product.stock) || 0,
          })) || [];
        setChartData(formattedChartData);
      } catch (err) {
        console.error("Error loading admin dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Welcome to your admin dashboard</p>
      </div>

      {/* ---- SECTION 1: STATS ---- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border-0 shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="p-6 flex items-center">
            <div className="rounded-full bg-blue-100 p-4 mr-4">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Products
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {totalProducts}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="p-6 flex items-center">
            <div className="rounded-full bg-green-100 p-4 mr-4">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sales</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                ${totalSales.toLocaleString()}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="p-6 flex items-center">
            <div className="rounded-full bg-amber-100 p-4 mr-4">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Sales</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                ${pendingSales.toLocaleString()}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="p-6 flex items-center">
            <div className="rounded-full bg-purple-100 p-4 mr-4">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {totalUsers}
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ---- SECTION 2: CHART ---- */}
      <Card className="bg-white border-0 shadow-md rounded-xl overflow-hidden">
        <CardHeader className="border-b border-gray-100 py-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-900">
              Product Stock Overview
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {chartData.length > 0 ? (
            <div className="w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    cursor={{ fill: "#f5f5f5" }}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Bar
                    dataKey="quantity"
                    radius={[4, 4, 0, 0]}
                    fill="#3b82f6" // Single awesome blue color
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No product data available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
