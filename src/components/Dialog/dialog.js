import { formatToMoney } from "../../utils/formatters";
import { useCartList } from "../../hooks/useCartList";
import closeIcon from "../../assets/close-icon.svg";
import "./dialog.css";

export default function ProductDialog({ product, onClose }) {
  const originalPrice = Number(product.preco);
  const discountPrice = originalPrice * 0.85;
  const { addItemToCart } = useCartList();

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
          <h1>{product.nome}</h1>
          <span>{product.descricao}</span>
          <span>
            <h4>{product.categoria_nome}</h4>
            <h6>{product.subcategoria_nome}</h6>
          </span>
          <span className="price">De {formatToMoney(originalPrice)}</span>
          <span className="free">Por {formatToMoney(discountPrice)}</span>
        </div>
        <section className="container-informs">
          <label>
            Quantidade
            <input type="number" />
          </label>
         
          <button
            className="btn-confirm"
            onClick={() => {
              addItemToCart(product);
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
