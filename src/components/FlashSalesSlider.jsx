"use client";
import React, { useEffect, useState } from 'react';
import UpperText from './UpperText';
import LowerText from './LowerText';
import { dateMockData } from '@/mockdata/mockdata';
import ProductCrousel from './ProductCrousel';
import ViewProductsButton from './ViewProductsButton';
import { productMockData } from "@/mockdata/mockdata";

const FlashSalesSlider = () => {
    const [expiryTime, setExpiryTime] = useState(null);

    useEffect(() => {
        async function fetchExpiryDate() {
            try {
                const savedTime = localStorage.getItem('flashSaleExpiry');
                if (savedTime) {
                    // Always ensure a valid date object before setting state
                    const savedDate = new Date(savedTime);
                    if (savedDate.getTime() === 0) {
                        setExpiryTime(null); // Fix: Reset to null if it's a zero timestamp
                    } else {
                        setExpiryTime(savedDate);
                    }
                } else {
                    const fetchedDate = new Date(dateMockData);

                    // Fix: Check if fetched date is 0 before saving
                    if (fetchedDate.getTime() === 0) {
                        setExpiryTime(null);
                    } else {
                        localStorage.setItem('flashSaleExpiry', fetchedDate.toISOString());
                        setExpiryTime(fetchedDate);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch expiry date:", err);
                setExpiryTime(null); // Optional: Set state to null on error
            }
        }
        fetchExpiryDate();
    }, []);

    return (
        <div className='flex flex-col border-b-[1px] border-gray-300 lg:ml-15.5 lg:mr-18.5 lg:py-10 py-6 mx-5 lg:gap-15 gap-9 '>

            <div className='flex flex-col justify-start gap-3 lg:gap-4 '>
                <div className='flex flex-col justify-start items-start w-full h-full'>
                    <UpperText text="Today's" />
                    { 
                        expiryTime ? <LowerText text="Flash Sales" time={expiryTime} /> : <LowerText text="Flash Sales" />
                    }
                </div>
                <ProductCrousel products={productMockData} />
            </div>
            
            <ViewProductsButton text="View All Products" href="/flash-sales" />

        </div>

    );
};

export default FlashSalesSlider;