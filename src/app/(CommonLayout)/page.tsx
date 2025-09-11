import ExploreMoreCard from "@/components/module/Home/ExploreMoreCard";
import HomeCategory from "@/components/module/Home/HomeCategory";
import NewProductsSection from "@/components/module/Home/HomeNewProducts";
import HomeReview from "@/components/module/Home/HomeReview";
import HomeSubscriptionSection from "@/components/module/Home/HomeSubscription";
import HomeTopReview from "@/components/module/Home/HomeTopReview";
import HomeSlider from "@/components/shared/HomeSlider";
import React from "react";

export default function Home() {
  return (
    <div className="space-y-3">
      <main className="min-h-screen my-3">
        <HomeSlider></HomeSlider>
        <HomeCategory></HomeCategory>
        <NewProductsSection></NewProductsSection>
        <ExploreMoreCard></ExploreMoreCard>
        <HomeTopReview></HomeTopReview>
        <HomeReview></HomeReview>
        <HomeSubscriptionSection></HomeSubscriptionSection>
        {/* other sections here */}
      </main>
    </div>
  );
}
