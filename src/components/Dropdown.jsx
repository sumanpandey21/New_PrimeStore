"use client"
import React, { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"

const Dropdown = ({ label, options, value, onChange, disabled }) => {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)
  const [highlightIndex, setHighlightIndex] = useState(-1)

  // 🔹 Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen(!open)}
        className={`w-full flex items-center justify-between px-4 py-3 border rounded-lg 
          bg-gray-50 text-left focus:outline-none transition
          ${disabled ? "cursor-not-allowed opacity-60" : "focus:border-red-500"}
        `}
      >
        <span>{value || `Select ${label}`}</span>
        <ChevronDown
          size={18}
          className={`cursor-pointer transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          className="absolute left-0 top-full mt-1 w-full max-h-52 overflow-y-auto
                     bg-white border border-gray-200 rounded-lg shadow-lg z-10
                     transition-all duration-200 transform origin-top
                     animate-scale-fade"
          role="listbox"
        >
          {options.length > 0 ? (
            options.map((opt, index) => {
              const key =
                typeof opt === "object"
                  ? opt.id || `${opt.name}-${index}`
                  : `${opt}-${index}`
              const label = typeof opt === "object" ? opt.name : opt

              return (
                <div
                  key={key}
                  role="option"
                  aria-selected={value === label}
                  onClick={() => {
                    onChange(label)
                    setOpen(false)
                  }}
                  className={`px-4 py-2 cursor-pointer transition 
                    ${highlightIndex === index ? "bg-red-100" : ""}
                    hover:bg-red-50 hover:text-red-600`}
                >
                  {label}
                </div>
              )
            })
          ) : (
            <div className="px-4 py-2 text-gray-400">No options</div>
          )}
        </div>
      )}
    </div>
  )
}

export default Dropdown
