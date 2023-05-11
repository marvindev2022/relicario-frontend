import { useState } from "react";
import { useNavigate } from "react-router";
import { useCartList } from "../../hooks/cart/useCartList";
import { formatToMoney } from "../../functions/formatters";
import cartBackground from "./../../assets/cart.jpg";
import "./styles.css";

function CartShop() {
  const { addItemToCart, cartItems, removeItemFromCart } = useCartList();
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();
  let aumont = 0;
  function addProduct(product) {
    addItemToCart(product);
  }

  function removeProduct(product) {
    removeItemFromCart(product);
  }

  function handleClose() {
    document.querySelector(".container-cart").close();
  }

  function handleProductQuantity(product) {
    return function (event) {
      handleQuantity(product, event);
    };
  }

  function handleQuantity(product, { target }) {
    setQuantity(prevQuantity => ({
      ...prevQuantity,
      [product.nome]: target.value
    }));
    addItemToCart(product);
  }

  return (
    <>
      <dialog className="container-cart">
        <div className="cart">
          <button className="close-cart-x" onClick={handleClose}>
            X
          </button>
          <h1>Carrinho</h1>
          {cartItems.length > 0 ? (
            <ul>
              {cartItems
                ?.sort((a, b) => a.id - b.id)
                .map(product => {
                  aumont += product.valor_total * product.quantidade;
                  return (
                    <span key={product.id}>
                      <li className="product-item">
                        <img
                          className="img-cart"
                          src={product.imagem}
                          alt={"Imagem " + product.nome}
                        />

                        <div className="container-details">
                          <span className="product-name"> {product.nome}</span>

                          <section className="section-details">
                            <div className="container-cart-price">
                              <span>
                                <p className="new-price">
                                  {formatToMoney(
                                    parseFloat(product.valor_total * 0.85)
                                  )}
                                </p>
                              </span>
                            </div>

                            <p>X</p>
                            <span className="container-quantity">
                              <input
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  padding: 0
                                }}
                                name={product.nome}
                                value={
                                  quantity[product.nome] ?? product.quantidade
                                }
                                onChange={handleProductQuantity(product)}
                              />
                              <button
                                className="btn-controller-quantity"
                                onClick={() => removeProduct(product)}
                              >
                                -
                              </button>
                              <button
                                style={{ borderRadius: "0px 6px 6px 0px" }}
                                className="btn-controller-quantity"
                                onClick={() => addProduct(product)}
                              >
                                +
                              </button>
                            </span>
                            <p>=</p>
                            <p className="all-values">
                              {formatToMoney(
                                parseFloat(
                                  product.valor_total *
                                    0.85 *
                                    product.quantidade
                                )
                              )}
                            </p>
                          </section>
                          <p className="old-price">
                            {formatToMoney(parseFloat(product.valor_total))}
                          </p>
                        </div>
                      </li>
                      <div className="div-line"></div>
                    </span>
                  );
                })}
            </ul>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <img
                style={{ width: "400px", objectFit: "cover" }}
                src={cartBackground}
                alt="Carrinho vazio"
              />
            </div>
          )}
          <div className="container-all-values">
            <span className="container-aumont">
              <h4>Total</h4>
              <h2 className="aumont"> {formatToMoney(aumont)}</h2>
            </span>
          </div>
          <button
            onClick={() => {
              navigate("/sale");
            }}
            className="btn-confirm-transaction"
          >
            Comprar
          </button>
        </div>
      </dialog>
    </>
  );
}

export default CartShop;
