import { useEffect, useState } from "react";
import { loadProducts } from "../utils/requisitions";

export default function useProductsProvider() {
  const [products, setProducts] = useState([]);
  const [openModalProfile, setOpenModalProfile] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      const allProducts = await loadProducts();
      setProducts(allProducts);
    }
    fetchProducts();
  }, []);
  return {
    openModalProfile,
    setOpenModalProfile,
    products,
    setProducts,
  };
}
