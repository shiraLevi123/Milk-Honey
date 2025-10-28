"use client";
import { useEffect, useState } from "react";
import Header from "../app/components/Header/Header";
import ProductCard from "../app/components/ProductCard/ProductCard";
import { Product } from "../app/types/Product";
import { useCartStore } from "../app/store/cartStore";
export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const addToCart = useCartStore((state) => state.addToCart);
  const addToWishlist = useCartStore((state) => state.addToWishlist);
  const cart = useCartStore((state) => state.cart);
  const wishlist = useCartStore((state) => state.wishlist);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=10")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
       <h1>Latest Products</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 20,
        }}
      >
        {products.map((p) => (
         <ProductCard
         key={p.id}
         product={p}
         onAddToCart={() => addToCart(p)}
         onAddToWishlist={() => addToWishlist(p)}
       />
       
        ))}
      </div>
    </div>
  );
}