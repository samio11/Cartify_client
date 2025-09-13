"use client";
import { useUser } from "@/context/UserContext";
import { getAllCartDataByAdmin } from "@/services/cart/cart.services";
import React, { useEffect, useState } from "react";
import AdminCartTable from "./AdminCartTable";

export default function AdminCartData() {
  const { user, setIsLoading } = useUser();
  const [adminCartData, setAdminCartData] = useState([]);
  const getUserCartData = async () => {
    if (!user) return;
    else {
      const { data } = await getAllCartDataByAdmin();
      console.log(data);
      setAdminCartData(data);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    getUserCartData();
  }, [user]);
  // console.log("Admin Cart", adminCartData);

  return (
    <div>
      <AdminCartTable data={adminCartData}></AdminCartTable>
    </div>
  );
}
