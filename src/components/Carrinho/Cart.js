import { useCartList } from "./../../hooks/useCartList";
import { formatToMoney } from "./../../utils/formatters";
import cartBackground  from "./../../assets/cart.jpg"
import "./styles.css";

function CartShop() {
  const { addItemToCart, cartItems, removeItemFromCart } = useCartList();

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
              {cartItems?.map((product) => {
                aumont += product.valor_total * product.quantidade;
                return (
                  <>
                    <li className="product-item" key={product.id}>
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
                                  parseFloat(Number(product.valor_total * 0.85))
                                )}
                              </p>
                            </span>

                            <p style={{ margin: "8px 15px 0 0  " }}>X</p>
                            <span className="container-quantity">
                              <span className="show-quantity">
                                {product.quantidade}
                              </span>

                              <button
                                className="btn-controller-quantity"
                                onClick={() => removeProduct(product)}
                              >
                                -
                              </button>
                              <button
                                className="btn-controller-quantity"
                                onClick={() => addProduct(product)}
                              >
                                +
                              </button>
                            </span>
                            <p style={{ margin: "5px" }}>=</p>
                            <p className="all-values">
                              {formatToMoney(
                                parseFloat(
                                  Number(
                                    product.valor_total *
                                      0.85 *
                                      product.quantidade
                                  )
                                )
                              )}
                            </p>
                          </div>
                        </section>
                        <p className="old-price">
                          {formatToMoney(
                            parseFloat(Number(product.valor_total))
                          )}
                        </p>
                      </div>
                    </li>
                    <div className="div-line"></div>
                  </>
                );
              })}
            </ul>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
            <span>
              <h4>Total</h4>
              <h2 className="aumont"> {formatToMoney(aumont)}</h2>
            </span>
          </div>
          <button className="btn-confirm-transaction">Comprar</button>
        </div>
      </dialog>
    </>
  );
}

export default CartShop;
