import { useCartList } from "./../../hooks/useCartList";

function CarrinhoCompras() {
  const { addItemToCart, cartItems, removeItemFromCart } = useCartList();

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
          <button className="close-cart" onClick={handleClose}>
            X
          </button>
          <h3>Seu Carrinho</h3>
          <ul>
            {cartItems?.map((produto) => (
              <li key={produto.id}>
                <img
                  style={{ width: "100px", objectFit: "cover" }}
                  src={produto.imagem}
                  alt={produto.nome}
                />
                {produto.nome} - R$
                {parseFloat(Number(produto.valor_total * 0.85)).toFixed(2)}{" "}
                <button onClick={() => addProduct(produto)}>+</button>
                <span>{produto.quantidade}</span>
                <button onClick={() => removeProduct(produto)}>-</button>
              </li>
            ))}
          </ul>
          <p>Total: R${}</p>
        </div>
      </dialog>
    </>
  );
}

export default CarrinhoCompras;
