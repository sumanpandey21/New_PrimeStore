"use client";
import { create } from "zustand";

export const useCart = create((set) => ({
  cartItems: [],
  setCartItems: (items) => set({ cartItems: items }),

  addCartItem: (item) =>
    set((state) => {
      const existing = state.cartItems.find((i) => i.id === item.id);
      if (existing) {
        return {
          cartItems: state.cartItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { cartItems: [...state.cartItems, item] };
    }),

  updateQuantity: (id, newQuantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ),
    })),

  removeCartItem: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

  clearCart: () => set({ cartItems: [] }),
}));
