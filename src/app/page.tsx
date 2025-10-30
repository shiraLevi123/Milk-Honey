"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import ProductCard from "../app/components/ProductCard/ProductCard";
import { Product } from "../app/types/Product";
import { useCartStore } from "../app/store/cartStore";
import styles from "./page.module.css";
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
      <Image
        src="/LOGO2.png"
        alt="Milk & Honey Store Logo"
        width={1920}
        height={600}
        className={styles.heroImage}
        priority
      />

      <h1 className={styles.title}>Latest Products</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
          justifyContent: "center",
          paddingLeft: "150px",
          paddingRight: "150px",
        }}
        >
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>

  );
}