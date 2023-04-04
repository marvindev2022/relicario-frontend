import { useContext } from "../../build/node_modules/@types/react";
import { CartContext } from "../context/CartContext";

export function useCartList() {
  return useContext(CartContext);
}
