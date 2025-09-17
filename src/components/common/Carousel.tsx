// ProductCarousel.jsx
import React from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, Image } from "lucide-react";

const CustomPrevArrow = ({ className, style, onClick }: any) => (
  <button
    className={`carousel-arrow carousel-arrow--prev ${className}`}
    style={{ ...style }}
    onClick={onClick}
    aria-label="Previous slide"
  >
    <ChevronLeft size={24} />
  </button>
);

const CustomNextArrow = ({ className, style, onClick }: any) => (
  <button
    className={`carousel-arrow carousel-arrow--next ${className}`}
    style={{ ...style }}
    onClick={onClick}
    aria-label="Next slide"
  >
    <ChevronRight size={24} />
  </button>
);

const ProductCarousel = () => {
  const slides = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: `Product ${i + 1}`,
  }));

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    draggable: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          swipeToSlide: true,
          draggable: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="carousel-container">
      <Slider {...settings} className="product-carousel">
        {slides.map((slide) => (
          <div key={slide.id} className="carousel-slide-wrapper">
            <div className="carousel-slide">
              <button className="view-products-btn">View Products</button>
              <div className="placeholder-icon">
                <Image size={64} />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
