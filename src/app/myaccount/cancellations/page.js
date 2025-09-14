"use client"
import useOrderStore from "@/store/orderStore"
import Image from "next/image"
import { RefreshCw, Package2 } from "lucide-react"

export default function CancellationsPage() {
  const { cancellations } = useOrderStore()

  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="mx-auto h-24 w-24 text-gray-300 mb-6">
        <Package2 size={96} className="mx-auto" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No cancelled orders</h3>
      <p className="text-gray-500 max-w-md mx-auto">
        You haven't cancelled any orders yet. When you cancel an order, it will appear here for your reference.
      </p>
    </div>
  )

  return (
    <>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center">
              <RefreshCw className="mr-3 text-red-500" size={28} />
              Cancelled Orders
            </h1>
            <p className="mt-2 text-gray-600">
              {cancellations.length} {cancellations.length === 1 ? 'order' : 'orders'} cancelled
            </p>
          </div>

          {/* Content */}
          {cancellations.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r bg-gray-300 text-black x-4 sm:px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="px-2 sm:px-4 py-4 text-center">
                        Product
                      </th>
                      <th className="px-2 sm:px-4 py-4 text-center ">
                        Order ID
                      </th>
                      <th className="px-2 sm:px-4 py-4 text-center">
                        Date
                      </th>
                      <th className="px-2 sm:px-4 py-4 text-center ">
                        Amount
                      </th>
                      <th className="px-2 sm:px-4 py-4 text-center">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cancellations.map((order, index) => (
                      <tr
                        key={order.id}
                        className={`hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                          }`}
                      >
                        <td className="px-2 sm:px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3 sm:space-x-4">
                            <div className="flex-shrink-0 relative">
                              <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
                                <Image
                                  src={order.image || "/placeholder.png"}
                                  alt={order.name}
                                  width={64}
                                  height={64}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">✕</span>
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-gray-900 line-clamp-2">
                                {order.name}
                              </p>
                              {/* Show Order ID on mobile */}
                              <p className="text-xs text-gray-500 mt-1 sm:hidden font-mono">
                                #{order.id}
                              </p>
                              {/* Show Date on small screens */}
                              <p className="text-xs text-gray-500 mt-1 md:hidden">
                                {order.cancelledDate || order.createdAt || order.date}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                          <div className="text-sm font-mono text-gray-900">{order.id}</div>
                        </td>

                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                          <div className="text-sm text-gray-900">
                            {order.cancelledDate || order.createdAt || order.date}
                          </div>
                        </td>

                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                          <div className="text-sm font-medium text-gray-900">
                            {order.amount ? `Rs ${order.amount.toLocaleString()}` : 'N/A'}
                          </div>
                        </td>

                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center">
                          <span className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                            <RefreshCw size={10} className="mr-1" />
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}