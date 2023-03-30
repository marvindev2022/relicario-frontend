import { useState } from "react";

export default function useCartProvider() {
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeItemFromCart = (item) => {
    const newCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(newCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return {
    addItemToCart,
    removeItemFromCart,
    clearCart,
  };
}
