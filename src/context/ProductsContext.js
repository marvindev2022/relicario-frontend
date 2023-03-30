import { createContext } from "react";
import useProductsListProvider from "../hooks/useProvider";

export const ProductsContext = createContext({});

export function ProductsListProvider({children}) {
  const valuesProvider = useProductsListProvider();
  return (
    <ProductsContext.Provider value={valuesProvider}>
      {children}
    </ProductsContext.Provider>
  );
}
