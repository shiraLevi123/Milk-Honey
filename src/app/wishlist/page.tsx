"use client"; 
import { useCartStore } from "../store/cartStore";
import { Product } from "../types/Product";
import styles from "./WishlistPage.module.css";
import { MdDelete } from "react-icons/md";

export default function WishlistPage() {
  const wishlist = useCartStore((state) => state.wishlist);
  const removeFromWishlist = useCartStore((state) => state.removeFromWishlist);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Wishlist ❤️</h1>
      {wishlist.length === 0 ? (
        <p>No products saved yet.</p>
      ) : (
        <div className={styles.grid}>
          {wishlist.map((p) => (
            <div key={p.id} className={styles.card}>
              <img src={p.image} alt={p.title} className={styles.image}/>
              <h2>{p.title}</h2>
              <p>${p.price}</p>
              <button
                className={styles.removeButton}
                onClick={() => removeFromWishlist(p.id)}
              >
                <MdDelete size={24} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
