import {
  Add,
  ChevronLeft,
  FavoriteBorder,
  Remove,
  StraightenOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  IconButton,
  Rating,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CiInstagram } from "react-icons/ci";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { styled } from "@mui/material/styles";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { RiShareForwardLine } from "react-icons/ri";
// @ts-ignore
import compareIcont from "../assets/icons/compare.png";
// @ts-ignore
import placeholderImage from "../assets/images/card-placeholder.png";
// @ts-ignore
import like from "../assets/icons/like.png";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import { FiShoppingCart } from "react-icons/fi";
import { HiOutlinePlus } from "react-icons/hi2";
import { RiDiscountPercentFill } from "react-icons/ri";
import ResponsiveCarousel from "../components/common/Carousel";

const ColorOption = styled(ToggleButton)(
  ({ selected, color }: any) => `
  width: 54px !important;
  height: 30px !important;
  border-radius: 14px !important;
  cursor: pointer !important;
  background-color: ${color} !important;
  border: ${"3px solid #fff"} !important;
  outline: ${selected ? "1px solid #000" : "none"} !important;
  transition: all 0.2s !important;
`
);

const SizeToggleButton = styled(ToggleButton)(() => ({
  minWidth: 50,
  padding: "6px 12px",
  border: "1px solid #E4E4E4 !important",
  borderRadius: "14px !important",
  backgroundColor: "#F2F2F2",
  width: "92px",
  height: "34px",
  color: "#000",
  textTransform: "none",
  "&.Mui-selected": {
    backgroundColor: "#000",
    color: "white",
    borderColor: "#000",
    "&:hover": {
      backgroundColor: "#333",
    },
  },
  "&:hover": {
    borderColor: "#999",
    backgroundColor: "#f9f9f9",
  },
}));

const AddToCartButton = styled(Button)(() => ({
  width: "100%",
  height: "40px",
  backgroundColor: "#000",
  color: "white",
  borderRadius: "16px",
  padding: "0 12px",
  fontSize: "16px",
  fontWeight: 400,
  marginBottom: "18px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#333",
  },
}));

const ActionButton = styled(Button)(() => ({
  display: "flex",
  alignItems: "center",
  padding: "0px 12px",
  border: "1px solid",
  borderRadius: "12px",
  backgroundColor: "white",
  color: "#000",
  textTransform: "none",
  height: "40px !important",
  whiteSpace: "nowrap",
  width: "100%",
  fontSize: "14px",
  "&:hover": {
    borderColor: "#999",
    backgroundColor: "#f9f9f9",
  },
}));

const Images = ({ images }: { images: string[] }) => {
  const [selectedImg, setSelectedImg] = useState(0);
  const [visibleThumbs, setVisibleThumbs] = useState<string[]>([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const containerRef: any = useRef(null);

  const getLargeThumbWidth = () => {
    if (window.innerWidth <= 586) {
      return 72;
    }
    return 92;
  };

  const calculateVisibleButtons = () => {
    if (containerRef.current && images.length > 0) {
      const containerWidth = containerRef.current.offsetWidth;
      const largeThumbWidth = getLargeThumbWidth();
      const smallThumbWidth = 46;
      const gap = 12;
      const arrowSpace = 100;

      const availableWidth = containerWidth - arrowSpace;
      const estimatedWidth = largeThumbWidth + smallThumbWidth * 6 + gap * 6;

      if (availableWidth >= estimatedWidth) {
        return Math.min(7, images.length);
      } else if (
        availableWidth >=
        largeThumbWidth + smallThumbWidth * 4 + gap * 4
      ) {
        return Math.min(5, images.length);
      } else if (
        availableWidth >=
        largeThumbWidth + smallThumbWidth * 3 + gap * 3
      ) {
        return Math.min(4, images.length);
      } else {
        return Math.min(3, images.length);
      }
    }
    return 5;
  };

  const updateVisibleButtons = () => {
    if (images.length === 0) return;

    const maxVisible = calculateVisibleButtons();
    const half = Math.floor(maxVisible / 2);

    let start = Math.max(0, selectedImg - half);
    let end = start + maxVisible;

    if (end > images.length) {
      end = images.length;
      start = Math.max(0, end - maxVisible);
    }

    setVisibleThumbs(images?.slice(start, end));
    setCanScrollLeft(start > 0);
    setCanScrollRight(end < images.length);
  };

  useEffect(() => {
    updateVisibleButtons();
    const handleResize = () => {
      updateVisibleButtons();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [selectedImg, images]);

  const handleNext = () => {
    if (canScrollRight || selectedImg < images.length - 1) {
      setSelectedImg((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    }
  };

  const handlePrevious = () => {
    if (canScrollLeft || selectedImg > 0) {
      setSelectedImg((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    }
  };

  const getStartIndex = () => {
    const maxVisible = calculateVisibleButtons();
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(0, selectedImg - half);
    let end = start + maxVisible;

    if (end > images.length) {
      end = images.length;
      start = Math.max(0, end - maxVisible);
    }
    return start;
  };

  return (
    <div className="images-container">
      {images.length > 0 && (
        <div className="main-image-wrapper">
          <img
            src={images[selectedImg]}
            alt={`Image ${selectedImg}`}
            className="main-image"
          />
          <span className="thumb-label">{selectedImg + 1}</span>
          <Stack direction="row" className="image-action-buttons">
            <IconButton className="action-btn">
              <FavoriteBorder fontSize="small" width={11} height={14} />
            </IconButton>
            <IconButton className="action-btn">
              <img src={compareIcont} alt="compare" width={17} height={15} />
            </IconButton>
            <IconButton className="action-btn">
              <RiShareForwardLine fontSize="medium" width={16} height={14} />
            </IconButton>
          </Stack>
        </div>
      )}

      <div ref={containerRef} className="thumbnails-wrapper">
        <IconButton onClick={handlePrevious}>
          <ChevronLeft className="arrow-icon" />
        </IconButton>
        <div className="thumbnails-list">
          {visibleThumbs.map((img, index) => {
            const realIndex = getStartIndex() + index;
            const largeThumbWidth = getLargeThumbWidth();
            return (
              <div
                key={realIndex}
                onClick={() => setSelectedImg(realIndex)}
                className="thumbnail-item"
              >
                <span className="thumb-label">{realIndex + 1}</span>
                <img
                  src={img}
                  alt={`Image ${realIndex}`}
                  className={`thumbnail-img ${
                    selectedImg === realIndex ? "active" : ""
                  }`}
                  style={{
                    width:
                      selectedImg === realIndex
                        ? `${largeThumbWidth}px`
                        : "46px",
                    height:
                      selectedImg === realIndex
                        ? `${largeThumbWidth}px`
                        : "46px",
                  }}
                />
              </div>
            );
          })}
        </div>
        <IconButton onClick={handleNext}>
          <ChevronRight className="arrow-icon" />
        </IconButton>
      </div>
    </div>
  );
};

const GreaseTrapService = () => {
  return (
    <div className="grease-service">
      <p className="grease-service__text">
        We Specialize in draining grease trap tanks using top class vacuum
        sucking machines and tankers as per RAK municipality stipulation for
        grease traps installed in the basement of buildings restaurants located
        in food courts or shopping malls. We have portable machines mounted on
        smaller vehicles for effective cleaning.
      </p>

      <div className="grease-service__section">
        <h2 className="grease-service__title">Advantages:</h2>
        <ul className="grease-service__list">
          <li>
            Effectively and professionally vacuum, pump and haul the liquid
            waste and sludge from grease trap.
          </li>
          <li>Record the volume of grease removed on the maintenance log.</li>
          <li>
            Reliable, efficient, hygienic and cost effective maintenance,
            maintain proper transponder manifests and follow all municipality
            regulations.
          </li>
          <li>Grease Trap service visits upon schedule annual contract.</li>
          <li>
            Annual full service package for grease trap service, General
            drainage system survey as well as Emergency call service.
          </li>
        </ul>
      </div>

      <div className="grease-service__section">
        <h2 className="grease-service__title">Applications:</h2>
        <ul className="grease-service__list">
          <li>Grease Trap service visits upon schedule annual contract.</li>
          <li>Annual full service package for grease trap service.</li>
          <li>
            General drainage system survey as well as Emergency call service.
          </li>
        </ul>
      </div>
    </div>
  );
};

const ReviewCard = () => {
  return (
    <Card className="review-card">
      <CardContent className="review-card__content">
        <Box className="review-card__header">
          <Box className="review-card__user">
            <Avatar className="review-card__avatar">J</Avatar>
            <Box>
              <Typography className="review-card__name">
                Jeffry Graham
              </Typography>
              <Typography className="review-card__date">2 weeks ago</Typography>
            </Box>
          </Box>
          <Rating
            value={5}
            precision={0.1}
            readOnly
            size="small"
            className="review-card__stars"
          />
        </Box>

        <Typography className="review-card__text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore consectetur adipiscing elit,
          incididunt ut labore Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore
        </Typography>

        <Box className="review-card__recommend">
          <Typography className="review-card__recommend-label">
            Recommend?
          </Typography>
          <div className="button-group">
            <Button className="btn">
              <img src={like} width={20} alt="like" />
              Yes
            </Button>
            <Button className="btn btn--no">
              <img src={like} width={20} alt="like" />
              No
            </Button>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

const ProductCard = () => {
  return (
    <Card className="product-card">
      {/* Image Section */}
      <Box className="product-card__image-wrapper">
        <Box className="product-card__new">New</Box>

        <IconButton className="product-card__discount">
          <RiDiscountPercentFill color="black" size={24} />
        </IconButton>

        <CardMedia
          component="img"
          image={placeholderImage}
          alt="Product"
          className="product-card__image"
        />

        <IconButton className="product-card__favorite">
          <FavoriteBorderIcon />
        </IconButton>
      </Box>

      {/* Content */}
      <CardContent className="product-card__content">
        <Box className="product-card__title-row">
          <Typography variant="body2" className="product-card__title">
            Product Name
          </Typography>
          <Box>
            <Typography component="span" className="product-card__price-new">
              123$
            </Typography>
            <Typography component="span" className="product-card__price-old">
              456$
            </Typography>
          </Box>
        </Box>

        <Box className="product-card__rating">
          <StarIcon />
          <Typography variant="body1" className="product-card__rating-text">
            4.2 (1.8k)
          </Typography>
        </Box>

        <Typography variant="body2" className="product-card__desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore amet consectetur adipiscing elit.
        </Typography>
      </CardContent>

      {/* Add to cart */}
      <CardActions sx={{ padding: "0 !important" }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<FiShoppingCart />}
          className="product-card__btn"
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

const FrequentlyProductCard = () => {
  return (
    <Card className="freq-card">
      {/* Image Section */}
      <Box className="freq-card__image-wrapper">
        <CardMedia
          component="img"
          image={placeholderImage}
          alt="Product"
          className="freq-card__image"
        />

        <Box className="freq-card__label">New</Box>

        <IconButton className="freq-card__discount">
          <RiDiscountPercentFill color="black" size={24} />
        </IconButton>

        <IconButton className="freq-card__favorite">
          <FavoriteBorderIcon />
        </IconButton>
      </Box>

      {/* Content Section */}
      <Box className="freq-card__content">
        <CardContent className="freq-card__content-inner">
          {/* Title + Price + Checkbox */}
          <Box className="freq-card__title-row">
            <Typography variant="body1" className="freq-card__title">
              Product Name
            </Typography>
            <Checkbox className="freq-card__checkbox" checked />
          </Box>

          {/* Rating */}
          <Box className="freq-card__rating">
            <StarIcon />
            <Typography className="freq-card__rating-text">
              4.2 (1.8k)
            </Typography>
          </Box>

          {/* Price */}
          <Box className="freq-card__price">
            <Typography component="span" className="freq-card__price-new">
              123$
            </Typography>
            <Typography component="span" className="freq-card__price-old">
              456$
            </Typography>
          </Box>

          {/* Description */}
          <Typography className="freq-card__desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore amet consectetur adipiscing elit
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(5);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");

  const colors = ["#000000", "#4a4a4a", "#808080", "#b3b3b3", "#d9d9d9"];
  const sizes = ["XS", "S", "M", "L", "XL", "2 XL"];

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleSizeChange = (event, newSize) => {
    if (newSize !== null) {
      setSelectedSize(newSize);
    }
  };

  return (
    <Box component={"div"} className="product-details-container">
      {/* Header */}
      <Box className="product-header">
        <Typography variant="h6" component="h1" className="product-title">
          Product Name
        </Typography>
        <Box className="price-section">
          <Typography variant="h6" className="current-price">
            $120
          </Typography>
          <Typography variant="body1" className="original-price">
            $1345
          </Typography>
        </Box>
        <Typography variant="body2" className="discount-chip">
          40% OFF
        </Typography>
      </Box>

      {/* Rating */}
      <Box className="rating-section">
        <Rating
          value={5}
          precision={0.1}
          readOnly
          size="small"
          className="stars"
        />
        <Typography variant="body2" className="reviews-text">
          4.6 (5487 Reviews)
        </Typography>
      </Box>

      {/* Description */}
      <Typography className="description">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. psum has simply dummy text of the printing and typesetting
        industry.
      </Typography>

      {/* Quantity */}
      <Box className="quantity">
        <IconButton onClick={() => handleQuantityChange(-1)} size="small">
          <Remove className="quantity-icon" />
        </IconButton>
        <Typography variant="body1" className="quantity-value">
          {quantity}
        </Typography>
        <IconButton onClick={() => handleQuantityChange(1)} size="small">
          <Add className="quantity-icon" />
        </IconButton>
      </Box>

      {/* Action Buttons */}
      <Stack direction="row" spacing={1.5} className="action-buttons">
        <ActionButton startIcon={<FavoriteBorder width={16} height={14} />}>
          Add to Wishlist
        </ActionButton>
        <ActionButton
          startIcon={
            <img src={compareIcont} alt="compare" width={16} height={14} />
          }
        >
          Add to Compare
        </ActionButton>
        <ActionButton startIcon={<RiShareForwardLine width={16} height={14} />}>
          Share
        </ActionButton>
      </Stack>

      {/* Colors */}
      <Box className="colors-section--desktop colors-section">
        <Typography variant="subtitle2" className="section-title">
          Colors :
        </Typography>
        <ToggleButtonGroup className="colors-toggle">
          {colors.map((color, index) => (
            <ColorOption
              key={index}
              selected={selectedColor === index}
              color={color as any}
              value={color}
              onClick={() => setSelectedColor(index)}
            />
          ))}
        </ToggleButtonGroup>
      </Box>

      {/* Sizes */}
      <Box className="sizes-section--desktop sizes-section">
        <Box className="sizes-header">
          <Typography variant="subtitle2" className="section-title">
            Sizes :
          </Typography>
          <Button
            startIcon={<StraightenOutlined className="size-guide-icon" />}
            size="small"
            className="size-guide-btn"
          >
            Size Guide
          </Button>
        </Box>
        <ToggleButtonGroup
          value={selectedSize}
          exclusive
          onChange={handleSizeChange}
          className="sizes-toggle"
        >
          {sizes.map((size) => (
            <SizeToggleButton key={size} value={size}>
              {size}
            </SizeToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {/* Trust Signal */}
      <Card className="trust-card">
        <CardContent className="trust-card-content">
          <Typography variant="subtitle1" className="trust-title">
            Trust Signal Around Add To cart
          </Typography>
          <Typography variant="body2" className="trust-subtitle">
            Spend 150 EGP or more for free shipping
          </Typography>
          <Typography variant="caption" className="trust-link">
            Terms & Conditions Apply
          </Typography>
        </CardContent>
      </Card>

      {/* Add to Cart */}
      <AddToCartButton>Add to Cart</AddToCartButton>

      {/* Stock Info */}
      <Box className="stock-info">
        <Typography variant="body2" className="stock-text">
          Option Out of Stock ?!{" "}
          <Typography component="span" className="stock-link">
            Join Our Wait List
          </Typography>
        </Typography>
      </Box>

      {/* Follow */}
      <Box className="follow-section">
        <Typography variant="subtitle2" className="section-title">
          Follow Us:
        </Typography>
        <Stack direction="row" spacing={"6px"}>
          <IconButton size="small">
            <FaFacebookF size={24} className="social-icon" />
          </IconButton>
          <IconButton size="small">
            <CiInstagram size={24} className="social-icon" />
          </IconButton>
          <IconButton size="small">
            <FaXTwitter size={24} className="social-icon" />
          </IconButton>
          <IconButton size="small">
            <FaLinkedin size={24} className="social-icon" />
          </IconButton>
        </Stack>
      </Box>
      {/* Colors */}
      <Box className="colors-section--mobile colors-section">
        <Typography variant="subtitle2" className="section-title">
          Colors :
        </Typography>
        <ToggleButtonGroup className="colors-toggle">
          {colors.map((color, index) => (
            <ColorOption
              key={index}
              selected={selectedColor === index}
              color={color as any}
              value={color}
              onClick={() => setSelectedColor(index)}
            />
          ))}
        </ToggleButtonGroup>
      </Box>

      {/* Sizes */}
      <Box className="sizes-section--mobile sizes-section">
        <Box className="sizes-header">
          <Typography variant="subtitle2" className="section-title">
            Sizes :
          </Typography>
          <Button
            startIcon={<StraightenOutlined className="size-guide-icon" />}
            size="small"
            className="size-guide-btn"
          >
            Size Guide
          </Button>
        </Box>
        <ToggleButtonGroup
          value={selectedSize}
          exclusive
          onChange={handleSizeChange}
          className="sizes-toggle"
        >
          {sizes.map((size) => (
            <SizeToggleButton key={size} value={size}>
              {size}
            </SizeToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
};

const ProductPage = () => {
  const theme = useTheme();
  const showBars = useMediaQuery(theme.breakpoints.up(551));
  return (
    <Box className="product-page container">
      <Box className="product-page__main">
        <Images
          images={Array.from({ length: 7 }).map((_, index) => placeholderImage)}
        />
        <ProductDetails />
      </Box>

      <Box className="product-page__description">
        <Box className="product-page__description-left">
          <h2 className="section-title">Product Description</h2>
          <GreaseTrapService />
        </Box>

        <Box className="product-page__description-right">
          <h2 className="section-title">Frequently Bought Together:</h2>
          <FrequentlyProductCard />
          <HiOutlinePlus className="plus-icon" size={32} strokeWidth="2" />
          <FrequentlyProductCard />

          <Box className="total-box">
            <Typography className="total-price">
              Total Price : 450 EGP
            </Typography>
            <Button className="btn-add-cart">Add all 2 to cart</Button>
          </Box>
        </Box>
      </Box>

      <Box className="product-page__reviews">
        <h2 className="section-title">Reviews</h2>
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <Button className="btn-review">Add Review</Button>
      </Box>

      <Box className="product-page__related">
        <Box className="related-header">
          <h2 className="section-title">Related Products</h2>
          <Button className="btn-view-all">View All</Button>
        </Box>

        <ResponsiveCarousel
          showBars={showBars}
          children={Array.from({ length: 10 }).map((_, index) => (
            <ProductCard />
          ))}
        />
      </Box>
    </Box>
  );
};

export default ProductPage;
