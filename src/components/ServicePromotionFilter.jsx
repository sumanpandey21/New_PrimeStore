import React, { useState } from "react"

const ServicePromotion = () => {
  const [services, setServices] = useState([
    { id: 1, name: "New", checked: false },
    { id: 2, name: "Free delivery", checked: false },
    { id: 3, name: "Discount", checked: false },
  ])

  const handleChange = (serviceId) => {
    setServices(
      services.map((service) =>
        service.id === serviceId
          ? { ...service, checked: !service.checked }
          : service
      )
    )
  }

  return (
    <div className="border-b border-gray-200 pb-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">
        Service & Promotion
      </h2>
      <div className="space-y-3">
        {services.map((service) => (
          <label
            key={service.id}
            className="flex items-center cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors duration-150"
          >
            <div className="relative">
              <input
                type="checkbox"
                checked={service.checked}
                onChange={() => handleChange(service.id)}
                className="sr-only"
              />
              <div
                className={`
                w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200
                ${
                  service.checked
                    ? "bg-blue-500 border-blue-500"
                    : "border-gray-300 group-hover:border-blue-400"
                }
              `}
              >
                {service.checked && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>
            <span
              className={`ml-3 text-sm lg:text-base transition-colors duration-150 ${
                service.checked
                  ? "text-blue-600 font-medium"
                  : "text-gray-700 group-hover:text-gray-900"
              }`}
            >
              {service.name}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default ServicePromotion
