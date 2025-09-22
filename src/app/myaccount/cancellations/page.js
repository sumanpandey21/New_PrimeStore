"use client"
import React, { useMemo } from "react"
import useOrderStore from "@/store/orderStore"
import Image from "next/image"
import { Package } from "lucide-react"

function CancellationsPage() {
  const { getAllCancellations } = useOrderStore()
  const cancellations = getAllCancellations()

  const mergedCancellations = useMemo(() => {
    const merged = []

    cancellations.forEach(cancellation => {
      if (cancellation.cancellationType === 'full_order') {
        // For full orders, add each item separately
        cancellation.items?.forEach(item => {
          const existingIndex = merged.findIndex(m =>
            m.productId === item.id &&
            m.productName === item.name &&
            m.price === item.price
          )

          if (existingIndex >= 0) {
            // Merge with existing item
            merged[existingIndex].totalQuantity += item.quantity
            merged[existingIndex].totalAmount += (item.price * item.quantity)
            merged[existingIndex].cancellationCount += 1
            merged[existingIndex].cancellationIds.push(cancellation.id)
            merged[existingIndex].latestCancelDate = new Date(cancellation.cancelledAt) > new Date(merged[existingIndex].latestCancelDate)
              ? cancellation.cancelledAt
              : merged[existingIndex].latestCancelDate
          } else {
            // Add new item
            merged.push({
              id: `merged_${item.id}_${Date.now()}_${Math.random()}`,
              productId: item.id,
              productName: item.name,
              productImage: item.image,
              price: item.price,
              totalQuantity: item.quantity,
              totalAmount: item.price * item.quantity,
              cancellationType: 'from_full_order',
              originalCancellation: cancellation,
              cancellationIds: [cancellation.id],
              cancellationCount: 1,
              latestCancelDate: cancellation.cancelledAt
            })
          }
        })
      } else if (cancellation.cancellationType === 'partial_item') {
        // For partial items, merge similar products
        const item = cancellation.cancelledItem
        const existingIndex = merged.findIndex(m =>
          m.productId === item.id &&
          m.productName === item.name &&
          m.price === item.price
        )

        if (existingIndex >= 0) {
          // Merge with existing item
          merged[existingIndex].totalQuantity += item.quantity
          merged[existingIndex].totalAmount += cancellation.cancelledAmount
          merged[existingIndex].cancellationCount += 1
          merged[existingIndex].cancellationIds.push(cancellation.id)
          merged[existingIndex].latestCancelDate = new Date(cancellation.cancelledAt) > new Date(merged[existingIndex].latestCancelDate)
            ? cancellation.cancelledAt
            : merged[existingIndex].latestCancelDate
        } else {
          // Add new item
          merged.push({
            id: cancellation.id,
            productId: item.id,
            productName: item.name,
            productImage: item.image,
            price: item.price,
            totalQuantity: item.quantity,
            totalAmount: cancellation.cancelledAmount,
            cancellationType: 'partial_item',
            originalCancellation: cancellation,
            cancellationIds: [cancellation.id],
            cancellationCount: 1,
            latestCancelDate: cancellation.cancelledAt
          })
        }
      }
    })

    // Sort by latest cancellation date
    return merged.sort((a, b) => new Date(b.latestCancelDate) - new Date(a.latestCancelDate))
  }, [cancellations])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen py-6 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cancelled Items</h1>
          <p className="text-gray-600">View all your cancelled products and quantities</p>
        </div>

        {mergedCancellations && mergedCancellations.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-300 text-black font-semibold uppercase">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs  tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-center text-xs  tracking-wider">
                      Qty
                    </th>
                    <th className="px-6 py-3 text-center text-xs  tracking-wider">
                      Unit Price
                    </th>
                    <th className="px-6 py-3 text-center text-xs  tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-center text-xs  tracking-wider">
                      Date
                    </th>

                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mergedCancellations.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <Image
                            src={item.productImage}
                            alt={item.productName}
                            width={60}
                            height={60}
                            className="rounded-lg object-cover"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900 line-clamp-2">
                              {item.productName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="text-lg font-bold text-red-600">
                          {item.totalQuantity}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.totalQuantity === 1 ? 'item' : 'items'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="text-sm font-medium text-gray-900">
                          {item.price.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="text-lg font-bold text-green-600">
                          {item.totalAmount.toLocaleString()}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <div className="text-sm text-gray-900">
                          {formatDate(item.latestCancelDate)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-lg text-gray-500">No cancelled items found.</p>
            <p className="text-sm text-gray-400 mt-2">Your cancelled products will appear here.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CancellationsPage