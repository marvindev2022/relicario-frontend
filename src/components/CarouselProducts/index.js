import React, { useState } from "react";
import closeIcon from "../../assets/close-icon.svg";
import CarouselDistacs from "../CarouselDestaques";
import { formatToMoney } from "../../utils/formatters";
import "./styles.css";

function ProductDialog({ product, onClose, stateCar, setStateCar }) {
  const originalPrice = Number(product.preco);
  const discountPrice = originalPrice * 0.85;

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
              document.querySelector("dialog").close();
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
            setStateCar({ ...stateCar, [product.nome]: product });
            document.querySelector("dialog").close();
          }}
        >
          Comprar
        </button>
      </div>
    </dialog>
  );
}

function ProductCard({ product, stateCar, setStateCar }) {
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
          stateCar={stateCar}
          setStateCar={setStateCar}
        />
      )}
    </>
  );
}

function ProductCarousel({ products, stateCar, setStateCar }) {
  return (
    <div className="product-carousel">
      <div className="product-carousel-cards">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            stateCar={stateCar}
            setStateCar={setStateCar}
          />
        ))}
      </div>
    </div>
  );
}

function ProductsCarousel({ products, stateCar, setStateCar }) {
  console.log(stateCar);
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
          <ProductCarousel
            products={beautyProducts}
            stateCar={stateCar}
            setStateCar={setStateCar}
          />
        </div>
        <span className="container-p-top">
          <h3 className="description-section" style={{ width: "450px" }}>
            Acessórios
          </h3>
          <p className="view-all">Ver tudo</p>
        </span>
        <div className="container-card">
          <ProductCarousel
            products={accessoriesProducts}
            stateCar={stateCar}
            setStateCar={setStateCar}
          />
        </div>
        <span className="container-p-top">
          <h3 className="description-section" style={{ width: "450px" }}>
            Vestuário
          </h3>
          <p className="view-all">Ver tudo</p>
        </span>
        <div className="container-card">
          <ProductCarousel
            products={clothingProducts}
            stateCar={stateCar}
            setStateCar={setStateCar}
          />
        </div>
      </section>
    </>
  );
}
export default ProductsCarousel;
