import { useEffect, useState } from "react";
import ArrowDown from "../../../assets/arrow-down.svg";
import ArrowUp from "../../../assets/arrow-up.svg";
import DeleteIcon from "../../../assets/delete-icon.svg";
import EditIcon from "../../../assets/edit-icon.svg";
import api from "../../../services/api";
import { formatToMoney } from "../../../functions/formatters";
import { notifyError, notifySucess } from "../../../utils/notifications";
import { loadProducts } from "../../../utils/requisitions";
import { getItem } from "../../../utils/storage";
import Confirm from "../Confirm";
import "./styles.css";

function Table({
  products,
  setProducts,
  setOpenModalEdit,
  setCurrentItemToEdit
}) {
  const token = getItem("token") ? getItem("token") : getItem("tokenADM");

  const [asc, setAsc] = useState(true);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [orderedProducts, setOrderedProducts] = useState([]);

  function handleOpenConfirm(transact) {
    setCurrentItem(transact);
    setOpenConfirm(!openConfirm);
  }

  async function handleDeleteItem() {
    try {
      const response = await api.delete(`/produtos/${currentItem.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status > 204) {
        return notifyError(response.data);
      }

      notifySucess("Transação excluída.");

      const allProducts = await loadProducts();

      setProducts([...allProducts]);
    } catch (error) {
      notifyError(error.response.data);
    } finally {
      setOpenConfirm(false);
    }
  }

  function handelOpenEdit(transact) {
    setOpenModalEdit(true);
    setCurrentItemToEdit(transact);
  }

  useEffect(() => {
    const localProducts = [...products];
    if (asc) {
      localProducts.sort((a, b) => a.id - b.id);
      setOrderedProducts([...localProducts]);
      return;
    }
    localProducts.sort((a, b) => b.id - a.id);
    setOrderedProducts([...localProducts]);
  }, [asc, products]);

  return (
    <div className="container-table">
      <div className="table-head">
        <div
          className="table-column-small content-date"
          onClick={() => setAsc(!asc)}
        >
          <strong>ID</strong>
          <img src={asc ? ArrowUp : ArrowDown} alt="order" />
        </div>
        <strong className="table-column-middle">Nome</strong>
        <strong className="table-column-big">Descrição</strong>
        <strong className="table-column-small">Categoria</strong>
        <strong className="table-column-small">Sub-categoria</strong>
        <strong className="table-column-small">Preço</strong>
        <strong className="table-column-small">quantidade</strong>
        <strong className="table-column-small">Imagem</strong>
        <div className="table-column-small"></div>
      </div>

      <div className="table-body">
        {orderedProducts.map(transact => {
          return (
            <div className="table-row" key={transact.id}>
              <strong className="table-column-small content-date">
                {transact.id}
              </strong>
              <span className="table-column-middle">{transact.nome}</span>
              <span className="table-column-big">
                {transact.descricao === "" ? "-" : transact.descricao}
              </span>
              <span className="table-column-small">
                {transact.categoria_nome}
              </span>
              <span className="table-column-small">
                {transact.subcategoria_nome}
              </span>
              <strong
                className={`table-column-small values ${
                  transact.quantidade === "entrada"
                    ? "positive-value"
                    : "negative-value"
                }`}
              >
                {parseFloat(Number(formatToMoney(transact.preco)))
                  .toFixed(2)
                  .replace(".", ",")}
              </strong>
              <span className="table-column-small">
                {transact.quantidade + " uni"}
              </span>
              <span style={{ overflow: "auto" }} className="table-column-small">
                {transact.imagem}
              </span>

              <div className="table-column-small action-buttons">
                <img
                  src={EditIcon}
                  alt="edit"
                  onClick={() => handelOpenEdit(transact)}
                />
                <img
                  src={DeleteIcon}
                  alt="delete"
                  onClick={() => handleOpenConfirm(transact)}
                />
              </div>
              <Confirm
                open={openConfirm && transact.id === currentItem.id}
                handleClose={() => setOpenConfirm(false)}
                handleConfirm={handleDeleteItem}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Table;
