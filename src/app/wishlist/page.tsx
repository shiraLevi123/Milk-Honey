"use client"; 
import { useCartStore } from "../store/cartStore";
import ProductCard from "../components/ProductCard/ProductCard"; // ודאי שהנתיב נכון
import { Product } from "../types/Product";

export default function WishlistPage() {
  const wishlist = useCartStore((state) => state.wishlist);
  const removeFromWishlist = useCartStore((state) => state.removeFromWishlist);

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Wishlist ❤️</h1>
      {wishlist.length === 0 ? (
        <p>No products saved yet.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
          {wishlist.map((p: Product) => (
         <ProductCard key={p.id} product={p} showButtons={false} />
          ))}
        </div>
      )}
    </div>
  );
}
