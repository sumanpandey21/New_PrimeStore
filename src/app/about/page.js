import React from "react"
import { DollarSign, Gift, Wallet } from "lucide-react"
import MemberCard from "./MemberCard"
import StatisticsCard from "./StatisticsCard"
import FooterLogos from "@/components/FooterLogos"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const AboutUsPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Our Story Section */}
      <div className="lg:ml-15.5 lg:mr-18.5 lg:py-10 py-6 mx-5 lg:gap-15 gap-9 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Our Story
            </h1>
            <div className="space-y-6 text-gray-700 text-base sm:text-lg leading-relaxed">
              <p>
                Launched in 2025, PrimeStore is Nepal's premier online shopping
                marketplace with an active presence in Nepal. Supported by a
                wide range of tailored marketing, data and service solutions,
                PrimeStore has different brands and serves many customers across
                the region.
              </p>
              <p>
                PrimeStore has a variety of trusted brand products to offer,
                growing very fast. PrimeStore offers genuine quality products at
                minimum cost as possible, ensuring maximum customer
                satisfaction.
              </p>
            </div>
          </div>
          {/* Image */}
          <div className="relative">
            <div className="w-full">
              <img
                src="/rightcard.svg"
                alt="Happy women shopping with colorful shopping bags"
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Statistics Section */}
      <div className="bg-white py-10 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          <StatisticsCard
            message="Monthly Product Sale"
            number="33k"
            symbol={DollarSign}
            className="bg-red-500 text-white shadow-lg hover:shadow-xl"
            iconBg="bg-white/20 text-white"
          />
          <StatisticsCard
            message="Customer active in our site"
            number="45.5k"
            symbol={Gift}
            className="bg-white border border-gray-200 shadow-lg hover:shadow-xl"
            iconBg="bg-gray-200 text-black"
          />
          <StatisticsCard
            message="Annual gross sale in our site"
            number="25k"
            symbol={Wallet}
            className="bg-white border border-gray-200 shadow-lg hover:shadow-xl"
            iconBg="bg-gray-200 text-black"
          />
        </div>
      </div>
      <MemberCard />
      <div className="lg:py-8">
        <FooterLogos />
      </div>
      <Footer />
    </div>
  )
}

export default AboutUsPage