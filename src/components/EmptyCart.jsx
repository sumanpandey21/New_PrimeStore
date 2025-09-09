import React from "react"
import Link from "next/link"

function EmptyCart() {
  return (
    <div className="text-center py-16">
      <div className="text-gray-400 text-6xl mb-4">🛒</div>
      <h2 className="text-2xl font-semibold text-gray-600 mb-2">
        Your cart is empty
      </h2>
      <p className="text-gray-500 mb-6">Add some items before checkout</p>
      <Link href ='/all-products'>
        <button className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
          Continue Shopping
        </button>
      </Link>
    </div>
  )
}

export default EmptyCart
