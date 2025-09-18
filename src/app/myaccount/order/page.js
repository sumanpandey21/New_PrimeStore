"use client"
import React, { useState, useEffect } from "react"
import useOrderStore from "@/store/orderStore"
import Image from "next/image"
import { Eye, X, Check, Package, Truck, CheckCircle, Minus, Plus } from "lucide-react"

function OrdersPage() {
  const { orders, cancelOrder, cancelItemQuantity } = useOrderStore()
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [cancelModal, setCancelModal] = useState(null) // { itemId, itemName, maxQuantity }
  const [cancelQuantity, setCancelQuantity] = useState(1)

  const closeModal = () => setSelectedOrder(null)
  const closeCancelModal = () => {
    setCancelModal(null)
    setCancelQuantity(1)
  }
  useEffect(() => {
    if (selectedOrder) {
      const updated = orders.find(o => o.id === selectedOrder.id)
      if (updated) setSelectedOrder(updated)
    }
  }, [orders])


  const status = selectedOrder?.status;

  const steps = [
    { id: 1, label: "Placed", icon: Package },
    { id: 2, label: "Approved", icon: Truck },
    { id: 3, label: "Delivered", icon: CheckCircle },
  ];

  let currentStep = 0;
  if (status === "Placed") currentStep = 1;
  if (status === "Processed") currentStep = 2;
  if (status === "Delivered") currentStep = 3;

  const handleCancelOrder = (id) => {
    cancelOrder(id)
    closeModal()
  }

  const handleItemCancelClick = (itemId, itemName, maxQuantity) => {
    setCancelModal({ itemId, itemName, maxQuantity })
    setCancelQuantity(1)
  }

  const handleConfirmItemCancel = () => {
    if (cancelModal && selectedOrder) {
      cancelItemQuantity(selectedOrder.id, cancelModal.itemId, cancelQuantity)
      const updatedOrder = orders.find(o => o.id === selectedOrder.id)
      setSelectedOrder(updatedOrder)
      closeCancelModal()
    }
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
                          Rs {order.subtotal.toLocaleString()}
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

        {/* ====================== ORDER DETAILS MODAL ====================== */}
        {selectedOrder && (
          <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
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
                        <span className="font-bold text-lg">Rs {selectedOrder.subtotal.toLocaleString()}</span>
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
                      <p className="text-black">{selectedOrder.city}, {selectedOrder.district}, {selectedOrder.province}</p>
                      <p className="text-black">{selectedOrder.phoneNumber}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
                  <div className="bg-white border rounded-lg overflow-hidden">
                    <div className="grid grid-cols-5 gap-4 bg-gray-50 p-4 text-xs font-medium text-gray-600">
                      <span>Product</span>
                      <span className="text-center">Quantity</span>
                      <span className="text-center">Price</span>
                      <span className="text-center">Total</span>
                      {status === "Pending" && (

                        <span className="text-center">Action</span>
                      )}
                    </div>

                    {selectedOrder.items.map((item) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-5 gap-4 items-center p-4 border-t"
                      >
                        {/* Product */}
                        <div className="flex items-center gap-3">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="rounded-lg object-cover"
                          />
                          <span className="text-sm font-medium line-clamp-2">
                            {item.name}
                          </span>
                        </div>

                        {/* Quantity */}
                        <span className="text-center font-medium">{item.quantity}</span>

                        {/* Price */}
                        <span className="text-center">
                          Rs {item.price.toLocaleString()}
                        </span>

                        {/* Total */}
                        <span className="text-center font-bold">
                          Rs {(item.price * item.quantity).toLocaleString()}
                        </span>

                        {/* Cancel single product */}
                        {status === "Placed" && (
                          <button
                            onClick={() => handleItemCancelClick(item.id, item.name, item.quantity)}
                            className="flex items-center justify-center text-red-600 hover:text-red-800 text-sm hover:bg-red-50 rounded p-1 transition-colors cursor-pointer"
                            title="Cancel Item"
                          >
                            <Minus size={16} className="mr-1" />
                            Cancel
                          </button>
                        )}

                      </div>
                    ))}
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
                      Cancel Entire Order
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ====================== QUANTITY CANCEL MODAL ====================== */}
        {cancelModal && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-[60] p-4">
            <div className="bg-white rounded-lg max-w-md w-full mx-4 shadow-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Cancel Item
                  </h3>
                  <button
                    onClick={closeCancelModal}
                    className="text-gray-400 hover:text-red-600 cursor-pointer transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-4">
                    How many items of <span className="font-medium text-gray-900">"{cancelModal.itemName}"</span> would you like to cancel?
                  </p>

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Quantity to Cancel (Max: {cancelModal.maxQuantity})
                    </label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setCancelQuantity(Math.max(1, cancelQuantity - 1))}
                        disabled={cancelQuantity <= 1}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      >
                        <Minus size={18} />
                      </button>

                      <input
                        type="number"
                        min="1"
                        max={cancelModal.maxQuantity}
                        value={cancelQuantity}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 1;
                          setCancelQuantity(Math.min(Math.max(1, value), cancelModal.maxQuantity));
                        }}
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />

                      <button
                        onClick={() => setCancelQuantity(Math.min(cancelModal.maxQuantity, cancelQuantity + 1))}
                        disabled={cancelQuantity >= cancelModal.maxQuantity}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Plus size={16} className="cursor-pointer" />
                      </button>
                    </div>

                    <div className="flex space-x-2 mt-2">
                      {[...new Set([1, Math.floor(cancelModal.maxQuantity / 2), cancelModal.maxQuantity])]
                        .filter(qty => qty > 0) // avoid 0 or negatives
                        .map(qty => (
                          <button
                            key={qty}
                            onClick={() => setCancelQuantity(qty)}
                            className={`px-3 py-1 text-xs rounded-full border transition-colors cursor-pointer
                              ${cancelQuantity === qty
                                ? 'bg-blue-100 border-blue-300 text-blue-700'
                                : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                              }`}
                          >
                            {qty === 1 ? '1' : qty === cancelModal.maxQuantity ? 'All' : `${qty}`}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={closeCancelModal}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmItemCancel}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                  >
                    Confirm Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrdersPage