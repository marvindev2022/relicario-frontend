import { useCartList } from "./../../hooks/useCartList";
import { formatToMoney } from "./../../utils/formatters";
import "./styles.css";
function CartShop() {
  const { addItemToCart, cartItems, removeItemFromCart } = useCartList();

  let array = 0;

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
          <ul>
            {cartItems?.map((product) => {
              array += product.valor_total * product.quantidade;
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

                          <span className="container-quantity">
                            <p style={{ margin: "5px 0 " }}>X</p>

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
                            <p style={{ margin: "5px 0 5px 10px" }}>=</p>
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
                          </span>
                        </div>
                      </section>
                      <p className="old-price">
                        {formatToMoney(parseFloat(Number(product.valor_total)))}
                      </p>
                    </div>
                  </li>
                  <div className="div-line"></div>
                </>
              );
            })}
          </ul>
          <div className="container-all-values">
            <span>
              <h4>Total</h4>
              <h2 className="all-products-value"> {formatToMoney(array)}</h2>
            </span>
          </div>
          <button className="btn-confirm-transaction">Comprar</button>
        </div>
      </dialog>
    </>
  );
}

export default CartShop;
