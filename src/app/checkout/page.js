"use client"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useCart } from "@/store/cartStore"
import locations from "@/data/nepal_locations"
import EmptyCart from "@/components/EmptyCart"
import Dropdown from "@/components/Dropdown"
import { toast } from "react-toastify"

const CheckoutPage = () => {
  const { cartItems } = useCart()

  const [billingDetails, setBillingDetails] = useState({
    fullName: "",
    province: "",
    district: "",
    townCity: "",
    emailAddress: "",
    phoneNumber: "",
  })

  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [subtotal, setSubtotal] = useState(0)
  const deliveryCharge = 0

  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
    setSubtotal(total)
  }, [cartItems])

  const handleInputChange = (field, value) => {
    setBillingDetails((prev) => ({
      ...prev,
      [field]: value,
    }))
  }


  const validateFields = () => {

    const fullNameRegex = /^[A-Za-z]+(?:[ .'-][A-Za-z]+)+$/
    const phoneRegex = /^(97|98)\d{8}$/ 
    const emailRegex = /^[A-Za-z][^\s@]*@[^\s@]+\.[^\s@]+$/

    if (!phoneRegex.test(billingDetails.phoneNumber)) {
      toast.error("Invalid phone number. Use a valid Nepali number.")
      return false
    }

    if (!emailRegex.test(billingDetails.emailAddress)) {
      toast.error("Invalid email address.")
      return false
    }
    if (!fullNameRegex.test(billingDetails.fullName)) {
      toast.error("Invalid name.")
      return false
    }

    return true
  }

  // Place order
  const handlePlaceOrder = () => {
    const requiredFields = [
      "fullName",
      "province",
      "district",
      "townCity",
      "phoneNumber",
      "emailAddress",
    ]
    const missingFields = requiredFields.filter(
      (field) => !billingDetails[field].trim()
    )

    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.join(", ")}`)
      return
    }

    if (!validateFields()) return

    toast.success("Order placed successfully!") 

    setBillingDetails({
      fullName: "",
      province: "",
      district: "",
      townCity: "",
      phoneNumber: "",
      emailAddress: "",
    })
  }

  const formatPrice = (price) => `Rs ${price.toLocaleString()}`

  // 🔹 Dropdown data
  const provinces = locations.provinces
  const districts = billingDetails.province
    ? provinces.find((p) => p.name === billingDetails.province)?.districts || []
    : []
  const cities = billingDetails.district
    ? districts.find((d) => d.name === billingDetails.district)?.cities || []
    : []

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600">
          <Link href={"/"}>
            <span className="hover:text-gray-800 cursor-pointer">Home</span>
          </Link>
          <span className="mx-2">/</span>
          <span className="hover:text-gray-800 cursor-pointer">Product</span>
          <span className="mx-2">/</span>
          <Link href={"/cart"}>
            <span className="hover:text-gray-800 cursor-pointer">
              View Cart
            </span>
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">CheckOut</span>
        </nav>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Billing Details Form */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    value={billingDetails.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 bg-gray-50"
                    required
                  />
                </div>

                <Dropdown
                  label="Province*"
                  options={provinces}
                  value={billingDetails.province}
                  onChange={(val) => {
                    handleInputChange("province", val)
                    handleInputChange("district", "")
                    handleInputChange("townCity", "")
                  }}
                />

                {/* District */}
                <Dropdown
                  label="District*"
                  options={districts}
                  value={billingDetails.district}
                  disabled={!billingDetails.province}
                  onChange={(val) => {
                    handleInputChange("district", val)
                    handleInputChange("townCity", "")
                  }}
                />

                {/* Town/City */}
                <Dropdown
                  label="Town/City*"
                  options={cities}
                  value={billingDetails.townCity}
                  disabled={!billingDetails.district}
                  onChange={(val) => handleInputChange("townCity", val)}
                />

                {/* Email Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    value={billingDetails.emailAddress}
                    onChange={(e) =>
                      handleInputChange("emailAddress", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 bg-gray-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number*
                  </label>
                  <input
                    type="text"
                    value={billingDetails.phoneNumber}
                    onChange={(e) =>
                      handleInputChange("phoneNumber", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 bg-gray-50"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm p-7">
              <div className="bg-white rounded-lg shadow-sm p-7">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-3 border-b"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="inline-block text-grey-50 text-sm">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Price Summary */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-gray-600">Delivery Charge:</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total:</span>
                    <span>{formatPrice(subtotal + deliveryCharge)}</span>
                  </div>
                </div>
                {/* Payment Methods */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="online"
                      name="payment"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w- h-4 text-red-500"
                    />
                    <label
                      htmlFor="online"
                      className="ml-3 flex items-center justify-between w-full"
                    >
                      <span>Online payment</span>
                      <div className="flex items">
                        <img src="/esewa.png" alt="eSewa" width={70} height={70} />
                      </div>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="cash"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === "cash"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-red-500"
                    />
                    <label htmlFor="cash" className="ml-3">
                      Cash on delivery
                    </label>
                  </div>
                </div>
                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors font-medium active:bg-red-600 mb-6 cursor-pointer"
                >
                  Place
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CheckoutPage
