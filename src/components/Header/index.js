import "./styles.css";
import carrinho from "./../../assets/car-icons.png";
import lupa from "./../../assets/lupa.png";
import { useCartList } from "./../../hooks/cart/useCartList";
import { useProductsList } from "./../../hooks/shop/useProductsList";
import { getItem } from "./../../utils/storage";
import { useNavigate } from "react-router-dom/dist";
import { useState } from "react";

function Header() {
  const { cartItems } = useCartList();
  const { stateItensCar } = useProductsList();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = event => {
    const searchValue = event.target.value.toLowerCase();
    
    setSearchTerm(searchValue);
    const filtered = stateItensCar?.filter(product =>
      product
      // product.nome.toLowerCase().includes(searchValue)
      );
    setFilteredProducts(filtered);
  };

  const products = searchTerm ? filteredProducts : stateItensCar;
  return (
    <header>
      <div className="container-header">
        <span className="container-input-search">
          <img className="lupa" src={lupa} alt="lupa" />
          <input
            className="input-search"
            placeholder="Malbec"
            type="search"
            onChange={handleSearch}
          />
        </span>
        <span
          onClick={() => {
            getItem("token")
              ? document.querySelector(".container-cart").showModal()
              : navigate("/sign-in");
          }}
          className="container-car"
        >
          <img className="car-icon" src={carrinho} alt="carrinho" />
          {cartItems.length > 0 ? (
            <span className="container-car-b">
              <b>
                {cartItems?.reduce((count, product) => {
                  return count + product.quantidade;
                }, 0)}
              </b>
            </span>
          ) : (
            <></>
          )}
        </span>
      </div>

      <div style={{position:"fixed",top:0,left:0}}>
        {products?.map(product => (
          <div key={product.id}>
            <p>{product.name}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </header>
  );
}

export default Header;
