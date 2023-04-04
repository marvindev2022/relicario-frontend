import React, {
  useEffect,
  useState,
} from "../../../build/node_modules/@types/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";
import { loadDistacs } from "../../utils/requisitions";

const CarouselDistacs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadApi = async () => {
      const destaques = await loadDistacs();
      setProducts(destaques);
    };
    loadApi();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    beforeChange: (current, next) => setActiveIndex(next),
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {products.map((product) => (
          <img
            key={product.id}
            src={product.url}
            alt=""
            max-width={250}
            max-height={150}
            className={`imagem-destaque carousel__image ${
              product.id === activeIndex ? "active" : ""
            }`}
          />
        ))}
      </Slider>
    </div>
  );
};

export default CarouselDistacs;
