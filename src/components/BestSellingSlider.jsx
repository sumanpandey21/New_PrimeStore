"use client"
import React, { useEffect, useState } from "react"
import UpperText from "./UpperText"
import LowerText from "./LowerText"
import ProductCrousel from "./ProductCrousel"
import ViewProductsButton from "./ViewProductsButton"
import { productMockData } from "@/mockdata/mockdata"

const BestSellingSlider = () => {
  return (
    <div className="flex flex-col lg:ml-15.5 lg:mr-18.5 lg:py-10 py-6 mx-5 lg:gap-15 gap-9 ">
      <div className="flex flex-col justify-start gap-3 lg:gap-4 ">
        <div className="flex flex-col justify-start items-start w-full h-full gap-0.5 lg:gap-3 sm:gap-1 md:gap-1.5">
          <UpperText text="This Month" />
          <LowerText text="Best Selling Products" />
        </div>
        <ProductCrousel products={productMockData} />
      </div>

      <ViewProductsButton text="View All Products" href="/best-selling" />
    </div>
  )
}

export default BestSellingSlider
