"use client";
import { useUser } from "@/context/UserContext";
import { getAllCategoryData } from "@/services/category/category.services";
import React, { useEffect, useState } from "react";
import CategoryTable from "./categoryTable";

export default function AdminCategoryData() {
  const { user, setIsLoading } = useUser();
  const [adminCategoryData, setAdminCategoryData] = useState([]);
  const getUserPaymentData = async () => {
    if (!user) return;
    else {
      const { data } = await getAllCategoryData();
      //   console.log(data);
      setAdminCategoryData(data);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    getUserPaymentData();
  }, [user]);
  //   console.log("Admin Payment", adminPaymentData);

  return (
    <div>
      <CategoryTable data={adminCategoryData}></CategoryTable>
    </div>
  );
}
