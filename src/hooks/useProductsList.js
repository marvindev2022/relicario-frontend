import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

export default function useProductsList() {
  return useContext(ProductsContext);
}
