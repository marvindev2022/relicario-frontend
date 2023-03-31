import { createContext } from "react";
import useProductsProvider from "../hooks/useProductsProvider";

export const ProductsContext = createContext({});

export function ProductsListProvider({children}) {
  const valuesProvider = useProductsProvider();
  return (
    <ProductsContext.Provider value={valuesProvider}>
      {children}
    </ProductsContext.Provider>
  );
}
