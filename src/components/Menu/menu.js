import { Link } from "react-router-dom";
import { getItem } from "./../../utils/storage";
import "./styles.css";

export default function MenuUser() {
  return (
    <div
      className="hidden main-menu"
      onClick={() => {
        document.querySelector(".main-menu").classList.add("hidden");
      }}
    >
      <menu className="menu">
        <ul className="ul-menu">
          {getItem("token") ? (
            <>
              <h4>Olá, {getItem("userName")}</h4>
              <Link className="link-menu" to="/relicario-frontend/home">
                <span className="container-li">
                  <li>Home</li>
                  <p>{">"}</p>
                </span>
              </Link>
            </>
          ) : (
            <Link className="link-menu" to="/relicario-frontend/sign-in">
              <span className="container-li">
                <li>Entrar</li>
                <p>{">"}</p>
              </span>
            </Link>
          )}

          <Link className="link-menu" to="/relicario-frontend/sobre">
            <span className="container-li">
              <li>Sobre</li>
              <p>{">"}</p>
            </span>
          </Link>

          <Link className="link-menu" to="/relicario-frontend/news">
            <span className="container-li">
              <li>Novidades</li>
              <p>{">"}</p>
            </span>
          </Link>

          <Link
            className="link-menu"
            to="/relicario-frontend/categorias/roupas"
          >
            <span className="container-li">
              <li>Roupas</li>
              <p>{">"}</p>
            </span>
          </Link>

          <Link
            className="link-menu"
            to="/relicario-frontend/categorias/perfumes"
          >
            <span className="container-li">
              <li>Perfumes</li>
              <p>{">"}</p>
            </span>
          </Link>

          <Link
            className="link-menu"
            to="/relicario-frontend/categorias/acessorios"
          >
            <span className="container-li">
              <li>Acessórios</li>
              <p>{">"}</p>
            </span>
          </Link>

          <Link
            className="link-menu"
            to="/relicario-frontend/categorias/infantil"
          >
            <span className="container-li">
              <li>Infantil</li>
              <p>{">"}</p>
            </span>
          </Link>

          <Link className="link-menu" to="/relicario-frontend/categorias/kits">
            <span className="container-li">
              <li>Kits</li>
              <p>{">"}</p>
            </span>
          </Link>

          <Link className="link-menu" to="/relicario-frontend/contato">
            <span className="container-li">
              <li>Contato</li>
              <p>{">"}</p>
            </span>
          </Link>
        </ul>
      </menu>
    </div>
  );
}
