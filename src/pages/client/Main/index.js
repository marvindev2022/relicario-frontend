import { useEffect, useState } from "react";
import "./styles.css";
import "../../../styles/dialog.css";
import Header from "../../../components/Header";
import EditProfileModal from "../../../components/EditProfileModal";
import { loadProducts } from "../../../utils/requisitions";
import ProductsCarousel from "../../../components/CarouselProducts";
import Nav from "../../../components/Nav";

function Main() {
  const [openModalProfile, setOpenModalProfile] = useState(false);
  const [products, setProducts] = useState([]);
  const [stateCar, setStateCar] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      const allProducts = await loadProducts();
      setProducts(allProducts);
    }
    fetchProducts();
  }, []);

  return (
    <div className="container-main">
      <Header
        handleEditProfile={() => setOpenModalProfile(true)}
        stateCar={stateCar}
        setStateCar={setStateCar}
      />

      <ProductsCarousel
        products={products}
        setProducts={setProducts}
        stateCar={stateCar}
        setStateCar={setStateCar}
      />
      <EditProfileModal
        open={openModalProfile}
        handleClose={() => setOpenModalProfile(false)}
      />
      <Nav />
    </div>
  );
}

export default Main;
