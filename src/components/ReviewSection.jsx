import React, { useState, useEffect } from "react"
import { Star, Upload, X, User, Calendar, CheckCircle } from "lucide-react"
import { toast } from "react-toastify"

// Mock user data
const mockUser = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  isLoggedIn: true,
  purchasedProducts: [1, 2, 3 ,104],
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
    rating: 4,
    comment:
      "Good controller, responsive buttons and comfortable grip. The only minor issue is the d-pad could be a bit better.",
    images: ["/review-img-1.jpg"],
    createdAt: "2024-09-10T14:20:00Z",
    verified: true,
  },
  {
    id: 3,
    productId: 2,
    userId: 4,
    userName: "Sarah Wilson",
    rating: 5,
    comment:
      "Best keyboard I've ever used! The mechanical switches feel amazing and the RGB lighting is gorgeous.",
    images: ["/review-img-2.jpg", "/review-img-3.jpg"],
    createdAt: "2024-09-12T16:45:00Z",
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
  const [hoverRating, setHoverRating] = useState(0)

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
      images: [...prev.images, ...imageUrls].slice(0, 5), // Limit to 5 images
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
      productId: productId,
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

  const StarRating = ({ rating, onRate, size = 15, readonly = false }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={`cursor-${readonly ? "default" : "pointer"} ${
              star <= (hoverRating || rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
            onClick={() => !readonly && onRate && onRate(star)}
            onMouseEnter={() => !readonly && setHoverRating(star)}
            onMouseLeave={() => !readonly && setHoverRating(0)}
          />
        ))}
      </div>
    )
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
      distribution[review.rating]++
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
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">
                {calculateAverageRating()}
              </div>
              <StarRating
                rating={Math.round(calculateAverageRating())}
                readonly
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
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
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
                Rating *
              </label>
              <StarRating
                rating={newReview.rating}
                onRate={(rating) =>
                  setNewReview((prev) => ({ ...prev, rating }))
                }
                size={32}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Review *
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview((prev) => ({ ...prev, comment: e.target.value }))
                }
                placeholder="Share your experience with this product..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows="4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Upload Images (Optional)
              </label>
              <div className="flex items-center gap-4 mb-3">
                <label className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg cursor-pointer transition-colors">
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
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSubmitReview}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Submit Review
              </button>
              <button
                onClick={() => {
                  setShowReviewForm(false)
                  setNewReview({ rating: 0, comment: "", images: [] })
                  setHoverRating(0)
                }}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {mockUser.isLoggedIn &&
        mockUser.purchasedProducts.includes(productId) &&
        productReviews.some((review) => review.userId === mockUser.id) && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-medium">
              You have already reviewed this product. Thank you for your
              feedback!
            </p>
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
            <h4 className="text-lg font-medium text-gray-500 mb-2">
              No Reviews Yet
            </h4>
            <p className="text-gray-400">
              Be the first to review this product!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {productReviews.map((review) => (
              <div
                key={review.id}
                className="border-b border-gray-200 pb-6 last:border-b-0"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <User size={24} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h4 className="font-medium text-gray-900">
                        {review.userName}
                      </h4>
                      {review.verified && (
                        <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                          <CheckCircle size={12} />
                          Verified Purchase
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4 mb-3">
                      <StarRating rating={review.rating} readonly />
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar size={12} />
                        {formatDate(review.createdAt)}
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {review.comment}
                    </p>

                    {review.images.length > 0 && (
                      <div className="flex flex-wrap gap-3">
                        {review.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt="reviewimage"
                            className="w-24 h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity border"
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
