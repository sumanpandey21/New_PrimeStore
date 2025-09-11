"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { categoriesMockData } from "@/mockdata/mockdata";
import ProductCard from "@/components/ProductCard";
import Categories from "@/components/Categories";
import ServicePromotion from "@/components/ServicePromotionFilter";
import PriceFilter from "@/components/PriceFilter";
import RatingFilter from "@/components/RatingFilter";
import { Filter, X } from "lucide-react";

export default function CategoryPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("q");
  const categories = categoriesMockData.find(p => p.id === parseInt(id));
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  if (!categories) return <div>Product not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Desktop Sidebar - Hidden on mobile since we use MobileMenu */}
        <aside className="hidden overflow-scroll lg:block sticky top-0 left-0 w-72 xl:w-80 h-screen bg-white shadow-lg overflow-y-auto">
          <div className="">
            <div className="mb-8">
              <Categories />
            </div>

            <div className="mb-8 px-10">
              <ServicePromotion />
            </div>

            {/* Price Filter Section */}
            <div className="mb-8 px-10">
              <PriceFilter />
            </div>

            {/* Rating Filter Section */}
            <div className="mb-8 px-10">
              <RatingFilter />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="p-4 lg:p-6 xl:p-8">
            {/* Mobile Header with Category Name and Filter Button */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h1 className="text-2xl font-bold text-gray-900">{categories.name}</h1>
              <button
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm"
              >
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Filters</span>
              </button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6 mb-8">
              {categories.products.map((category) => (
                <ProductCard
                  key={category.id}
                  id={category.id}
                  image={category.images.main}
                  title={category.name}
                  price={category.price}
                  rating={category.rating}
                  ratingCount={category.totalRatings}
                />
              ))}
            </div>

            {/* Load More Button */}
            <div className="flex justify-center mb-8">
              <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                Load more.....
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Filter Modal */}
      <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${isFilterOpen ? 'visible' : 'invisible'}`}>
        {/* Background Overlay */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${isFilterOpen ? 'opacity-50' : 'opacity-0'}`}
          onClick={() => setIsFilterOpen(false)}
        />

        {/* Filter Drawer - Top to Bottom */}
        <div className={`fixed top-0 left-0 right-0 bg-white rounded-b-2xl shadow-2xl transform transition-transform duration-300 max-h-[80vh] ${isFilterOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white rounded-b-2xl z-10">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Filter Content */}
          <div className="overflow-y-auto max-h-[calc(80vh-140px)]">
            {/* Service & Promotion Filter */}
            <div className="p-4 border-b border-gray-200">
              <ServicePromotion />
            </div>

            {/* Price Filter */}
            <div className="p-4 border-b border-gray-200">
              <PriceFilter />
            </div>

            {/* Rating Filter */}
            <div className="p-4 border-b border-gray-200">
              <RatingFilter />
            </div>
          </div>

          {/* Footer with Action Buttons */}
          <div className="flex gap-3 p-4 border-t border-gray-200 bg-white sticky bottom-0">
            <button
              onClick={() => setIsFilterOpen(false)}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="flex-1 py-3 px-4 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-md"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}