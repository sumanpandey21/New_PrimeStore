"use client"
import { useState } from "react"
import Link from "next/link"
import AlertMessage from "@/components/AlertMessage"

export default function MyProfilePage() {
  const [formData, setFormData] = useState({
    firstName: "Ram",
    lastName: "Poudel",
    email: "ram1256@gmail.com",
    address: "Kathmandu, Nepal",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const regexRules = {
    firstName: /^[A-Za-z]{2,}$/,
    lastName: /^[A-Za-z]{2,}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    address: /^.{5,}$/,
  }
  const [message, setMessage] = useState("")
  const [alertTrigger, setAlertTrigger] = useState(0)

  const showMessage = (msg) => {
    setMessage(msg)
    setAlertTrigger((prev) => prev + 1)
  }

  const handleSaveChanges = (e) => {
    e.preventDefault()
    const requiredFields = ["firstName", "lastName", "email", "address"]
    const missingFields = requiredFields.filter(
      (field) => !formData[field].trim()
    )

    if (missingFields.length > 0) {
      showMessage(`Please fill in: ${missingFields.join(", ")}`)
      return
    }

    if (!regexRules.firstName.test(formData.firstName)) {
      showMessage("First name must be at least 2 letters.")
      return
    }
    if (!regexRules.lastName.test(formData.lastName)) {
      showMessage("Last name must be at least 2 letters.")
      return
    }
    if (!regexRules.email.test(formData.email)) {
      showMessage("Enter a valid email address.")
      return
    }
    if (!regexRules.address.test(formData.address)) {
      showMessage("Address must be at least 5 characters.")
      return
    }

    showMessage("Message sent successfully!")

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      address: "",
    })
  }

  const handleCancel = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      address: "",
    })
  }

  return (
    <div className="lg:w-full">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-red-500 mb-6">
          Edit Your Profile
        </h2>
        <form onSubmit={handleSaveChanges} className="space-y-6 mb-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center sm:flex-row gap-5 mt-10">
            <Link href={"/"}>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100 active:bg-gray-300 transition-colors"
              >
                Cancel
              </button>{" "}
            </Link>

            <button
              type="submit"
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 active:bg-red-800 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
        <AlertMessage message={message} trigger={alertTrigger} />
      </div>
    </div>
  )
}
