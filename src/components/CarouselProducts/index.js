import React, { useState } from "react";
import closeIcon from "../../assets/close-icon.svg";
import useProdutsList from "../../hooks/useProductsList";
import CarouselDistacs from "../CarouselDestaques";
import { formatToMoney } from "../../utils/formatters";
import "./styles.css";
import { useCartList } from "../../hooks/useCartList";

function ProductDialog({ product, onClose }) {
  const originalPrice = Number(product.preco);
  const discountPrice = originalPrice * 0.85;
  const { addItemToCart } = useCartList();

  return (
    <dialog
      style={{
        position: "fixed",
        top: 0,

        zIndex: 99999999999,
      }}
      open={true}
      onClose={onClose}
    >
      <div className="container-dialog-card">
        <span className="close-dialog-icon">
          {" "}
          <img
            onClick={() => {
              onClose();
            }}
            src={closeIcon}
            alt="Fechar"
          />
        </span>
        <img
          style={{ objectFit: "cover", width: "400px" }}
          src={product.imagem}
          alt={`Imagem ${product.nome}`}
        />
        <h1>{product.nome}</h1>
        <span>{product.descricao}</span>
        <span>
          <h4>{product.categoria_nome}</h4>
          <h6>{product.subcategoria_nome}</h6>
        </span>
        <span className="price">De {formatToMoney(originalPrice)}</span>
        <span className="free">Por {formatToMoney(discountPrice)}</span>
        <button
          onClick={() => {
            addItemToCart(product);
            onClose();
          }}
        >
          Comprar
        </button>
      </div>
    </dialog>
  );
}

function ProductCard({ product }) {
  const { stateItensCar, setStateItensCar } = useProdutsList();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="card" onClick={handleOpenDialog}>
        <img
          className="imageProduct"
          src={product.imagem}
          alt="Imagem do produto"
        />
        <h2>{product.nome}</h2>
        <div className="container-price">
          <p className="price">{formatToMoney(product.preco)}</p>
          <p className="free">{formatToMoney(product.preco * 0.85)}</p>
        </div>
      </div>
      {isDialogOpen && (
        <ProductDialog
          product={product}
          onClose={handleCloseDialog}
          stateItensCar={stateItensCar}
          setStateItensCar={setStateItensCar}
        />
      )}
    </>
  );
}

function ProductCarousel() {
  const { products } = useProdutsList();
  return (
    <div className="product-carousel">
      <div className="product-carousel-cards">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

function ProductsCarousel() {
  const { products } = useProdutsList();
  const beautyProducts = products.filter(
    (product) => product.categoria_nome === "Beleza"
  );
  const accessoriesProducts = products.filter(
    (product) => product.categoria_nome === "Acessórios"
  );
  const clothingProducts = products.filter(
    (product) => product.categoria_nome === "Vestuário"
  );

  return (
    <>
      <section className="container-carrossel-distac">
        <CarouselDistacs />
      </section>
      <section className="container-section-cards">
        <span className="container-p-top">
          <h3 className="description-section" style={{ width: "450px" }}>
            Beleza
          </h3>
          <p className="view-all">Ver tudo</p>
        </span>
        <div className="container-card">
          <ProductCarousel products={beautyProducts} />
        </div>
        <span className="container-p-top">
          <h3 className="description-section" style={{ width: "450px" }}>
            Acessórios
          </h3>
          <p className="view-all">Ver tudo</p>
        </span>
        <div className="container-card">
          <ProductCarousel products={accessoriesProducts} />
        </div>
        <span className="container-p-top">
          <h3 className="description-section" style={{ width: "450px" }}>
            Vestuário
          </h3>
          <p className="view-all">Ver tudo</p>
        </span>
        <div className="container-card">
          <ProductCarousel products={clothingProducts} />
        </div>
      </section>
    </>
  );
}
export default ProductsCarousel;
