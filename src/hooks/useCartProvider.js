import { useState } from "react";
import { getItem, setItem } from "../utils/storage";

export default function useCartProvider() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(getItem("products")) ?? []
  );

  const addItemToCart = (item) => {
    setCartItems([...cartItems, item]);
    const arrayProducts = JSON.stringify(cartItems);
    setItem("products", arrayProducts);
  };

  const removeItemFromCart = (item) => {
    const newCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(newCartItems);
    const arrayProducts = JSON.stringify(cartItems);
    setItem("products", arrayProducts);
  };

  const clearCart = () => {
    setCartItems([]);
    const arrayProducts = JSON.stringify(cartItems);
    setItem("products", arrayProducts);
  };

  return {
    cartItems,  
    setCartItems,
    addItemToCart,
    removeItemFromCart,
    clearCart,
  };
}
