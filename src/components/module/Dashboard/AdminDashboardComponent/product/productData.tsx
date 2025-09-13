"use client";
import { useUser } from "@/context/UserContext";
import { getAllProductData } from "@/services/product/product.services";
import React, { useEffect, useState } from "react";
import ProductTable from "./productTable";

export default function AdminProductData() {
  const { user, setIsLoading } = useUser();
  const [adminProductData, setAdminProductData] = useState([]);
  const getUserPaymentData = async () => {
    if (!user) return;
    else {
      const { data } = await getAllProductData();
      //   console.log(data);
      setAdminProductData(data);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    getUserPaymentData();
  }, [user]);
  //   console.log("Admin Payment", adminPaymentData);

  return (
    <div>
      <ProductTable data={adminProductData}></ProductTable>
    </div>
  );
}
