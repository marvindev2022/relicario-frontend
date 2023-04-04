import { formatToMoney } from "./../../utils/formatters";
import { useCartList } from "./../../hooks/useCartList";
import closeIcon from "./../../assets/close-icon.svg";
import "./dialog.css";
import { useState } from "react";

export default function ProductDialog({ product, onClose }) {
  const originalPrice = Number(product.preco);
  const discountPrice = originalPrice * 0.85;
  const { addItemToCart } = useCartList();
  const [inputState, setInputState] = useState(1);

  const handleInputChange = (event) => {
    setInputState(Number(event.target.value));
  };

  const increment = () => {
    setInputState(inputState + 1);
  };

  const decrement = () => {
    if (inputState > 1) setInputState(inputState - 1);
  };

  return (
    <dialog
      style={{
        position: "fixed",
        top: 0,
        zIndex: 9,
      }}
      open={true}
      onClose={onClose}
    >
      <div className="container-dialog-card">
        <img
          className="close-icon"
          onClick={() => {
            onClose();
          }}
          src={closeIcon}
          alt="Fechar"
        />
        <img
          className="imagem-dialog-card"
          src={product.imagem}
          alt={`Imagem ${product.nome}`}
        />
        <div className="container-descriptions">
          <span className="free"> {formatToMoney(discountPrice)}</span>
          <h1>{product.nome}</h1>
          <span>{product.descricao}</span>
        </div>
        <section className="container-informs">
          <label>Quantidade</label>
          <span
            style={{
              display: "flex",
              gap: 0,
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            {" "}
            <input
              style={{ width: "80px", height: "50px" }}
              value={inputState}
              type="number"
              onChange={handleInputChange}
            />
            <button
              style={{ width: "50px", height: "50px" }}
              onClick={decrement}
            >
              -
            </button>
            <button
              style={{ width: "50px", height: "50px" }}
              onClick={increment}
            >
              +
            </button>
          </span>

          <button
            className="btn-confirm"
            onClick={() => {
              addItemToCart(product, inputState);
              onClose();
            }}
          >
            Comprar
          </button>
        </section>
      </div>
    </dialog>
  );
}
