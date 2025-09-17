import Slider, { Settings } from "react-slick";

interface ResponseiveCarouselProps {
  settings?: Settings;
  children: React.ReactNode;
}

const defaultSettings: Settings = {
  speed: 800,
  slidesToShow: 4,
  slidesToScroll: 2,
  initialSlide: 0,
  autoplay: false,
  draggable: true,
  swipe: true,
  arrows: false,
  infinite: false,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
function ResponsiveCarousel({
  settings = defaultSettings,
  children,
}: ResponseiveCarouselProps) {
  return (
    <div className="slider-container " style={{ overflow: "hidden" }}>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}

export default ResponsiveCarousel;
