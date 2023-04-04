import { createContext } from "../../build/node_modules/@types/react";
import useCartProvider from "../hooks/useCartProvider";

export const CartContext = createContext({});

export function CartProvider({ children }) {
  const valuesProvider = useCartProvider();
  return (
    <CartContext.Provider value={valuesProvider}>
      {children}
    </CartContext.Provider>
  );
}
