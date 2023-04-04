import {
  useEffect,
  useState,
  useCallback,
} from "react";
import api from "../services/api";
import { loadCart } from "../utils/requisitions";
import { getItem } from "../utils/storage";

export default function useCartProvider() {
  const [cartItems, setCartItems] = useState([]);
  const [render, setRender] = useState(false);
  const fetchProducts = useCallback(async () => {
    const allProducts = await loadCart();
    setCartItems(allProducts.sort((a, b) => a.id - b.id));
  }, []);

  useEffect(() => {
    fetchProducts();
    setRender(false);
  }, [render, fetchProducts]);

  const addItemToCart = async (item) => {
    const token = getItem("token");
    const newProduct = {
      nome: item.nome,
      imagem: item.imagem,
      produtoId: item.produto_id ?? item.id,
      quantidade: 1,
      valorTotal: item.preco ?? item.valor_total,
      tipoEnvio: "correios",
      custoEnvio: 1,
    };

    await api.post("/carrinho", newProduct, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchProducts();
    setRender(true);
  };

  const removeItemFromCart = (item) => {
    const newCartItems = cartItems?.filter(
      (cartItem) => cartItem.produto_id !== item.id
    );
    setCartItems(newCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return {
    cartItems,
    setCartItems,
    addItemToCart,
    removeItemFromCart,
    clearCart,
  };
}
