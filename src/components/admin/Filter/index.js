import { useEffect, useState } from "react";
import FilterIcon from "../../../assets/filter-icon.svg";
import Chip from "../Chip";
import "./styles.css";
import {
  loadCategories,
  loadSubcategories,
  loadProducts,
} from "../../../utils/requisitions";

function Filter({ _, setProducts }) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  async function handleClearFilters() {
    let localCategories = [...categories];
    localCategories.forEach((category) => (category.checked = false));
    let localSubcategories = [...subcategories];
    localSubcategories.forEach((category) => (category.checked = false));
    setCategories([...localCategories]);

    let allTransactions = await loadProducts();
    setProducts([...allTransactions]);
  }

  async function handleApplyFilters() {
    let localTransactions = await loadProducts();
    let categoriesCheckedId = categories
      .filter((category) => category.checked)
      .map((category) => category.id);
    if (categoriesCheckedId.length) {
      localTransactions = localTransactions.filter((transaction) =>
        categoriesCheckedId.includes(transaction.categoria_id)
      );
      setProducts([...localTransactions]);
    }

    let subcategoriesCheckedId = subcategories
      .filter((subcategory) => subcategory.checked)
      .map((subcategory) => subcategory.id);
    if (subcategoriesCheckedId.length) {
      localTransactions = localTransactions.filter((transaction) => {
        console.log(transaction);
        return subcategoriesCheckedId.includes(transaction.subcategoria_id);
      });
      setProducts([...localTransactions]);
    }
  }

  useEffect(() => {
    async function loadAllCategories() {
      const allCategories = await loadCategories();
      allCategories.forEach((category) => {
        category.checked = false;
      });
      setCategories([...allCategories]);
    }
    async function loadAllSubcategories() {
      const allSubcategories = await loadSubcategories();
      allSubcategories.forEach((subcategory) => {
        subcategory.checked = false;
      });
      setSubcategories([...allSubcategories]);
    }
    if (open) {
      loadAllCategories();
      loadAllSubcategories();
    }
  }, [open]);

  return (
    <div className="container-filter">
      <button className="btn-white btn-filter" onClick={() => setOpen(!open)}>
        <img src={FilterIcon} alt="filter" />
        Filtrar
      </button>
      {open && (
        <div className="filter-body">
          <div className="container-categories-subcategories">
            <strong>Categoria</strong>
            <div className="container-categories">
              {categories.map((category) => (
                <Chip
                  key={category.id}
                  checked={category.checked}
                  title={category.descricao}
                  id={category.id}
                  categories={categories}
                  setCategories={setCategories}
                />
              ))}
            </div>

            <strong >Sub Categoria</strong>
            <div className="container-subcategories">
              {subcategories.map((subcategory) => (
                <Chip
                  key={subcategory.id}
                  checked={subcategory.checked}
                  title={subcategory.descricao}
                  id={subcategory.id}
                  categories={subcategories}
                  setCategories={setSubcategories}
                />
              ))}
            </div>
          </div>

          <div className="container-btns-filter">
            <button
              className="btn-white btn-extra-small"
              onClick={handleClearFilters}
            >
              Limpar Filtros
            </button>
            <button
              className="btn-purple btn-extra-small"
              onClick={handleApplyFilters}
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Filter;
