"use client";
import { useUser } from "@/context/UserContext";
import { getAllPaymentDataByAdmin } from "@/services/payment/payment.services";
import React, { useEffect, useState } from "react";
import AdminPaymentTable from "./AdminPaymentTable";

export default function AdminPaymentData() {
  const { user, setIsLoading } = useUser();
  const [adminPaymentData, setAdminPaymentData] = useState([]);
  const getUserPaymentData = async () => {
    if (!user) return;
    else {
      const { data } = await getAllPaymentDataByAdmin();
      //   console.log(data);
      setAdminPaymentData(data);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    getUserPaymentData();
  }, [user]);
  //   console.log("Admin Payment", adminPaymentData);

  return (
    <div>
      <AdminPaymentTable data={adminPaymentData}></AdminPaymentTable>
    </div>
  );
}
