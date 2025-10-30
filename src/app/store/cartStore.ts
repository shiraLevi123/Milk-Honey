import { create } from "zustand";
import { Product } from "../types/Product";

interface CartState {
  cart: Product[];
  wishlist: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  wishlist: [],
  addToCart: (product: Product) =>
  set((state) => {
    const exists = state.cart.find((p) => p.id === product.id);
    if (exists) {
      return {
        cart: state.cart.map((p) =>
          p.id === product.id
            ? { ...p, quantity: (p.quantity || 1) + 1 }
            : p
        ),
      };
    } else {
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }
  }),

  removeFromCart: (id) =>
    set((state) => ({ cart: state.cart.filter((p) => p.id !== id) })),
  addToWishlist: (product) =>
    set((state) => ({ wishlist: [...state.wishlist, product] })),
  removeFromWishlist: (id) =>
    set((state) => ({ wishlist: state.wishlist.filter((p) => p.id !== id) })),
    updateQuantity: (id, quantity) =>
      set((state) => ({
        cart: state.cart.map((p) =>
          p.id === id ? { ...p, quantity } : p
        ),
      })),
  }));