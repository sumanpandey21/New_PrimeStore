"use client";
import { create } from "zustand";

export const useWishlist = create((set) => ({
  wishlistItems: [],

  addWishlistItem: (item) =>
    set((state) => {
      const exists = state.wishlistItems.some((i) => i.id === item.id);
      if (exists) return state;
      return { wishlistItems: [...state.wishlistItems, item] };
    }),

  removeWishlistItem: (id) =>
    set((state) => ({
      wishlistItems: state.wishlistItems.filter((item) => item.id !== id),
    })),

  clearWishlist: () => set({ wishlistItems: [] }),
}));
