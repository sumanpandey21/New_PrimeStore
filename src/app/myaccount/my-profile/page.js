"use client"
import { useEffect, useState } from "react"
import AlertMessage from "@/components/AlertMessage"
import Users from "@/data/users"
import Dropdown from "@/components/Dropdown"
import locations from "@/data/nepal_locations"
export default function MyProfilePage() {
  const [formData, setFormData] = useState({})

  useEffect(() => {
    if (Users.users.length > 0) {
      const user = Users.users[0]
      console.log(user)
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        province: user.province || "",
        district: user.district || "",
        city: user.city || "",
      })
    }
  }, [])

  const [message, setMessage] = useState("")
  const [alertTrigger, setAlertTrigger] = useState(0)

  const showMessage = (msg) => {
    setMessage(msg)
    setAlertTrigger((prev) => prev + 1)
  }

  const handleSaveChanges = (e) => {
    e.preventDefault()
    const requiredFields = ["province", "district", "city"]
    const missingFields = requiredFields.filter((field) => !formData[field])

    if (missingFields.length > 0) {
      showMessage(`Please fill in: ${missingFields.join(", ")}`)
      return
    }

    showMessage("Saved successfully!")
  }

  const handleCancel = () => {
    if (Users.users.length > 0) {
      const user = Users.users[0]
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        province: user.province || "",
        district: user.district || "",
        city: user.city || "",
      })
    }
  }

  const provinces = locations.provinces
  const districts = formData.province
    ? provinces.find((p) => p.name === formData.province)?.districts || []
    : []
  const cities = formData.district
    ? districts.find((d) => d.name === formData.district)?.cities || []
    : []
  return (
    <div className="lg:w-full">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-red-500 mb-6">
          Edit Your Profile
        </h2>
        <form onSubmit={handleSaveChanges} className="space-y-6 mb-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["firstName", "lastName", "email"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field === "firstName"
                    ? "First Name"
                    : field === "lastName"
                    ? "Last Name"
                    : "Email"}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  value={formData[field] || ""} 
                  disabled
                  className="w-full px-3 py-2 rounded-md shadow-sm bg-gray-200 cursor-not-allowed"
                />
              </div>
            ))}
          </div>

          {/* Address Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Dropdown
              label="Province"
              options={locations.provinces}
              value={formData.province}
              onChange={(val) =>
                setFormData({
                  ...formData,
                  province: val,
                  district: "",
                  city: "",
                })
              }
            />
            <Dropdown
              label="District"
              options={districts}
              value={formData.district}
              onChange={(val) =>
                setFormData({ ...formData, district: val, city: "" })
              }
            />
            <Dropdown
              label="City"
              options={cities}
              value={formData.city}
              onChange={(val) => setFormData({ ...formData, city: val })}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100 active:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
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
