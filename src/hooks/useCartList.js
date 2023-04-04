import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export function useCartList() {
  return useContext(CartContext);
}
