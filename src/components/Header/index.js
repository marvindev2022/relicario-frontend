import "./styles.css";
import carrinho from "../../assets/car-icons.png";
import lupa from "../../assets/lupa.png";
import useCartProvider from "../../hooks/useCartProvider";





function Header() {
  const { cartItems } = useCartProvider()

  return (
    <header>
      <div className="container-header">
        <span className="container-input">
          <img className="lupa" src={lupa} alt="lupa" />
          <input className="input-search" placeholder="Malbec" type="search" />
        </span>

        <span className="container-car">
          <img className="car-icon" src={carrinho} alt="carrinho" />
          {cartItems?.length > 0 ? (
            <span className="container-car-b">
              <b>{cartItems.length}</b>
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
