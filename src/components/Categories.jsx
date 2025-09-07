"use client";
import React, { useState, useEffect } from "react";
import categoriesMockData from "@/mockdata/mockdata";
import Link from "next/link";
import slugify from "slugify";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {

    async function fetchData() {
      const response = await fetch('');
      const data = await response.json();
      setCategories(data);
    }

    // fetchData();
    setCategories(categoriesMockData);
  }, []);



  return (
    <div className=" lg:bg-white ">
      <div className="lg:ml-12 px-2.5 lg:pt-5 text-[15px] xl:text-base">
        {categories.map((item) => (
          <Link 
            href={`/category/${slugify(item.name, {replacement: "-", lower: true })}`}
            key={item.id}
            onClick={() => setActiveCategory(item.id)}
            className={`flex justify-start items-center px-2 py-2 lg:p-2 rounded-md cursor-pointer transition w-full text-[15px] xl:text-base
              ${activeCategory === item.id
                ? "font-semibold text-red-500"
                : "hover:bg-gray-100"
              }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
