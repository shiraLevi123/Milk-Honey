"use client";
import { useCartStore } from "../store/cartStore";
import ProductCard from "../components/ProductCard/ProductCard";
import { Product } from "../types/Product";
import styles from "./CheckoutPage.module.css";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import Image from "next/image";
export default function CheckoutPage() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const setCart = useCartStore((state) => state);

  const [orderComplete, setOrderComplete] = useState(false);

  const handleIncrement = (id: number) => {
    const item = cart.find((p) => p.id === id);
    if (item) updateQuantity(id, (item.quantity || 1) + 1);
  };

  const handleDecrement = (id: number) => {
    const item = cart.find((p) => p.id === id);
    if (!item) return;
    if ((item.quantity || 1) > 1) {
      updateQuantity(id, (item.quantity || 1) - 1);
    } else {
      removeFromCart(id);
    }
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.price * (item.quantity || 1)),
    0
  ).toFixed(2);

  const handleCompleteOrder = () => {
    // רוקן את הסל
    useCartStore.setState({ cart: [] });
    // הצג הודעה
    setOrderComplete(true);
    // הסתר את ההודעה אחרי 3 שניות
    setTimeout(() => setOrderComplete(false), 3000);
  };
  return (
    <div className={styles.container}>

      <h2>Order <span style={{ color: '#ffa500' }}>Summary</span></h2>

      {orderComplete && (
        <p className={styles.successMessage}>✅ Order completed successfully!</p>
      )}

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className={styles.cartGrid}>
            {cart.map((item: Product) => (
              <div key={item.id} className={styles.cartItem}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.image}
                />
                <div className={styles.details}>
                  <h3>{item.title}</h3>
                  <p>Price: ${item.price}</p>
                  <div className={styles.quantityControls}>
                    <button onClick={() => handleDecrement(item.id)}>-</button>
                    <span>{item.quantity || 1}</span>
                    <button onClick={() => handleIncrement(item.id)}>+</button>
                  </div>
                  <p>Total: ${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                  <button
                    className={styles.removeButton}
                    onClick={() => removeFromCart(item.id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <h2>
              Total: <span style={{ color: '#ffa500' }}> ${totalPrice}</span>
            </h2>

            <button
              className={styles.completeButton}
              onClick={handleCompleteOrder}
            >
              Complete Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}