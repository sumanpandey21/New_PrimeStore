"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {categoriesMockData} from "@/mockdata/mockdata";
import Link from "next/link";
import slugify from "slugify";

const Categories = ({products}) => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("q");

  useEffect(() => {
    setCategories(categoriesMockData);
    
    if (id) {
      setActiveCategory(parseInt(id));
    }
  }, [id]);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <div className="space-y-1 lg:px-13 lg:mt-2">
      {categories.map((item) => (
        <Link 
          href={`/category/${slugify(item.name, {replacement: "-", lower: true })}/?q=${(item.id)}`}
          key={item.id}
          onClick={() => handleCategoryClick(item.id)}
          className={`
            block px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ease-in-out text-sm lg:text-base
            ${activeCategory === item.id
              ? "bg-red-50 text-red-600 font-semibold border-l-4 border-red-500 shadow-sm"
              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:pl-6 hover:shadow-sm"
            }
          `}
        >
          <div className="flex items-center justify-between">
            <span>{item.name}</span>
            {activeCategory === item.id && (
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Categories;