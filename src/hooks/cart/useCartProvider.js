import { useEffect, useState, useCallback } from "react";
import { loadCart } from "../../utils/requisitions";
import { getItem } from "../../utils/storage";
import api from "../../services/api";

export default function useCartProvider() {
  const [cartItems, setCartItems] = useState([]);
  const [render, setRender] = useState(false);

  const fetchProducts = useCallback(async () => {
    const allProducts = await loadCart();
    setCartItems(allProducts)
  }, []);

  useEffect(() => {
    fetchProducts();
    setRender(false);
  }, [render, fetchProducts]);

  const addItemToCart = async (item, state) => {
    const token = getItem("token");
    const newProduct = {
      nome: item.nome,
      imagem: item.imagem,
      produtoId: item.produto_id ?? item.id,
      quantidade: state ?? 1,
      valorTotal: item.preco ?? item.valor_total,
      tipoEnvio: "correios",
      custoEnvio: 1
    };
    await api.post("/carrinho", newProduct, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    fetchProducts();
    setRender(true);
  };

  const removeItemFromCart = async item => {
    const token = getItem("token");
    if (item.quantidade <= 1) {
      await api.delete("/carrinho", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    if (item.quantidade === 0) return;
    const newProduct = {
      nome: item.nome,
      imagem: item.imagem,
      produtoId: item.produto_id ?? item.id,
      quantidade: -1,
      valorTotal: item.preco ?? item.valor_total,
      tipoEnvio: "correios",
      custoEnvio: 1
    };
    await api.post("/carrinho", newProduct, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    fetchProducts();
    setRender(true);
  };

  const clearCart = async (item, state) => {};

  return {
    cartItems,
    setCartItems,
    addItemToCart,
    removeItemFromCart,
    clearCart
  };
}
