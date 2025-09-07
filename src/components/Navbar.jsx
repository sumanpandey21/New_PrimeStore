"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import useAuthStore from "@/store/authStore";
import UserMenu from "./UserMenu";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from 'lucide-react';
import { User } from 'lucide-react';
import MobileMenu from "./MobileMenu";

const Navbar = ({ q = "" }) => {
  const { authToken, initialize } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState(q);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    initialize(); // Load token from localStorage on page load
  }, [initialize]);

  const handleMenu = () => {
    setIsMenuOpen((prev) => !prev); // toggle instead of always open
  };

  const handleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleSearch = (e) => {
    // 1. Prevent the default form submission (page reload)
    e.preventDefault();

    // 2. Trim whitespace from the query
    const trimmedQuery = query.trim();

    // 3. Check if the query is empty after trimming
    if (trimmedQuery === '') {
      return;
    }

    // 4. Construct and navigate to the URL
    router.push(`/catalog?q=${trimmedQuery}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div>
      <div>
        <div className="flex justify-between items-end px-3 lg:pl-12 lg:pr-18 py-2.5 border-b-[1px] border-gray-300">

          <div className="flex justify-center items-center">
            <button
              onClick={handleMobileMenu}
              className="lg:hidden p-2 rounded-full hover:bg-gray-100 mt-3 mr-[-15] lg:mr-[-10] ">
              <Menu />
            </button>

            <Link
              href="/"
              className="flex justify-center items-center text-lg lg:text-xl font-bold"
            >
              <Image
                src="/primestore.svg"
                alt="PrimeStore Logo"
                width={64}
                height={24}
                className=" lg:mr-[-12] mb-[-8]"
              />
              <div className="hidden sm:block mt-4 ml-[-10] lg:ml-[0]">PrimeStore</div>
            </Link>

          </div>


          {/* Navbar Links Big Screen */}
          <div className="hidden lg:flex justify-center items-center gap-4">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <span className="relative inline-block py-2 px-4 cursor-pointer hover:text-gray-600">
                  {item.name}
                  {/* Small underline */}
                  {pathname === item.path && (
                    <span className="absolute left-1/2 bottom-1.5 w-11 h-[1px] bg-black -translate-x-1/2 rounded-full"></span>
                  )}
                </span>
              </Link>
            ))}

            {!authToken && (
              <Link href="/login" className="py-2 px-4 hover:text-gray-600">
                Sign In
              </Link>
            )}





          </div>

          <div className="flex justify-center items-center gap-0.5 lg:gap-1">

            <form onSubmit={handleSearch}>
              <div className="flex justify-center items-center gap-1 rounded-sm border-[1px] border-gray-300 w-full ">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="flex-1 text-sm font-medium lg:px-3 lg:rounded-sm outline-none w-full px-1"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="border-l-[1px] border-gray-300 p-1.5 bg-gray-100 rounded-r-[3px] hover:bg-gray-200"
                >
                  <Image
                    className="hover:cursor-pointer"
                    src="/search.svg"
                    alt="search logo"
                    width={24}
                    height={24}
                  />
                </button>
              </div>

            </form>



            <Link href="/wishlist" className="p-0.5 lg:p-2 rounded-full hover:bg-gray-100">
              <Image src="/heart.svg" alt="wishlist logo" width={28} height={24} />
            </Link>
            <Link href="/cart" className="p-0.5 lg:p-2 rounded-full hover:bg-gray-100">
              <Image src="/cart.svg" alt="cart logo" width={28} height={24} />
            </Link>
            {authToken && (
              <button
                ref={buttonRef}
                onClick={handleMenu}
                className={`p-0.5 lg:p-2 rounded-full ${isMenuOpen ? "bg-orange-700" : "hover:bg-gray-100"
                  }`}
              >
                {!isMenuOpen ?
                  (<User size={28} color="#000000" strokeWidth={1.25} />) :
                  (<User size={28} color="#ffffff" strokeWidth={1.25} />)}
              </button>
            )}
          </div>
        </div>


        {isMenuOpen && (
          <div ref={menuRef}>
            <UserMenu />
          </div>
        )}
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </div>

  );
};

export default Navbar; 