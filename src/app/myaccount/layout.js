"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


export default function AccountLayout({ children }) {

  const pathname = usePathname()
  const [email, setEmail] = useState("");
  const linkClass = (path) =>
    `block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === path
      ? "text-orange-600 bg-orange-50"
      : "text-gray-700 hover:text-orange-600 hover:bg-gray-50"
    }`;


  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("authToken"); // adjust if your key is different

        if (!token) {
          console.log("No token found");
          return;
        }

        const response = await fetch("http://127.0.0.1:8000/auth/user/", {
          headers: {
            Authorization: `Bearer ${token}`,  // <--- send JWT
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch user");

        const data = await response.json();
        setEmail(data.email);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);


  return (
    <div className="min-h-screen">
      <div className="bg-white ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-end">
          <div className="text-sm">
            Welcome! <span className="text-red-500 font-medium">{email}</span>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4 hidden lg:block">
          <div className="bg-white rounded-lg shadow-sm p-6 px-5">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Manage My Account
            </h2>

            <nav className="space-y-4">
              <Link href="/myaccount/my-profile" className={linkClass("/myaccount/my_profile")}>
                My Profile
              </Link>
            </nav>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                My Orders
              </h3>
              <nav className="space-y-3">
                <Link href="/myaccount/returns" className={linkClass("/myaccount/returns")}>
                  My Returns
                </Link>
                <Link href="/myaccount/cancellations" className={linkClass("/myaccount/cancellations")}>
                  My Cancellations
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Right content */}
        <div className="lg:w-3/4">{children}</div>
      </div>
    </div>

  );
}
