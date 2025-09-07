// app/myaccount/returns/page.jsx
"use client"
import TableCard from "@/components/TableCard"

export default function ReturnsPage() {
  const returns = [
    {
      id: "1001",
      product: "Wireless Headphones",
      date: "2025-08-18",
      status: "Pending",
      reason: "Defective item",
      image: "/mobilephone.png",
    },
    {
      id: "1002",
      product: "Smart Watch",
      date: "2025-07-25",
      status: "Approved",
      reason: "Wrong color received",
      image: "/mobilephone.png",
    },
    {
      id: "1003",
      product: "Gaming Mouse",
      date: "2025-06-10",
      status: "Rejected",
      reason: "Outside return window",
      image: "/mobilephone.png",
    },
  ]

  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
    Approved: "bg-green-100 text-green-700 border-green-300",
    Rejected: "bg-red-100 text-red-700 border-red-300",
  }

  const columns = [
    // { key: "id" },
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
      title="My Returns"
      data={returns}
      columns={columns}
      statusStyles={statusStyles}
    />
  )
}
