import { createContext } from 'react';
import useCartProvider from '../hooks/cart/useCartProvider';

export const CartContext = createContext({});

export function CartProvider({ children }) {
  const valuesProvider = useCartProvider();
  return (
    <CartContext.Provider value={valuesProvider}>
      {children}
    </CartContext.Provider>
  );
}
