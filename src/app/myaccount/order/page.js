"use client"
import React, { useState } from "react"
import useOrderStore from "@/store/orderStore"
import Image from "next/image"
import { Eye, X, Check, Package, Truck, CheckCircle } from "lucide-react"

function OrdersPage() {
  const { orders, cancelOrder } = useOrderStore()
  const [selectedOrder, setSelectedOrder] = useState(null)
  const closeModal = () => setSelectedOrder(null)
 
  const status = selectedOrder?.status;
  const steps = [
    { id: 1, label: "Placed", icon: Package },
    { id: 2, label: "Approved", icon: Truck },
    { id: 3, label: "Delivered", icon: CheckCircle },
  ];

  let currentStep = 0;
  if (status === "Pending") currentStep = 1;
  if (status === "Processed") currentStep = 2;
  if (status === "Delivered") currentStep = 3;


  const handleCancelOrder = (id) => {
    cancelOrder(id)
    closeModal()
  }

  return (
    <div className="min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {orders && orders.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-300 text-black text-xs uppercase">
                  <tr>
                    <th className="px-6 py-3 text-left ">
                      Product
                    </th>
                    <th className="px-6 py-3 text-center tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-center tracking-wider hidden sm:table-cell">
                      Date
                    </th>
                    <th className="px-6 py-3 text-center tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-center tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-center tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <Image
                              src={order.image}
                              alt={order.name}
                              width={48}
                              height={48}
                              className="h-12 w-12 rounded-lg object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 line-clamp-2">
                              {order.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-900">#{order.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center hidden sm:table-cell">
                        <div className="text-sm text-gray-500">{order.createdAt}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                            }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm font-medium text-gray-900">
                          Rs {order.amount.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="inline-flex items-center p-2 rounded-full text-gray-400  hover:bg-blue-50 transition-colors duration-150"
                        >
                          <Eye size={18} className="cursor-pointer hover:text-red-600 " />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-lg text-gray-500">No orders found.</p>
            <p className="text-sm text-gray-400 mt-2">Your orders will appear here once you make a purchase.</p>
          </div>
        )}

        {/* ====================== MODAL ====================== */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-xl">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Order #{selectedOrder.id}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Placed on {selectedOrder.date}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <X size={24} className="cursor-pointer hover:text-red-600" />
                </button>
              </div>

              <div className="p-6">
                {/* Order Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Package size={16} className="mr-2" />
                      Order Summary
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Method:</span>
                        <span className="font-medium">{selectedOrder.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Status:</span>
                        <span className="font-medium">{selectedOrder.paymentStatus}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-gray-600">Total Amount:</span>
                        <span className="font-bold text-lg">Rs {selectedOrder.amount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Truck size={16} className="mr-2" />
                      Shipping Address
                    </h3>
                    <div className="text-sm space-y-1">
                      <p className="font-medium">{selectedOrder.fullName}</p>
                      <p className="text-gray-600">{selectedOrder.city}, {selectedOrder.district}</p>
                      <p className="text-gray-600">{selectedOrder.province}</p>
                      <p className="text-gray-600">{selectedOrder.phoneNumber}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
                  <div className="bg-white border rounded-lg overflow-hidden">
                    <div className="grid grid-cols-4 gap-4 bg-gray-50 p-4 text-xs font-medium text-gray-600">
                      <span>Product</span>
                      <span className="text-center">Quantity</span>
                      <span className="text-center">Price</span>
                      <span className="text-center">Total</span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 items-center p-4 border-t">
                      <div className="flex items-center gap-3">
                        <Image
                          src={selectedOrder.image}
                          alt={selectedOrder.name}
                          width={48}
                          height={48}
                          className="rounded-lg object-cover"
                        />
                        <span className="text-sm font-medium line-clamp-2">{selectedOrder.name}</span>
                      </div>
                      <span className="text-center font-medium">{selectedOrder.quantity}</span>
                      <span className="text-center">Rs {Math.round(selectedOrder.amount / selectedOrder.quantity).toLocaleString()}</span>
                      <span className="text-center font-bold">Rs {selectedOrder.amount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Tracking - Fixed Alignment */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-6 text-center text-lg">
                    Delivery Tracking
                  </h3>

                  {/* Progress Steps - Properly Centered */}
                  <div className="flex justify-center mb-8">
                    <div className="flex items-center space-x-8">
                      {steps.map((step, index) => {
                        const isCompleted = step.id <= currentStep;
                        const isLast = index === steps.length - 1;
                        const StepIcon = step.icon;

                        return (
                          <React.Fragment key={step.id}>
                            <div className="flex flex-col items-center">
                              {/* Circle with Icon */}
                              <div
                                className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors duration-300 ${isCompleted
                                  ? "bg-green-500 border-green-500 text-white shadow-lg"
                                  : "bg-white border-gray-300 text-gray-400"
                                  }`}
                              >
                                {isCompleted ? (
                                  <Check size={20} className="font-bold" />
                                ) : (
                                  <StepIcon size={20} />
                                )}
                              </div>

                              {/* Label */}
                              <div className="mt-3 text-center">
                                <div className={`text-sm font-medium ${isCompleted ? "text-green-600" : "text-gray-500"}`}>
                                  {step.label}
                                </div>
                              </div>
                            </div>

                            {/* Connector Line */}
                            {!isLast && (
                              <div
                                className={`flex-1 h-1 rounded-full transition-colors duration-300 ${isCompleted ? "bg-green-500" : "bg-gray-300"
                                  }`}
                                style={{ width: "60px" }}
                              />
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>

                  {/* Status Information */}
                  <div className="text-center space-y-2">
                    <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm">
                      <div className={`w-3 h-3 rounded-full mr-2 ${selectedOrder.status === "Delivered" ? "bg-green-500" :
                        selectedOrder.status === "Cancelled" ? "bg-red-500" : "bg-yellow-500"
                        }`}></div>
                      <span className="font-medium text-gray-900">
                        Current Status: {selectedOrder.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Estimated Delivery: {selectedOrder.estimatedDelivery}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                {selectedOrder.status !== "Delivered" && selectedOrder.status !== "Processed" && selectedOrder.status !== "Cancelled" && (
                  <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => handleCancelOrder(selectedOrder.id)}
                      className="px-6 py-2 border bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-lg transition-colors duration-150 cursor-pointer"
                    >
                      Cancel Order
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrdersPage