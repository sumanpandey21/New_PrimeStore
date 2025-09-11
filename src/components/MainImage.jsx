"use client"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { mainImageMockData } from "@/mockdata/mockdata"
import CircularIndeterminate from "./Loading"
import slugify from "slugify"

const MainImage = () => {
  const [mainImageData, setMainImageData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("")
      const data = await response.json()
      setMainImageData(data)
    }

    // fetchData();
    setMainImageData(mainImageMockData)
  }, [])

  // Add a conditional check here to ensure data exists before rendering the image.
  if (!mainImageData || mainImageData.length === 0) {
    return <CircularIndeterminate />
  }

  return (
    <Link
      href={`/products/${slugify(mainImageData[0].name, {
        replacement: "-",
        lower: true,
      })}?q=${mainImageData[0].pid}`}
    >
      <div className="relative w-full lg:h-[400px] h-[275px] md:h-[325px] rounded-md overflow-hidden transition-transform duration-300 hover:scale-[1.01] cursor-pointer my-2 lg:pl-16.5 lg:pr-19 px-6 ">
        <Image
          className="w-full h-full object-cover object-center rounded-md "
          src={mainImageData[0].image}
          alt={mainImageData[0].name}
        />
      </div>
    </Link>
  )
}

export default MainImage
