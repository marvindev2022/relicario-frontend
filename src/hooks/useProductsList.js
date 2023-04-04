import { useContext } from "../../build/node_modules/@types/react";
import { ProductsContext } from "../context/ProductsContext";

export default function useProductsList() {
  return useContext(ProductsContext);
}
