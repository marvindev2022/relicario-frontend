import { useEffect, useState } from "react";
import CloseIcon from "../../../assets/close-icon.svg";
import api from "../../../services/api";
import { notifyError, notifySucess } from "../../../utils/notifications";
import {
  loadCategories,
  loadSubcategories,
  loadProducts,
} from "../../../utils/requisitions";
import { getItem } from "../../../utils/storage";
import "./styles.css";

const defaultForm = {
  name: "",
  description: "",
  price: "",
  quantity: "",
  image: "",
  category: {
    id: "",
    name: "",
  },
  subcategory: {
    id: "",
    name: "",
  },
  id: "",
};

function EditProductsModal({
  open,
  handleClose,
  setProducts,
  currentItemToEdit,
}) {
  const token = getItem("tokenADM");

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [form, setForm] = useState({ ...defaultForm });

  function handleChangeForm({ target }) {
    setForm({ ...form, [target.name]: target.value });
  }

  function handleChangeSelect({ target }) {
    const { name, value } = target;
    const selectedCategory = categories.find(
      (category) => category.descricao === value
    );
    const selectedSubcategory = subcategories.find(
      (subcategory) => subcategory.descricao === value
    );

    if (name === "category") {
      setForm({
        ...form,
        category: { id: selectedCategory.id, name: selectedCategory.descricao },
      });
    } else if (name === "subcategory") {
      setForm({
        ...form,
        subcategory: {
          id: selectedSubcategory.id,
          name: selectedSubcategory.descricao,
        },
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.put(
        `/produtos/${currentItemToEdit.id}`,
        {
          nome: form.name,
          descricao: form.description,
          preco: form.price,
          subcategoria_id: form.subcategory.id,
          categoria_id: form.category.id,
          quantidade: form.quantity,
          imagem: form.image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status > 204) {
        return notifyError(response.data);
      }

      notifySucess("Transação atualizada.");

      handleClose();
      setForm({ ...defaultForm });

      const allProductss = await loadProducts();

      setProducts([...allProductss]);
    } catch (error) {
      notifyError(error.response.data);
    }
  }

  useEffect(() => {
    async function getCategories() {
      const allCategories = await loadCategories();

      setCategories([...allCategories]);
      const allsubcategories = await loadSubcategories();

      setSubcategories([...allsubcategories]);
    }

    getCategories();
  }, []);

  useEffect(() => {
    if (currentItemToEdit) {
      setForm({
        id: currentItemToEdit.id,
        name: currentItemToEdit.nome,
        description: currentItemToEdit.descricao,
        price: currentItemToEdit.preco,
        subcategory_id: currentItemToEdit.subcategoria_id,
        category_id: currentItemToEdit.categoria_id,
        quantity: currentItemToEdit.quantidade,
        image: currentItemToEdit.imagem,
        category: {
          id: currentItemToEdit.categoria_id,
          name: currentItemToEdit.categoria_nome,
        },
        subcategory: {
          id: currentItemToEdit.subcategoria_id,
          name: currentItemToEdit.subcategoria_nome,
        },
      });
    }
  }, [currentItemToEdit]);

  return (
    <>
      {open && (
        <div className="backdrop">
          <div className="modal">
            <img
              className="close-button"
              src={CloseIcon}
              alt="close-button"
              onClick={handleClose}
            />
            <h2>Editar Registro</h2>
            <div className="container-options"></div>
            <form onSubmit={handleSubmit}>
              <div className="container-inputs">
                <label>Nome </label>
                <b></b>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChangeForm}
                  required
                />
              </div>
              <div className="container-inputs">
                <label>Descrição</label>
                <input
                  name="description"
                  type="text"
                  value={form.description}
                  onChange={handleChangeForm}
                  required
                />
              </div>
              <div className="container-inputs">
                <label>Valor </label>
                <b></b>
                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChangeForm}
                  required
                />
              </div>
              <div className="container-inputs">
                <label>Categoria</label>
                <select
                  name="category"
                  value={form.category.name}
                  onChange={handleChangeSelect}
                  required
                >
                  <option>Selecione</option>
                  {categories.map((categorie) => (
                    <option key={categorie.id} value={categorie.descricao}>
                      {categorie.descricao}
                    </option>
                  ))}
                </select>
                <label>Subcategoria</label>
                <select
                  name="subcategory"
                  value={form.subcategory.name}
                  onChange={handleChangeSelect}
                  required
                >
                  <option>Selecione</option>
                  {subcategories.map((subcategorie) => (
                    <option
                      key={subcategorie.id}
                      value={subcategorie.descricao}
                    >
                      {subcategorie.descricao}
                    </option>
                  ))}
                </select>
              </div>
              <div className="container-inputs">
                <label>Quantidade</label>
                <input
                  name="quantity"
                  type="text"
                  value={form.quantity}
                  onChange={handleChangeForm}
                  required
                />
              </div>
              <div className="container-inputs">
                <label>Imagem</label>
                <input
                  name="image"
                  type="text"
                  value={form.image ?? ""}
                  onChange={handleChangeForm}
                  required
                />
              </div>

              <button className="btn-purple btn-small">Confirmar</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditProductsModal;
