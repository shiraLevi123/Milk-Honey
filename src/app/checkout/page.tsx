"use client";
import { useCartStore } from "../store/cartStore";
import ProductCard from "../components/ProductCard/ProductCard";
import { Product } from "../types/Product";

export default function CheckoutPage() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const total = cart.reduce((sum, p) => sum + p.price, 0).toFixed(2);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
          {cart.map((p: Product) => (
         <ProductCard key={p.id} product={p} showButtons={false} />
          ))}
        </div>
      )}
      <h3>Total: ${total}</h3>
    </div>
  );
}