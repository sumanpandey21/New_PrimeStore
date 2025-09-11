"use client"
import React, { useState, useRef } from 'react';
import { Heart, Truck, RefreshCcw } from 'lucide-react';
import { useSearchParams } from "next/navigation";
import { productMockData, categoriesMockData } from "@/mockdata/mockdata";
import { toast } from "react-toastify"
import { useCart } from "@/store/cartStore";


const ProductDetailsPage = () => {

  const searchParams = useSearchParams();
  const id = searchParams.get("q");

  // flatten category products
  const allCategoryProducts = categoriesMockData.flatMap((cat) => cat.products);

  // merge with productMockData
  const allProducts = [...productMockData, ...allCategoryProducts];

  // find the product
  const product = allProducts.find((p) => p.id === parseInt(id));

  const { cartItems, addItem } = useCart();

  if (!product) return <div>Product not found</div>;

  const [selectedImage, setSelectedImage] = useState(product.images.main);
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");
  const [isZoomed, setIsZoomed] = useState(false);
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  const discountedPrice = Math.round(product.price - (product.price * product.discount) / 100);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  // check if product already in cart
  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (!isInCart) {
      addItem({
        id: product.id,
        name: product.name,
        price: discountedPrice ? discountedPrice : product.price,
        quantity: 1,
        image: product.images.main,
        item_left: product.item_left,
      });

      toast.success("Product added to cart successfully!");
    } 
    else toast.info("Already in cart")
  };


  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Images */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Side Images */}
          <div className="flex lg:flex-col gap-2 order-2 lg:order-1">
            {product.images.gallery.map((img, index) => (
              <div
                key={index}
                className="w-20 h-20 lg:w-24 lg:h-24 border-2 rounded-lg cursor-pointer hover:border-red-500 transition-colors overflow-hidden bg-gray-50"
                onMouseEnter={() => setSelectedImage(img)}
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img}
                  alt={`${product.name} - view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="flex-1 order-1 lg:order-2">
            <div
              className="w-full h-80 lg:h-96 xl:h-[500px] border rounded-lg overflow-hidden bg-gray-50 cursor-zoom-in"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
              ref={imgRef}
              style={{
                backgroundImage: `url(${selectedImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: isZoomed ? "200%" : "contain",
                backgroundPosition: isZoomed ? backgroundPosition : "center",
                transition: "background-size 0.3s ease",
              }}
            />
          </div>
        </div>

        {/* Right Side - Product Details */}
        <div className="space-y-5 space-x-3">
          <div>
            <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-gray-500">({product.totalRatings} Reviews)</span>
              {product.in_stock ? <span className="text-sm text-green-600 ml-2">In Stock</span> : <span className="text-sm text-red-600 ml-2">Out of Stock</span>}
            </div>

            {/* Price */}
            <div className="text-2xl font-semibold text-gray-900">
              Rs. {discountedPrice > 0 ? discountedPrice.toLocaleString() : product.price}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              className={`w-full py-3 px-6 rounded-md font-medium transition-colors ${product.in_stock
                ? 'bg-red-500 hover:bg-red-600 text-white cursor-pointer active:bg-red-700'
                : 'disabled bg-gray-300'}`}
              onClick={handleAddToCart}
            >
              Add to cart
            </button>

            <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery Info */}
          <div className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-gray-600" />
              <div>
                <div className="font-medium">Free Delivery inside Chitwan</div>
                <div className="text-sm text-gray-500">Checkout dropdown box for Delivery Availability</div>
              </div>
            </div>

            <hr className="border-gray-200" />

            <div className="flex items-center gap-3">
              <RefreshCcw className="w-5 h-5 text-gray-600" />
              <div>
                <div className="font-medium">Return Delivery</div>
                <div className="text-sm text-gray-500">Free 30 Days Delivery Returns. Details</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;