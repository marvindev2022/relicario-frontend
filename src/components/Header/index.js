import React, { useEffect, useState } from "react";
import "./styles.css";
import carrinho from "../../assets/car-icons.png";
import lupa from "../../assets/lupa.png";

function Header({stateCar,setStateCar}) {
  const [stateItensCar, setStateItensCar] = useState([])
  useEffect(()=>{
    setStateItensCar(stateCar)
  },[stateItensCar,stateCar])
  console.log(stateItensCar)
  console.log(stateCar)
  return (
    <header>
      <div className="container-header">
        <span className="container-input">
          <img className="lupa" src={lupa} alt="lupa" />
          <input className="input-search" placeholder="Malbec" type="search" />
        </span>

        <span className="container-car">
          <img className="car-icon" src={carrinho} alt="carrinho" />
         {stateItensCar.length > 0 ?  <span className="container-car-b">
            <b>{stateItensCar.length}</b>
            </span>:<></>}
        </span>
      </div>
    </header>
  );
}

export default Header;
