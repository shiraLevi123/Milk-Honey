"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Product } from "../../types/Product";

export default function CategoryPage() {
  const params = useParams();
  const categoryName = params.name;

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/category/${categoryName}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, [categoryName]);

  return (
    <div className={styles.container}>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            showButtons={true}
          />
        ))}
      </div>
    </div>
  );
}
