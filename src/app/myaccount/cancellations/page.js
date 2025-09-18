"use client"
import React, { useState } from "react"
import useOrderStore from "@/store/orderStore"
import Image from "next/image"
import { Eye, X, Package, Calendar, ShoppingBag } from "lucide-react"

function CancellationsPage() {
  const { getAllCancellations } = useOrderStore()
  const cancellations = getAllCancellations()
  const [selectedCancellation, setSelectedCancellation] = useState(false)

  const closeModal = () => setSelectedCancellation(false)

  const groupedCancellations = cancellations.reduce((groups, cancellation) => {
    const date = new Date(cancellation.cancelledAt).toDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(cancellation)
    return groups
  }, {})

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatCurrency = (amount) => {
    return `Rs ${amount.toLocaleString()}`
  }

  // Merge duplicate cancelled items for partial_item cancellations
  const mergePartialCancellations = (cancellations) => {
    const merged = []
    const map = {}

    cancellations.forEach(cancellation => {
      if (
        cancellation.cancellationType === "partial_item" &&
        cancellation.cancelledItem
      ) {
        const key = `${cancellation.orderId}-${cancellation.cancelledItem.id}`

        if (map[key]) {
          // Already exists → update quantity + cancelledAmount
          map[key].cancelledItem.quantity += cancellation.cancelledItem.quantity
          map[key].cancelledAmount += cancellation.cancelledAmount
        } else {
          // New entry
          map[key] = { ...cancellation }
          merged.push(map[key])
        }
      } else {
        // Keep full_order cancellations as-is
        merged.push(cancellation)
      }
    })

    return merged
  }

  return (
    <div className="min-h-screen py-6 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Cancellations</h1>
          <p className="text-gray-600">View all your cancelled orders and items</p>
        </div>

        {cancellations && cancellations.length > 0 ? (
          <div className="space-y-6">
            {Object.entries(groupedCancellations).map(([date, dateCancellations]) => (
              <div key={date} className="bg-gray-300 rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y ">
                    <thead className="bg-gray-300 text-black">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Order Details
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                          Date & Time
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mergePartialCancellations(dateCancellations).map((cancellation) => (
                        <tr key={cancellation.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              {cancellation.cancellationType === 'partial_item' && cancellation.cancelledItem ? (
                                <>
                                  <Image
                                    src={cancellation.cancelledItem.image}
                                    alt={cancellation.cancelledItem.name}
                                    width={40}
                                    height={40}
                                    className="rounded-lg object-cover"
                                  />
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">
                                      {cancellation.cancelledItem.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      Order #{cancellation.orderId} • Qty: {cancellation.cancelledItem.quantity}
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <div className="flex items-center">
                                  <ShoppingBag size={40} className="text-gray-400 mr-3" />
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">
                                      Full Order #{cancellation.id}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {cancellation.items?.length || 0} items
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                       
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">
                              {formatCurrency(
                                cancellation.cancellationType === 'partial_item'
                                  ? cancellation.cancelledAmount
                                  : cancellation.subtotal
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500">
                              {formatDate(cancellation.cancelledAt)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {cancellation.cancellationType === "full_order" && (
                              <button
                                onClick={() => setSelectedCancellation(cancellation)}
                                className="inline-flex items-center p-2 rounded-full text-gray-400 hover:bg-blue-50 transition-colors duration-150"
                              >
                                <Eye size={18} className="hover:text-red-600 cursor-pointer" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-lg text-gray-500">No cancellations found.</p>
            <p className="text-sm text-gray-400 mt-2">Your cancelled orders will appear here.</p>
          </div>
        )}

        {/* ====================== CANCELLATION DETAILS MODAL ====================== */}
        {selectedCancellation && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-xl">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Cancellation Details
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Full Order Cancellation
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <X size={24} className="cursor-pointer hover:text-red-500"/>
                </button>
              </div>

              <div className="p-6 space-y-6">

                {/* Cancelled Items Details */}
                <div>
                  {selectedCancellation.cancellationType === 'full_order' && (
                    <div className="bg-white border rounded-lg overflow-hidden">
                      <div className="grid grid-cols-4 gap-4 bg-gray-50 p-4 text-xs font-medium text-gray-600">
                        <span>Product</span>
                        <span className="text-center">Quantity</span>
                        <span className="text-center">Price</span>
                        <span className="text-center">Total</span>
                      </div>
                      {selectedCancellation.items?.map((item) => (
                        <div key={item.id} className="grid grid-cols-4 gap-4 items-center p-4 border-t">
                          <div className="flex items-center gap-3">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={48}
                              height={48}
                              className="rounded-lg object-cover"
                            />
                            <span className="text-sm font-medium">{item.name}</span>
                          </div>
                          <span className="text-center font-medium">{item.quantity}</span>
                          <span className="text-center">{formatCurrency(item.price)}</span>
                          <span className="text-center font-bold">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CancellationsPage