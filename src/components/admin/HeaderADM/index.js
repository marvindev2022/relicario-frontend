import "./styles.css";
import Profile from "../../../assets/profile.svg";
import Logout from "../../../assets/logout.svg";
import { useNavigate } from "react-router-dom";
import { clear, getItem } from "../../../utils/storage";

function Header({ handleEditProfile }) {
  const navigate = useNavigate();

  let userName = !getItem("admName")
   
  function handleLogout() {
    clear();
    navigate("/admcontroller");
  }

  return (
    <header className="headerADM">
      <div className="width-limit content-header">
        <div>
          <h1 className="h1" >Relicario</h1>
        </div>
        <div className="container-sign-out">
          <div onClick={handleEditProfile} className="profile-area">
            <img src={Profile} alt="Profile" />
            <strong>{userName}</strong>
            <img
              src={Logout}
              alt="Logout"
              className="sign-out"
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
