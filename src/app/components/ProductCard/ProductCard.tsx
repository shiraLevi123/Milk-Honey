"use client";
import styles from "./ProductCard.module.css";
import { Product } from "../../types/Product";
import { useCartStore } from "../../store/cartStore";

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
  onAddToWishlist?: () => void;
  showButtons?: boolean;
}
export default function ProductCard({ product, onAddToCart, onAddToWishlist, showButtons = true }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const addToWishlist = useCartStore((state) => state.addToWishlist);

  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.title} className={styles.image} />
      <h2>{product.title}</h2>
      <p className={styles.price}>${product.price}</p>
      <p>{product.description}</p>
      <p className={styles.category}>{product.category}</p>
      {showButtons && (
        <div className={styles.buttons}>
          <button onClick={onAddToCart ?? (() => addToCart(product))}>Add to Cart</button>
          <button onClick={onAddToWishlist ?? (() => addToWishlist(product))}>♥ Wishlist</button>
        </div>)}
    </div>
  );
}