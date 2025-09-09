"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  const pathname = usePathname()
  const hideLayout = ['/login', '/signup', '/forgot-password']
  const shouldHideLayout = hideLayout.includes(pathname);

  return (
    <html lang="en" className="h-full w-full">
      <body className="antialiased">
        {!shouldHideLayout && <Navbar />}

        <main className="w-full">{children}</main>
         <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        {!shouldHideLayout && <Footer />}
      </body>
    </html>
  );
}
