"use client";
import Link from "next/link";
import Image from "next/image"; 
import styles from "./Header.module.css";
import { useCartStore } from "../../store/cartStore";

export default function Header() {
  const cart = useCartStore((state) => state.cart);
  const wishlist = useCartStore((state) => state.wishlist);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image 
          src="/LOGO.png" 
          alt="Milk & Honey Store Logo" 
          width={60}  
          height={60} 
          className={styles.logoImage}
        />
      </div>

      <nav className={styles.nav}>
        <div className={styles.centerLinks}>
          <Link href="/">Home</Link>
          <Link href="/category/electronics">Electronics</Link>
          <Link href="/category/jewelery">Jewelery</Link>
          <Link href="/category/men's clothing">Men's clothing</Link>
        </div>

        <div className={styles.rightLinks}>
          <Link href="/wishlist">Wishlist ({wishlist.length})</Link>
          <Link href="/checkout">Cart ({cart.length})</Link>
        </div>
      </nav>
    </header>
  );
}
