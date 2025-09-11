import React from "react";
import CategoriesSection from "./CategoryCard";
import { getAllCategoryData } from "@/services/category/category.services";

export default async function HomeCategory() {
  const categoryData = await getAllCategoryData();
  return (
    <div>
      <CategoriesSection categories={categoryData?.data}></CategoriesSection>
    </div>
  );
}
