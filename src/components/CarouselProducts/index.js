import React, { useState } from "react";
import CarouselDistacs from "../CarouselDestaques";
import "./styles.css";

function ProductDialog({ product, onClose }) {
  const originalPrice = Number(product.preco);
  const discountPrice = originalPrice * 0.85;

  return (
    <dialog
      style={{ minWidth: "480px", minHeight: "100%", zIndex: 99999999999 }}
      open={true}
      onClose={onClose}
    >
      <div
        style={{
          height: "100vh",
          display: "flex",
          justfyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "40px",
        }}
        className="container-dialog-card"
      >
        <img
          style={{ objectFit: "cover", width: "400px" }}
          src={product.imagem}
          alt={`Imagem ${product.nome}`}
        />
        <h1>{product.nome}</h1>
        <h4>{product.categoria_nome}</h4>
        <h6>{product.subcategoria_nome}</h6>
        <span>{product.descricao}</span>
        <span>R$ {originalPrice}</span>
        <span>R$ {discountPrice}</span>
        <button>Comprar</button>
      </div>
    </dialog>
  );
}

function ProductCard({ product }) {
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
          <p className="price">R$ {product.preco}</p>
          <p className="free">R$ {product.preco * 0.85}</p>
        </div>
      </div>
      {isDialogOpen && (
        <ProductDialog product={product} onClose={handleCloseDialog} />
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

function ProductsCarousel({ products }) {
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
      <section className="container-carrossel">
        <CarouselDistacs />
      </section>
      <section className="container-cards">
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
