"use client";
import { useUser } from "@/context/UserContext";
import { getAUserDataByQuery } from "@/services/user/user.services";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pencil,
  CheckCircle,
  Mail,
  Phone,
  User,
  Shield,
  Calendar,
  Verified,
} from "lucide-react";
import Image from "next/image";
import EditCustomerInfoModal from "@/components/module/Dashboard/CustomerDashboardComponent/EditCustomerInfoModal";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  userImage: string;
  phoneNumber: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function CustomerDashboard() {
  const { user } = useUser();
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleGetFullDetailsOfUser = async () => {
    if (!user?.userId) return;
    const { data } = await getAUserDataByQuery(`_id=${user?.userId}`);
    setUserInfo(data[0]);
  };

  useEffect(() => {
    handleGetFullDetailsOfUser();
  }, [user?.userId]);

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-4 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Card */}
          <Card className="lg:col-span-2 shadow-xl border-0 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-black to-white-600 relative">
              <div className="absolute -bottom-14 left-6">
                <div className="relative">
                  <Image
                    src={userInfo?.userImage || "/default-avatar.png"}
                    alt={userInfo?.name || "User"}
                    width={110}
                    height={110}
                    className="rounded-full border-4 border-white shadow-lg"
                  />
                </div>
              </div>
            </div>

            <CardHeader className="mt-16">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-800">
                    {userInfo?.name}
                  </CardTitle>
                  <div className="flex items-center mt-1">
                    <span className="text-slate-600 mr-2">
                      {userInfo?.role.toUpperCase()}
                    </span>
                    {userInfo?.isVerified && (
                      <div className="flex items-center text-green-600">
                        <Verified className="h-4 w-4 mr-1" />
                        <span className="text-sm">Verified</span>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    userInfo?.isVerified
                      ? "bg-green-100 text-green-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {userInfo?.isVerified
                    ? "Active Account"
                    : "Verification Needed"}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 pb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Mail className="h-5 w-5 text-blue-500 mr-2" />
                    <h3 className="font-medium text-slate-700">
                      Email Address
                    </h3>
                  </div>
                  <p className="text-slate-900">{userInfo?.email}</p>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Phone className="h-5 w-5 text-blue-500 mr-2" />
                    <h3 className="font-medium text-slate-700">Phone Number</h3>
                  </div>
                  <p className="text-slate-900">
                    {userInfo?.phoneNumber || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                    <h3 className="font-medium text-slate-700">Member Since</h3>
                  </div>
                  <p className="text-slate-900">
                    {userInfo?.createdAt
                      ? formatDate(userInfo.createdAt)
                      : "N/A"}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Shield className="h-5 w-5 text-blue-500 mr-2" />
                    <h3 className="font-medium text-slate-700">
                      Account Status
                    </h3>
                  </div>
                  <p className="text-slate-900">
                    {userInfo?.isVerified ? "Verified" : "Pending Verification"}
                  </p>
                </div>
              </div>

              <div className="pt-4 flex justify-center items-center gap-4">
                <EditCustomerInfoModal
                  userData={userInfo as IUser}
                ></EditCustomerInfoModal>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
