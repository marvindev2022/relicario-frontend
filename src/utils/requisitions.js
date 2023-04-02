import api from "../services/api";
import { getItem } from "./storage";

export async function loadCategories() {
  let token = "";

  token = getItem("tokenADM");

  try {
    const { data } = await api.get("/categorias", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const orderedCategories = data.categorias.sort((a, b) => a - b);

    return orderedCategories;
  } catch (error) {
    console.error(error);
  }
}

export async function loadSubcategories() {
  const token = getItem("tokenADM") ?? "";

  try {
    const { data } = await api.get("/categorias", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const orderedSubcategories = data.subcategorias.sort((a, b) => a - b);

    return orderedSubcategories;
  } catch (error) {
    console.error(error);
  }
}

export async function loadProducts() {
  try {
    const { data } = await api.get("/produtos");

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function loadDistacs() {
  try {
    const { data } = await api.get("/destaques");
    return data;
  } catch (error) {
    console.error(error);
  }
}
export async function loadCart() {
  try {
    const token = getItem("token");
    const { data } = await api.get("/carrinho", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}
