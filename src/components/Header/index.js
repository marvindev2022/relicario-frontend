import React from "react";
import "./styles.css";
import carrinho from "../../assets/car-icons.png";
import lupa from "../../assets/lupa.png";

function Header() {
  return (
    <header>
      <div className="container-header">
        <span className="container-input">
          <img className="lupa" src={lupa} alt="lupa" />
          <input className="input-search" placeholder="Malbec" type="search" />
        </span>

        <span className="container-car">
          <img className="car-icon" src={carrinho} alt="carrinho" />
        </span>
      </div>
    </header>
  );
}

export default Header;
