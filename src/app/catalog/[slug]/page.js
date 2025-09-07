"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import CircularIndeterminate from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { notFound } from "next/navigation";

const page = () => {
    // Get the slug from the URL parameters
    const params = useParams();
    const slug = params.slug;

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) return; 

        const fetchProducts = async () => {
            setLoading(true); 
            try {
                // const res = await fetch(`/api/products/${slug}`);

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
                    setProducts([{ id: 1, name: `Sample product of ${slug}` }]);
                    setLoading(false);
                }, 1500);
            } catch (err) {
                setError("Failed to fetch products.");
                setLoading(false);
            }
        };

        fetchProducts(); // <-- Call the function to start the process
    }, [slug]);

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
            <Navbar />
            <h1>Products for {slug}</h1>
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