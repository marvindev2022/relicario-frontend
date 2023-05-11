import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MainADM from "./pages/admin/MainADM";
import SignInADM from "./pages/admin/SignInADM";
import Home from "./pages/client/Home/home";
import Main from "./pages/client/Main";
import SalePage from "./pages/client/salePage/sale";
import SignIn from "./pages/client/SignIn";
import SignUp from "./pages/client/SignUp";
import { getItem } from "./utils/storage";

function ProtectedRoutes({ redirectTo }) {
  const token = getItem("token");
  return token ? <Outlet /> : <Navigate to={redirectTo} />;
}

function ProtectedRoutesADM({ redirectTo }) {
  const tokenADM = true

  return tokenADM ? <Outlet /> : <Navigate to={redirectTo} />;
}
function MainRoutes() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Main />} />

        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/admcontroller"
          element={<SignInADM />}
        />

        <Route element={<ProtectedRoutes redirectTo="/" />}>
          <Route path="/sale" element={<SalePage />} />
          <Route path="/home" element={<Home />} />
        </Route>
        <Route element={<ProtectedRoutesADM redirectTo="/admcontroller" />}>
          <Route path="/main/admcontroller" element={<MainADM />} />
        </Route>
      </Routes>
    </>
  );
}

export default MainRoutes;
