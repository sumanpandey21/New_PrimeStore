"use client"
import React from "react";
import { useWishlist } from "@/store/wishlistStore";
import { useCart } from "@/store/cartStore";
import { toast } from "react-toastify";
import EmptyCart from "@/components/EmptyCart";
import ProductCard from "@/components/ProductCard";
import { Trash2, ShoppingCart } from "lucide-react";

function WishlistPage() {
  const { wishlistItems, removeWishlistItem } = useWishlist();
  const { cartItems, addCartItem } = useCart();

  const handleAddToCart = (item) => {
    const isInCart = cartItems.some((cartItem) => cartItem.id === item.id);
    if (!isInCart) {
      addCartItem({
        id: item.id,
        name: item.name,
        price: item.discountedPrice ? item.discountedPrice : item.price,
        quantity: 1,
        image: item.image,
        item_left: item.item_left,
      });
      toast.success("Product added to cart successfully!");
    } else {
      toast.info("Already in cart");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {wishlistItems.length !== 0 && (<h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
          Wishlist ({wishlistItems.length})
        </h1>)}

        {wishlistItems.length === 0 && (
          <EmptyCart
            title={"You doesn't have wishlist yet"}
            message={"Add some items for add to cart"}
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
              <div className="relative">
                <button
                  onClick={() => removeWishlistItem(item.id)}
                  className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>

                <ProductCard
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  title={item.name}
                  price={item.price}
                  rating={item.rating}
                  ratingCount={item.totalRatings}
                  discount={item.discount}
                  className={'hover:cursor-default'}
                  clickable = {false}
                />
              </div>

              <div className="p-4 pt-2">
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={!item.in_stock}
                  className={`w-full py-3 px-4 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${item.in_stock
                    ? "bg-red-500 hover:bg-red-600 text-white cursor-pointer active:bg-red-700"
                    : "bg-gray-300 cursor-not-allowed text-gray-500"
                    }`}
                >
                  <ShoppingCart size={18} />
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WishlistPage;