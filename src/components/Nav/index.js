import {
  Link,
  useNavigate,
} from "react-router-dom/dist";
import homeItem from "../../assets/home-icon.png";
import favItem from "../../assets/fav-icon.png";
import alert from "../../assets/alert.png";
import profileItem from "../../assets/profile-icon.png";
import "./style.css";
import { getItem } from "../../utils/storage";

export default function Nav() {
  const navigate = useNavigate();

  return (
    <menu className="menu-fixed">
      <span>
        <Link to="/">
          <img
            onClick={() => {
              navigate("/");
            }}
            src={homeItem}
            alt=""
          />
        </Link>
        Home
      </span>
      <span>
        <Link to="/">
          <img
            onClick={() => {
              navigate("/favorict");
            }}
            src={favItem}
            alt=""
          />
        </Link>
        Favoritos
      </span>
      <span>
        <Link to="/">
          <img
            onClick={() => {
              navigate("/carrinho");
            }}
            src={alert}
            alt=""
          />
        </Link>
        Notificações
      </span>
      <span>
        <img
          onClick={() => {
            getItem("token") ? console.log("aqui") : navigate("/sign-in");
          }}
          src={profileItem}
          alt=""
        />
        conta
      </span>
    </menu>
  );
}
