import React from "react";
import Navbar from "@/components/Navbar";
import Categories from "@/components/Categories";
import MainBanner from "@/components/MainBanner";
import FlashSalesSlider from "@/components/FlashSalesSlider";
import SearchCategoriesSlider from "@/components/SearchCategoriesSlider";
import BestSellingSlider from "@/components/BestSellingSlider";
import MainImage from "@/components/MainImage";
import ExploreProduct from "@/components/ExploreProduct";
import FooterLogos from "@/components/FooterLogos";
import Footer from "@/components/Footer";

const Page = () => {
  return (
    <div>
      <div className="flex">
        <div className="w-1/5 border-r border-gray-300 hidden lg:block">
          <Categories />
        </div>
        <div className="flex-1">
          <MainBanner />
        </div>
      </div>
      <FlashSalesSlider />
      <SearchCategoriesSlider />
      <BestSellingSlider />
      <MainImage /> 
      <ExploreProduct />
      <FooterLogos />
    </div>
  );
};

export default Page;
