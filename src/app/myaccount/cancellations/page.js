"use client"
import TableCard from "@/components/TableCard"

export default function CancellationsPage() {
  const cancellations = [
    {
      id: "2001",
      product: "Bluetooth Speaker",
      date: "2025-08-20",
      status: "Cancelled by User",
      reason: "Changed my mind",
      image: "/mobilephone.png",
    },
    {
      id: "2002",
      product: "Laptop Stand",
      date: "2025-07-30",
      status: "Cancelled by User",
      reason: "Out of stock",
      image: "/mobilephone.png",
    },
    {
      id: "2003",
      product: "Office Chair",
      date: "2025-06-18",
      status: "Cancelled by User",
      reason: "Found cheaper elsewhere",
      image: "/mobilephone.png",
    },
  ]

  const statusStyles = {
    "Cancelled by User": "bg-gray-100 text-gray-700 border-gray-300",
    "Cancelled by Seller": "bg-red-100 text-red-700 border-red-300",
  }

  const columns = [
    { key: "id" },
    { key: "product" },
    { key: "date", className: "text-sm text-gray-600" },
    { key: "status", type: "status" },
    {
      key: "action",
      type: "action",
      onClick: (item) => alert(`View ${item.id}`),
      label: "View Details",
    },
  ]

  return (
    <TableCard
      title="My Cancellations"
      data={cancellations}
      columns={columns}
      statusStyles={statusStyles}
    />
  )
}
