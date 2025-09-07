"use client";
import React, { useState, useEffect } from "react";
import { MainBannerMockData } from "@/mockdata/mockdata";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from 'lucide-react';
import slugify from "slugify";
import Link from "next/link";

const MainBanner = () => {
  const [MainBannerData, setMainBannerData] = useState([]);
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [isFocused, setIsFocused] = useState(false); // New state to track focus

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('');
      const data = await response.json();
      setMainBannerData(data);
    }

    // fetchData();
    setMainBannerData(MainBannerMockData);
  }, []);

  const goToNext = () => {
    setIndex((prev) => (prev + 1) % MainBannerMockData.length);
  };

  const goToPrev = () => {
    setIndex((prev) =>
      prev === 0 ? MainBannerMockData.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(goToNext, 3000);
    return () => clearInterval(timer);
  }, [index]);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const swipeDistance = touchStart - touchEnd;

    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  // Keyboard event handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      }
    };

    if (isFocused) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFocused, index]); // Add isFocused to the dependency array

  return (
    <div className="mx-5 mt-5 lg:mr-20">
      <div
        className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[365px] xl:h-[355px] overflow-hidden rounded-md shadow-lg"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onFocus={() => setIsFocused(true)} // Set focused state to true
        onBlur={() => setIsFocused(false)} // Set focused state to false
        tabIndex={0} // Make the div focusable
      >
        <div
          className="absolute top-0 left-0 w-full h-full flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {MainBannerData.map((banner) => (
            <Link
              href={`/products/${slugify(banner.name, { replacement: '-', lower: true })}?q=${banner.pid}`}
              key={banner.id} className="relative w-full flex-shrink-0">
              <Image
                src={banner.image}
                alt="main banner"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
                priority
              />
            </Link>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={goToPrev}
          className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white rounded-full z-10 hover: cursor-pointer focus:outline-none"
        >
          <ArrowLeft color="white" />
        </button>
        <button
          onClick={goToNext}
          className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white rounded-full z-10 hover: cursor-pointer focus:outline-none"
        >
          <ArrowRight color="white" />
        </button>
        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {MainBannerMockData.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full cursor-pointer ${index === i ? 'bg-orange-500 border-2 border-white' : 'bg-gray-500'
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainBanner;