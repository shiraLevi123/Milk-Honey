"use client";
import { useCartStore } from "../../store/cartStore";
import styles from "./CartPopup.module.css";
import { MdClose, MdDelete } from "react-icons/md";

interface CartPopupProps {
  onClose: () => void;
}

export default function CartPopup({ onClose }: CartPopupProps) {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

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

  return (
    <div className={styles.popup}>
      <button className={styles.closeButton} onClick={onClose}>
        <MdClose size={20} />
      </button>
      <ul className={styles.cartList}>
        {cart.map((item) => (
          <li key={item.id} className={styles.cartListItem}>
            <img src={item.image} alt={item.title} className={styles.image} />
            <div className={styles.itemDetails}>
              <span className={styles.itemTitle}>{item.title}</span>
              <div className={styles.controls}>
                <button onClick={() => handleDecrement(item.id)}>-</button>
                <span>{item.quantity || 1}</span>
                <button onClick={() => handleIncrement(item.id)}>+</button>
                <button
                  className={styles.deleteButton}
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "#f44336",
                    fontSize: "1.2rem",
                  }}
                >
                  <MdDelete />
                </button>
              </div>
              <span className={styles.itemTotal}>
                ${((item.quantity || 1) * item.price).toFixed(2)}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <p className={styles.total}>
        <strong>Total Price:</strong> ${totalPrice}
      </p>
    </div>
  );
}