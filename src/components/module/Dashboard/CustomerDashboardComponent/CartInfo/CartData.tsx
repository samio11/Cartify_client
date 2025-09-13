"use client";
import { useUser } from "@/context/UserContext";
import { getAllCartDataByUser } from "@/services/cart/cart.services";
import React, { useEffect, useState } from "react";
import CartTable from "./CartTable";

export default function CartData() {
  const { user, setIsLoading } = useUser();
  const [userCartData, setUserCartData] = useState([]);
  const getUserCartData = async () => {
    if (!user) return;
    else {
      const { data } = await getAllCartDataByUser();
      console.log(data);
      setUserCartData(data);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    getUserCartData();
  }, [user]);
  //   console.log(userCartData);

  return (
    <div>
      <CartTable data={userCartData}></CartTable>
    </div>
  );
}
