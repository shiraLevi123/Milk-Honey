import { create } from "zustand";
import { Product } from "../types/Product";

interface CartState {
  cart: Product[];
  wishlist: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  wishlist: [],
  addToCart: (product) =>
    set((state) => ({ cart: [...state.cart, product] })),
  removeFromCart: (id) =>
    set((state) => ({ cart: state.cart.filter((p) => p.id !== id) })),
  addToWishlist: (product) =>
    set((state) => ({ wishlist: [...state.wishlist, product] })),
  removeFromWishlist: (id) =>
    set((state) => ({ wishlist: state.wishlist.filter((p) => p.id !== id) })),
}));