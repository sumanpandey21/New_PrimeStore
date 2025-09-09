"use client"
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa"
import Link from "next/link"

export default function Footer() {
  const hoverClass =
    " relative inline-block cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full "
  return (
    <footer className="w-full bg-black text-white pt-10 mr-0">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">PrimeStore</h2>
          <p className="mb-2 font-semibold">Follow Us</p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-blue-600">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-blue-400">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-pink-500">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-blue-700">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Support */}
        <div>
          <h2 className="text-xl font-bold mb-4">Support</h2>
          <a href="mailto:support@primestore.com" className="mb-2">
            support@primestore.com
          </a>
          <a href="tel:+977 9807541352" className="mb-2">
            +977 9800000254
          </a>
        </div>

        {/* Account */}
        <div>
          <h2 className="text-xl font-bold mb-4">Account</h2>
          <ul className="flex flex-col space-y-2">
            <Link href={"/myaccount"}>
              <li className={hoverClass}>My Account</li>
            </Link>
            <Link href={"/login"}>
              <li className={hoverClass}>Login / Register</li>
            </Link>
            <Link href={"/cart"}>
              <li className={hoverClass}>Cart</li>
            </Link>
            <Link href={"/wishlist"}>
              <li className={hoverClass}>Wishlist</li>
            </Link>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="flex flex-col space-y-2">
            <Link href={"#"}>
              <li className={hoverClass}>Privacy Policy</li>
            </Link>
            <Link href={"#"}>
              <li className={hoverClass}>Terms of Use</li>
            </Link>
            <Link href={"/about"}>
              <li className={hoverClass}>About</li>
            </Link>
            <Link href={"/contact"}>
              <li className={hoverClass}>Contact</li>
            </Link>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 py-4 border-t border-gray-700 text-center text-sm">
        &copy; 2025 PrimeStore. All rights reserved.
      </div>
    </footer>
  )
}
