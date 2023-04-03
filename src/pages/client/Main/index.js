import "./styles.css";
import Header from "../../../components/Header";
import EditProfileModal from "../../../components/EditProfileModal";
import ProductsCarousel from "../../../components/CarouselProducts";
import Nav from "../../../components/Nav";
import { ProductsListProvider } from "../../../context/ProductsContext";
import { CartProvider } from "../../../context/CartContext";
import CarrinhoCompras from "../../../components/Carrinho/Cart";

function Main() {
  return (
    <ProductsListProvider>
      <div className="container-main">
        <CartProvider>
          <Header />
          <CarrinhoCompras/>
          <ProductsCarousel />
          <EditProfileModal />
          <Nav />
        </CartProvider>
      </div>
    </ProductsListProvider>
  );
}

export default Main;
