import "./style.css";
import Header from "./../../../components/Header";
import EditProfileModal from "./../../../components/EditProfileModal";
import ProductsCarousel from "./../../../components/CarouselProducts";
import Nav from "./../../../components/Nav";
import CarrinhoCompras from "./../../../components/Carrinho/Cart";
import { ProductsListProvider } from "./../../../context/ProductsContext";
import { CartProvider } from "./../../../context/CartContext";

function Main() {
  const largura = window.innerWidth;
  const altura = window.innerHeight;
console.log({
  with:largura,
  height:altura
})
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
