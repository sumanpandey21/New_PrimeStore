"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import CircularIndeterminate from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { notFound } from "next/navigation";

const page = () => {
    // Get the searchQuery from the URL parameters
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("q");

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!searchQuery) return; // Exit if slug is not available

        const fetchProducts = async () => {
            setLoading(true); // <-- This is what was missing
            try {
                // const res = await fetch(`/api/products/${searchQuery}`);

                // if (!res.ok) {
                //     // If not found (e.g., 404), call notFound()
                //     if (res.status === 404) {
                //         notFound();
                //     }
                //     // Handle other errors
                //     throw new Error("Failed to fetch products.");
                // }

                // const data = await res.json();
                // setProducts(data);


                // Simulating a 3-second network request delay
                setTimeout(() => {
                    setProducts([{ id: 1, name: `Sample product of ${searchQuery}` }]);
                    setLoading(false);
                }, 1500);
            } catch (err) {
                setError("Failed to fetch products.");
                setLoading(false);
            }
        };

        fetchProducts(); // <-- Call the function to start the process
    }, [searchQuery]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <CircularIndeterminate />
            </div>
        );
    }
    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="text-lg">{error}</div>
            </div>
        );
    }

    return (
        <div>
            <Navbar q={searchQuery} />
            <h1>Products for {searchQuery}</h1>
            {products?.length ? (
                <ul>
                    {products.map((p) => (
                        <li key={p.id}>{p.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No products found.</p>
            )}
        </div>
    );
};

export default page;