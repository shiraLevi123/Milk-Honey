"use client";
import Link from "next/link";
import Image from "next/image"; 
import styles from "./Header.module.css";
import { useCartStore } from "../../store/cartStore";
import { useState, useEffect } from "react";
import CartPopup from "../CartPopup/CartPopup";

export default function Header() {
  const cart = useCartStore((state) => state.cart);
  const wishlist = useCartStore((state) => state.wishlist);
  const [showPopup, setShowPopup] = useState(false);
  
  useEffect(() => {
    if (cart.length > 0) {
      setShowPopup(true);
      const timer = setTimeout(() => setShowPopup(false), 3000); // נסגר אחרי 3 שניות
      return () => clearTimeout(timer);
    }
  }, [cart]);
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image 
          src="/LOGO1.png" 
          alt="Milk & Honey Store Logo" 
          width={60}  
          height={60} 
          className={styles.logoImage}
        />
      </div>

      <nav className={styles.nav}>
        <div className={styles.centerLinks}>
        <Link href="/" className={styles.homeLink}>Home</Link>
          <Link href="/category/electronics">Electronics</Link>
          <Link href="/category/jewelery">Jewelery</Link>
          <Link href="/category/men's clothing">Men's clothing</Link>
          <Link href="/category/women's clothing">Women's clothing</Link>
        </div>

        <div className={styles.rightLinks}>
          <Link href="/wishlist">Wishlist ({wishlist.length})</Link>

          {/* כאן נשאיר את הקישור לעגלה */}
          <div className={styles.cartWrapper}>
            <Link href="/checkout">Cart ({cart.length})</Link>

            {/* הפופאפ עצמו */}
            {showPopup && <CartPopup onClose={() => setShowPopup(false)} />}
          </div>
        </div>
      </nav>
    </header>
  );
}