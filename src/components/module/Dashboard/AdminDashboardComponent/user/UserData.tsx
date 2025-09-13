"use client";
import { useUser } from "@/context/UserContext";
import { getAllCartDataByAdmin } from "@/services/cart/cart.services";
import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";
import { getAllUserData } from "@/services/user/user.services";

export default function AdminUserData() {
  const { user, setIsLoading } = useUser();
  const [adminUserData, setAdminUserData] = useState([]);
  const getUserCartData = async () => {
    if (!user) return;
    else {
      const { data } = await getAllUserData();
      //   console.log(data);
      setAdminUserData(data);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    getUserCartData();
  }, [user]);
  console.log("Admin User", adminUserData);

  return (
    <div>
      <UserTable data={adminUserData}></UserTable>
    </div>
  );
}
