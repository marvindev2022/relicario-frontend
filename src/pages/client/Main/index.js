import "./style.css";
import Header from "./../../../components/Header";
import EditProfileModal from "./../../../components/EditProfileModal";
import ProductsCarousel from "./../../../components/CarouselProducts";
import Nav from "./../../../components/Nav";
import DialogCart from "./../../../components/DialogCart/Cart";
import { ProductsListProvider } from "./../../../context/ProductsContext";
import { CartProvider } from "./../../../context/CartContext";
import MenuUser from "./../../../components/Menu/menu";

function Main() {
  return (
    <ProductsListProvider>
      <div className="container-main">
        <CartProvider>
          <Header />
          <DialogCart />
          <ProductsCarousel />
          <EditProfileModal />
          <MenuUser />
          <Nav />
        </CartProvider>
      </div>
    </ProductsListProvider>
  );
}

export default Main;
