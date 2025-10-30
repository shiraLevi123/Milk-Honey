"use client";
import styles from "./ProductCard.module.css";
import { Product } from "../../types/Product";
import { useCartStore } from "../../store/cartStore";
import { MdOutlineShoppingCart } from "react-icons/md";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  showButtons?: boolean;
}

export default function ProductCard({ product, showButtons = true }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const wishlist = useCartStore((state) => state.wishlist);
  const addToWishlist = useCartStore((state) => state.addToWishlist);
  const removeFromWishlist = useCartStore((state) => state.removeFromWishlist);

  const isInWishlist = wishlist.some((p) => p.id === product.id);

  const toggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.title} className={styles.image} />
      <h2>{product.title}</h2>
      <p className={styles.price}>${product.price}</p>
      <p className={styles.category}>{product.category}</p>

      {showButtons && (
        <div className={styles.buttons}>
          <button className={styles.addToCartButton} onClick={() => addToCart(product)}>
            <MdOutlineShoppingCart size={20} />
            Add to Cart
          </button>
          <button onClick={toggleWishlist} className={isInWishlist ? styles.activeWishlist : ""}>
            ❤️
          </button>
        </div>
      )}
    </div>
  );
}
