"use client";
import { create } from "zustand";

export const useCart = create((set) => ({
  cartItems: [
    {
      id: 1,
      name: "HAVIT HV-G92 Gamepad",
      price: 1200 - (1200 * 40) / 100, 
      quantity: 3,
      image: "/controller3.png",
      item_left: 15,  
    },
    {
      id: 2,
      name: "AK-900 Wired Keyboard",
      price: 2500 - (2500 * 35) / 100,
      quantity: 3,
      image: "/keyboard1.png",
      item_left: 10,
    },
  ],

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
