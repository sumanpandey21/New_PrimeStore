"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"

export default function AlertMessage({ message, trigger }) {

  const [visible, setVisible] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (message && trigger) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      console.log(timeoutRef)
      // Show the message
      setVisible(true)

      // Set auto-hide timeout
      timeoutRef.current = setTimeout(() => {
        setVisible(false)
      }, 4000)
    }

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [trigger]) // Only depend on trigger, not message

  const handleClose = () => {
    setVisible(false)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  if (!message || !visible) return null
  const isSuccess = message?.toLowerCase().includes("success")

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`w-full px-4 py-2 rounded-md mb-4 flex items-center justify-between gap-3 shadow-sm border 
            ${
              isSuccess
                ? "bg-green-600 border-green-700 text-white"
                : "bg-red-600 border-red-700 text-white"
            }`}
        >
          <div className="flex items-center gap-2">
            {isSuccess ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
            <span className="text-sm font-medium">{message}</span>
          </div>
          <button
            onClick={handleClose}
            className="ml-2 rounded-full p-1 hover:bg-white/20 transition"
          >
            <X className="w-4 h-4 cursor-pointer" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
