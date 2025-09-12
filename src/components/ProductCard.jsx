"use client"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import slugify from "slugify"
import dynamic from "next/dynamic"

const ReactStars = dynamic(() => import("react-stars"), { ssr: false })

const ProductCard = ({
  id,
  image,
  title,
  price,
  rating,
  ratingCount,
  discount = null,
  className,
  clickable = true,
}) => {
  return (
    <>
      <Link
        href={
          clickable
            ? `/products/${slugify(title, {
                replacement: "-",
                lower: true,
              })}?q=${id}`
            : "#"
        }
      >
        <div
          className={`rounded-md relative ${
            className
              ? className
              : "hover:cursor-pointer hover:shadow-sm lg:hover:shadow-lg"
          }`}
        >
          {discount && (
            <div className="absolute top-1 left-1 z-10 bg-red-500 lg:w-15 lg:h-7.5 w-10 h-5 rounded-md flex justify-center items-center text-white text-xs sm:text-sm md:text-base">
              -{discount}%
            </div>
          )}

          <div className="w-full h-full bg-[#f5f5f5] flex justify-center items-center p-8 rounded-md overflow-hidden  ">
            <Image
              className="object-contain object-center w-full h-full"
              src={image}
              alt={title}
              width={100}
              height={100}
            />
          </div>

          <div className="flex flex-col justify-start items-start gap-1 w-full h-full rounded-md p-2">
            <p className="text-xs sm:text-sm md:text-base text-ellipsis overflow-hidden whitespace-nowrap w-full">
              {title}
            </p>
            {/* Corrected Price Display Logic */}
            <div className="flex justify-start items-center gap-2">
              <div className="flex justify-start items-center text-red-500 text-xs sm:text-sm md:text-base">
                Rs.{" "}
                {discount
                  ? Math.round(price - (price * discount) / 100)
                  : price}
              </div>

              {discount && (
                <div className="text-xs sm:text-sm md:text-base text-gray-500 line-through">
                  Rs. {price}
                </div>
              )}
            </div>

            <div className="flex justify-start items-center gap-0.5 text-gray-500 text-xs sm:text-sm md:text-base mt-[-4px]">
              <ReactStars
                count={5}
                size={20}
                value={rating}
                edit={false}
                color1="#bfbfbf"
                color2={"#ebb050"}
              />
              <div>({ratingCount})</div>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default ProductCard
