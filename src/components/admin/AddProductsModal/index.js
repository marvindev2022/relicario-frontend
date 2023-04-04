import {
  useEffect,
  useState,
} from "react";
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
  category: {
    id: "",
    name: "",
  },
  subcategory: {
    id: "",
    name: "",
  },
  quantity: "",
  image: "",
};

function AddProductsModal({ open, handleClose, setProducts }) {
  const token = getItem("token") ? getItem("token") : getItem("tokenADM");

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [form, setForm] = useState({ ...defaultForm });

  function handleChangeForm({ target }) {
    setForm({ ...form, [target.name]: target.value });
  }

  function handleChangeSelect({ target }) {
    const currentyCategory = categories.find(
      (categorie) => categorie.descricao === target.value
    );

    if (currentyCategory) {
      setForm({
        ...form,
        category: { id: currentyCategory.id, name: currentyCategory.descricao },
      });
    }
    const currentySubcategory = subcategories.find(
      (subcategorie) => subcategorie.descricao === target.value
    );

    if (currentySubcategory) {
      setForm({
        ...form,
        subcategory: {
          id: currentySubcategory.id,
          name: currentySubcategory.descricao,
        },
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post(
        "/produtos",
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

      notifySucess("Transação adicionada.");

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

      const allSubcategories = await loadSubcategories();

      setSubcategories([...allSubcategories]);
    }

    getCategories();
  }, []);

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
            <h2>Adicionar Produto</h2>

            <form onSubmit={handleSubmit}>
              <div className="container-inputs">
                <label>Nome</label>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChangeForm}
                  required
                />
              </div>
              <div className="container-inputs">
                <label>Valor</label>
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
                  <option value="">Selecione</option>
                  {categories.map((categorie) => (
                    <option key={categorie.id} value={categorie.descricao}>
                      {categorie.descricao}
                    </option>
                  ))}
                </select>
              </div>
              <div className="container-inputs">
                <label>Subcategoria</label>
                <select
                  name="subcategory"
                  value={form.subcategory.name}
                  onChange={handleChangeSelect}
                  required
                >
                  <option value="">Selecione</option>
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
                <label>Descrição</label>
                <input
                  name="description"
                  type="text"
                  value={form.description}
                  onChange={handleChangeForm}
                />
              </div>
              <div className="container-inputs">
                <label>Quantidade</label>
                <input
                  name="quantity"
                  type="number"
                  value={form.quantity}
                  onChange={handleChangeForm}
                />
              </div>
              <div className="container-inputs">
                <label>Imagem</label>
                <input
                  name="image"
                  type="text"
                  value={form.image}
                  onChange={handleChangeForm}
                />
              </div>

              <button type="submit" className="btn-purple btn-small">
                Confirmar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddProductsModal;
