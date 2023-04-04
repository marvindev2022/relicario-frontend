import "./styles.css";
import carrinho from "../../assets/car-icons.png";
import lupa from "../../assets/lupa.png";
import { useCartList } from "../../hooks/useCartList";
import { getItem } from "../../utils/storage";
import { useNavigate } from "../../../build/node_modules/react-router-dom/dist";
function Header() {
  const { cartItems } = useCartList();
  const navigate = useNavigate();
  return (
    <header>
      <div className="container-header">
        <span className="container-input-search">
          <img className="lupa" src={lupa} alt="lupa" />
          <input className="input-search" placeholder="Malbec" type="search" />
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
    </header>
  );
}

export default Header;
