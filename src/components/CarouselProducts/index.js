import React, { useState } from "react";
import useProdutsList from "../../hooks/useProductsList";
import CarouselDistacs from "../CarouselDestaques";
import { formatToMoney } from "../../utils/formatters";
import "./styles.css";
import ProductDialog from "../Dialog/dialog";

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

function ProductCarousel({ products }) {
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
  const beautyProducts = [];
  const accessoriesProducts = [];
  const clothingProducts = [];
  const shoesProducts = [];
  products?.filter((product) => {
    if (product.categoria_nome === "Beleza") beautyProducts.push(product);
    if (product.categoria_nome === "Acessórios")accessoriesProducts.push(product);
    if (product.categoria_nome === "Vestuário") clothingProducts.push(product);
    if (product.categoria_nome === "Calçados") shoesProducts.push(product);
    return 0
    });

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
        <span className="container-p-top">
          <h3 className="description-section" style={{ width: "450px" }}>
            Calçados
          </h3>
          <p className="view-all">Ver tudo</p>
        </span>
        <div className="container-card">
          <ProductCarousel products={shoesProducts} />
        </div>
      </section>
    </>
  );
}
export default ProductsCarousel;
