import { useEffect, useState } from "react";
import { loadProducts } from "../utils/requisitions";
import { getItem } from "../utils/storage";

export default function useProductsListProvider() {
  const [products, setProducts] = useState([]);
  const [openModalProfile, setOpenModalProfile] = useState(false);
  const [stateItems, setStateItems] = useState(
    JSON.parse(getItem("products")) || []
  );

  useEffect(() => {
    async function fetchProducts() {
      const allProducts = await loadProducts();
      setProducts(allProducts);
    }
    fetchProducts();
  }, []);

  return {
    stateItems,
    setStateItems,
    openModalProfile,
    setOpenModalProfile,
    products,
    setProducts,
  };
}
