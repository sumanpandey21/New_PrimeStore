import React, { useState } from "react"
import dynamic from "next/dynamic"
import { Upload, X, User, Calendar, CheckCircle, Star } from "lucide-react"
import { toast } from "react-toastify"

// Import ReactStars dynamically
const ReactStars = dynamic(() => import("react-stars"), { ssr: false })

// Mock user data
const mockUser = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  isLoggedIn: true,
  purchasedProducts: [1, 2, 3, 104],
}

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    productId: 1,
    userId: 2,
    userName: "Alice Smith",
    rating: 5,
    comment:
      "Amazing gamepad! The build quality is excellent and it works perfectly with my gaming setup. Highly recommended!",
    images: [],
    createdAt: "2024-09-15T10:30:00Z",
    verified: true,
  },
  {
    id: 2,
    productId: 1,
    userId: 3,
    userName: "Mike Johnson",
    rating: 3.5,
    comment:
      "Good controller, responsive buttons and comfortable grip. The only minor issue is the d-pad could be a bit better.",
    images: ["/review-img-1.jpg"],
    createdAt: "2024-09-10T14:20:00Z",
    verified: true,
  },
]

const ProductReviewComponent = ({ productId = 1 }) => {
  const [reviews, setReviews] = useState(mockReviews) 
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
    images: [],
  })

  const productReviews = reviews.filter(
    (review) => review.productId === productId
  )

  const canReview =
    mockUser.isLoggedIn &&
    mockUser.purchasedProducts.includes(productId) &&
    !productReviews.some((review) => review.userId === mockUser.id)

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const imageUrls = files.map((file) => URL.createObjectURL(file))
    setNewReview((prev) => ({
      ...prev,
      images: [...prev.images, ...imageUrls].slice(0, 5),
    }))
  }

  const removeImage = (indexToRemove) => {
    setNewReview((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }))
  }

  const handleSubmitReview = () => {
    if (newReview.rating === 0 || !newReview.comment.trim()) {
      toast.info("Please provide a rating and comment")
      return
    }

    const review = {
      id: reviews.length + 1,
      productId,
      userId: mockUser.id,
      userName: mockUser.name,
      rating: newReview.rating,
      comment: newReview.comment,
      images: newReview.images,
      createdAt: new Date().toISOString(),
      verified: true,
    }

    setReviews((prev) => [review, ...prev])
    setNewReview({ rating: 0, comment: "", images: [] })
    setShowReviewForm(false)
    toast.success("Review submitted successfully!")
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const calculateAverageRating = () => {
    if (productReviews.length === 0) return 0
    const sum = productReviews.reduce((acc, review) => acc + review.rating, 0)
    return (sum / productReviews.length).toFixed(1)
  }

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    productReviews.forEach((review) => {
      const rounded = Math.round(review.rating) 
      distribution[rounded]++
    })
    return distribution
  }

  const ratingDistribution = getRatingDistribution()

  return (
    <div className="max-w-3xl space-y-6 mt-20">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Customer Reviews
        </h2>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center gap-8 mb-6">
            {/* Average Rating */}
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">
                {calculateAverageRating()}
              </div>
              <ReactStars
                count={5}
                size={20}
                value={parseFloat(calculateAverageRating())}
                edit={false}
                isHalf={true}
                activeColor="#facc15"
                
              />
              <div className="text-sm text-gray-500 mt-1">
                {productReviews.length} reviews
              </div>
            </div>

            <div className="flex-1">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-3 mb-2">
                  <span className="text-sm w-3">{rating}</span>
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          productReviews.length > 0
                            ? (ratingDistribution[rating] /
                                productReviews.length) *
                              100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500 w-8 text-right">
                    {ratingDistribution[rating]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Write Review Button */}
      {canReview && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium cursor-pointer active:bg-blue-800"
          >
            <Star size={20} />
            Write a Review
          </button>
        </div>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Write Your Review
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Rating*
              </label>
              <ReactStars
                count={5}
                size={32}
                value={newReview.rating}
                onChange={(rating) =>
                  setNewReview((prev) => ({ ...prev, rating }))
                }
                isHalf={true}
                activeColor="#facc15"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Review*
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview((prev) => ({ ...prev, comment: e.target.value }))
                }
                placeholder="Share your experience..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2resize-none"
                rows="4"
              />
            </div>

            {/* Image upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Upload Images (Optional)
              </label>
              <div className="flex items-center gap-4 mb-3">
                <label className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg cursor-pointer">
                  <Upload size={20} />
                  Choose Images
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <span className="text-sm text-gray-500">
                  Max 5 images, up to 5MB each
                </span>
              </div>
              {newReview.images.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {newReview.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Review ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-400 hover:bg-red-600 text-white rounded-full p-1"
                      >
                        <X size={12} className="cursor-pointer" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSubmitReview}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer active:bg-blue-800"
              >
                Submit Review
              </button>
              <button
                onClick={() => {
                  setShowReviewForm(false)
                  setNewReview({ rating: 0, comment: "", images: [] })
                }}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 cursor-pointer active:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          All Reviews ({productReviews.length})
        </h3>
        {productReviews.length === 0 ? (
          <div className="text-center py-12">
            <Star size={48} className="mx-auto text-gray-300 mb-4" />
            <h4 className="text-lg font-medium text-gray-500">
              No Reviews Yet
            </h4>
          </div>
        ) : (
          <div className="space-y-6">
            {productReviews.map((review) => (
              <div key={review.id} className="border-b pb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    <User size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-gray-900">
                        {review.userName}
                      </h4>
                      {review.verified && (
                        <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                          <CheckCircle size={12} />
                          Verified Purchase
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mb-3">
                      <ReactStars
                        count={5}
                        size={18}
                        value={review.rating}
                        edit={false}
                        isHalf={true}
                        activeColor="#facc15"
                      />
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar size={12} />
                        {formatDate(review.createdAt)}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{review.comment}</p>
                    {review.images.length > 0 && (
                      <div className="flex flex-wrap gap-3">
                        {review.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt="review-img"
                            className="w-24 h-24 object-cover rounded-lg border"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductReviewComponent
