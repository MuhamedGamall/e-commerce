import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { LuPrinter } from "react-icons/lu";
import { MdKeyboardArrowUp } from "react-icons/md";
import { PiShareFatLight } from "react-icons/pi";
import { SlLock } from "react-icons/sl";
// @ts-ignore
import placeholderImage from "../assets/images/card-placeholder.png";
// @ts-ignore
import paymentMethods from "../assets/images/payment-methods.png";

import { useMediaQuery, useTheme } from "@mui/material";
import {
  CartCard,
  FrequentlyProductCard,
  ProductCard,
} from "../components/common/cards";
import ResponsiveCarousel from "../components/common/Carousel";
function ActionButtonGroup() {
  const handleRemove = () => {
    console.log("Remove clicked");
  };

  const handleSaveForLater = () => {
    console.log("Save for later clicked");
  };

  const handleEdit = () => {
    console.log("Edit clicked");
  };

  return (
    <ButtonGroup
      variant="outlined"
      sx={{
        width: "100%",
        "& .MuiButton-root": {
          height: "40px",
          borderColor: "#000",
          color: "#000",
          backgroundColor: "white",
          textTransform: "none",
          fontSize: "14px",
          fontWeight: 400,
          padding: "8px 24px",
          minWidth: "90px",
          width: "100%",
          "&:hover": {
            backgroundColor: "#f9fafb",
            borderColor: "#000",
          },
          "&:not(:last-child)": {
            borderRight: "1px solid #000",
          },
        },

        "& .MuiButton-root:first-of-type": {
          borderTopLeftRadius: "16px",
          borderBottomLeftRadius: "16px",
        },
        "& .MuiButton-root:last-of-type": {
          borderTopRightRadius: "16px",
          borderBottomRightRadius: "16px",
        },
      }}
    >
      <Button onClick={handleRemove}>Remove</Button>
      <Button onClick={handleSaveForLater}>Save for later</Button>
      <Button onClick={handleEdit}>Edit</Button>
    </ButtonGroup>
  );
}

function CartSummary() {
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(50);

  const subtotal = 700;
  const shipping = 40;
  const tax = 14;
  const freeShippingThreshold = 1200;
  const totalBeforeDiscount = subtotal + shipping + tax;
  const total = totalBeforeDiscount - discount;

  const remainingForFreeShipping = Math.max(
    freeShippingThreshold - subtotal,
    0
  );
  const progress =
    subtotal >= freeShippingThreshold
      ? 100
      : (subtotal / freeShippingThreshold) * 100;

  return (
    <Box className="cart-summary">
      {/* Header */}
      <Box className="cart-summary__header">
        <Box className="cart-summary__header-left">
          <Typography variant="h3" className="cart-summary__title">
            Cart Summary
          </Typography>
          <Divider className="cart-summary__header-divider" />
        </Box>

        <Box className="cart-summary__actions">
          <Button className="action-btn" startIcon={saveSvg}>
            <div>Save</div>
          </Button>
          <Button className="action-btn" startIcon={<LuPrinter />}>
            <div>Print</div>
          </Button>
          <Button className="action-btn" startIcon={<PiShareFatLight />}>
            <div>Share</div>
          </Button>
        </Box>
      </Box>
      {/* Body */}
      <Box className="cart-summary__body">
        {/* Left column */}
        <Box className="cart-summary__left">
          <Box className="summary-list">
            <div className="summary-row">
              <Typography className="summary-row__label">
                Subtotal (3 items)
              </Typography>
              <Typography className="summary-row__value muted">
                {subtotal}$
              </Typography>
            </div>

            <div className="summary-row">
              <Typography className="summary-row__label">Shipping</Typography>
              <Typography className="summary-row__value muted">
                {shipping}$
              </Typography>
            </div>

            <div className="summary-row">
              <Typography className="summary-row__label">Discount</Typography>
              <Typography className="summary-row__value muted">
                - {discount}$
              </Typography>
            </div>

            <div className="summary-row">
              <Typography className="summary-row__label">Tax</Typography>
              <Typography className="summary-row__value muted">
                {tax}$
              </Typography>
            </div>

            <Divider className="summary-divider" />

            <div className="summary-row summary-row--total">
              <Typography className="summary-row__label total-label">
                Total Order
              </Typography>
              <Typography className="summary-row__value total-value">
                {total}$
              </Typography>
            </div>
          </Box>

          <Card className="gift-card">
            <Box className="gift-card__media">
              <CardMedia
                component="img"
                image={placeholderImage}
                alt="Product"
                className="gift-card__image"
              />
            </Box>

            <CardContent className="gift-card__content">
              <Box>
                <Typography className="gift-card__title">
                  Buying a gift for someone special?
                </Typography>
                <Typography className="gift-card__subtitle">
                  See our gift options
                </Typography>
              </Box>

              <IconButton className="gift-card__icon">
                <MdKeyboardArrowUp className="rotate-icon" />
              </IconButton>
            </CardContent>
          </Card>
        </Box>

        {/* Right column */}
        <Box className="cart-summary__right">
          <Box className="free-delivery">
            <LocalShippingOutlinedIcon className="free-delivery__icon" />
            <Typography className="free-delivery__text">
              Free Delivery for orders Over 1200$
            </Typography>
          </Box>

          <Box className="free-shipping-box">
            <Typography className="free-shipping-box__text">
              {subtotal >= freeShippingThreshold
                ? "You have free shipping!"
                : `You're ${remainingForFreeShipping} EGP away from FREE SHIPPING`}
            </Typography>

            <LinearProgress
              className="progress-bar"
              variant="determinate"
              value={progress}
            />

            <a className="terms-link" href="#">
              Terms & Conditions Apply
            </a>
          </Box>

          <Box className="promo-section">
            <Accordion className="promo-accordion">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className="promo-accordion__summary"
              >
                <Typography className="promo-accordion__title">
                  Promo Code
                </Typography>
              </AccordionSummary>

              <AccordionDetails className="promo-accordion__details">
                <Box className="promo-input-row">
                  <TextField
                    className="promo-input"
                    fullWidth
                    placeholder="Coupon code"
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <svg
                            width="20"
                            height="18"
                            viewBox="0 0 20 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1.00586 0.5H5.57227C5.6609 0.842743 5.8372 1.15947 6.0918 1.41406C6.46687 1.78914 6.97543 2 7.50586 2C8.03629 2 8.54485 1.78914 8.91992 1.41406C9.17452 1.15947 9.35081 0.842743 9.43945 0.5H19.0059C19.1385 0.5 19.2656 0.552717 19.3594 0.646484C19.4531 0.740252 19.5059 0.867391 19.5059 1V6.04492C18.8959 6.14813 18.328 6.43568 17.8848 6.87891C17.3222 7.44152 17.0059 8.20435 17.0059 9C17.0059 9.79565 17.3222 10.5585 17.8848 11.1211C18.328 11.5643 18.896 11.8509 19.5059 11.9541V17C19.5059 17.1326 19.4531 17.2597 19.3594 17.3535C19.2656 17.4473 19.1385 17.5 19.0059 17.5H9.43945C9.35081 17.1573 9.17452 16.8405 8.91992 16.5859C8.54485 16.2109 8.03629 16 7.50586 16C6.97543 16 6.46687 16.2109 6.0918 16.5859C5.8372 16.8405 5.6609 17.1573 5.57227 17.5H1.00586C0.87325 17.5 0.746111 17.4473 0.652344 17.3535C0.558576 17.2597 0.505859 17.1326 0.505859 17V1C0.505859 0.867392 0.558576 0.740252 0.652344 0.646484C0.746112 0.552716 0.873251 0.5 1.00586 0.5ZM7.50586 10C6.97543 10 6.46687 10.2109 6.0918 10.5859C5.71672 10.961 5.50586 11.4696 5.50586 12C5.50586 12.5304 5.71672 13.039 6.0918 13.4141C6.46687 13.7891 6.97543 14 7.50586 14C8.03629 14 8.54485 13.7891 8.91992 13.4141C9.29499 13.039 9.50586 12.5304 9.50586 12C9.50586 11.4696 9.29499 10.961 8.91992 10.5859C8.54485 10.2109 8.03629 10 7.50586 10ZM7.50586 4C6.97543 4 6.46687 4.21086 6.0918 4.58594C5.71672 4.96101 5.50586 5.46957 5.50586 6C5.50586 6.53043 5.71672 7.03899 6.0918 7.41406C6.46687 7.78914 6.97543 8 7.50586 8C8.03629 8 8.54485 7.78914 8.91992 7.41406C9.29499 7.03899 9.50586 6.53043 9.50586 6C9.50586 5.46957 9.29499 4.96101 8.91992 4.58594C8.54485 4.21086 8.03629 4 7.50586 4Z"
                              stroke="#BDBDBD"
                            />
                          </svg>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button className="promo-submit">Submit</Button>
                </Box>

                <Box className="savings-box">
                  <FaCheckCircle className="savings-box__icon" />
                  <Divider
                    orientation="vertical"
                    flexItem
                    className="savings-box__divider"
                  />
                  <Typography className="savings-box__text">
                    Your total saving on this order {discount} EGP
                  </Typography>
                  <Button className="remove-btn">Remove</Button>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>

          <Button className="checkout-btn">Go to Checkout</Button>

          <Box className="payment-section">
            <Box className="payment-section__secure">
              <SlLock className="payment-section__lock" />
              <Typography className="payment-section__text">
                Secure Payment
              </Typography>
            </Box>

            <img
              src={paymentMethods}
              alt="payment"
              className="payment-methods"
            />

            <Box className="help-row">
              {helpSvg}
              <Typography className="help-row__text">Need a Help?</Typography>
            </Box>

            <p className="help-text">
              If you have any questions you can send us an e-mail To
              Company.email@gmail.com ( Sun - Thu, 8am to 8pm GMT)
            </p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default function CartPage() {
  const theme = useTheme();
  const showBars = useMediaQuery(theme.breakpoints.up(551));

  return (
    <Box component={"div"} className="container cart-page">
      <Box className="cart-page__header">
        <Box className="cart-page__header__title">
          <Typography variant="h1">Your Cart</Typography>
          <Typography variant="subtitle1">2 Items ships at checkout</Typography>
        </Box>
        <Button variant="contained" className="continue-btn">
          Continue Shopping
        </Button>
      </Box>

      <Box className="cart-page__content">
        <Box className="cart-page__content__left">
          {Array.from({ length: 5 }).map((_, index, arr) => (
            <Box key={index} className="cart-page__content__left__cart-card">
              <CartCard />
            </Box>
          ))}
        </Box>

        <Box className="cart-page__content__right">
          <Box className="cart-page__content__right__saved-for-later">
            <Box className="cart-page__content__right__title">
              <h2>Saved for later</h2>
              <Button className="cart-page__content__right__view-all-btn">
                View All
              </Button>
            </Box>

            <FrequentlyProductCard />
            <FrequentlyProductCard />

            <Button
              variant="contained"
              fullWidth
              className="cart-page__content__right__add-all-btn"
            >
              Add all 2 to order
            </Button>
          </Box>
        </Box>
      </Box>

      <CartSummary />

      <Box className="related-products">
        <Box>
          <h2>Related Products</h2>
          <Button className="view-all-btn">View All</Button>
        </Box>
        <ResponsiveCarousel
          showBars={showBars}
          children={Array.from({ length: 10 }).map((_, index) => (
            <ProductCard key={index} />
          ))}
        />
      </Box>
    </Box>
  );
}

const helpSvg = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_4_36911)">
      <path
        d="M20.2777 20.6859C19.9202 20.1814 19.9754 19.6161 20.2858 19.1887C21.9597 17.2616 22.9789 14.7523 22.9789 12C22.9789 5.93664 18.0635 1.02124 12.0002 1.02124C5.93689 1.02124 1.02148 5.93664 1.02148 12C1.02148 18.0633 5.93689 22.9787 12.0002 22.9787C14.1505 22.9787 16.1507 22.3511 17.844 21.2829C18.5936 21.6403 19.9376 22.0493 21.8371 21.7338C21.0635 21.5065 20.5243 21.0332 20.2777 20.6859Z"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 18.1953C12.5523 18.1953 13 17.7476 13 17.1953C13 16.643 12.5523 16.1953 12 16.1953C11.4477 16.1953 11 16.643 11 17.1953C11 17.7476 11.4477 18.1953 12 18.1953Z"
        fill="black"
      />
      <path
        d="M8.73633 8.61504C8.73633 7.714 9.10154 6.89852 9.69215 6.30739C10.2828 5.71626 11.0988 5.35156 11.9998 5.35156C13.8024 5.35156 15.2633 6.81243 15.2633 8.61504C15.2633 9.51608 14.9591 10.3999 14.3075 10.9227C13.6323 11.4648 11.9883 12.3523 11.9883 13.7328"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_4_36911">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const saveSvg = (
  <svg
    width="22"
    height="24"
    viewBox="0 0 22 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.5762 0.914062V5.22926C13.5762 5.81366 13.809 6.37526 14.2242 6.78926C14.6404 7.20371 15.204 7.43629 15.7914 7.43606H20.7414"
      stroke="black"
      stroke-width="1.3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M20.8527 7.88901V18.1706C20.8288 18.8431 20.6721 19.5042 20.3916 20.1159C20.1111 20.7276 19.7124 21.2777 19.2183 21.7346C18.2194 22.6612 16.8935 23.1533 15.5319 23.1026H6.42393C5.74558 23.134 5.06771 23.031 4.4293 22.7995C3.79089 22.568 3.20453 22.2127 2.70393 21.7538C2.20532 21.2955 1.80262 20.7428 1.51918 20.1277C1.23574 19.5126 1.0772 18.8474 1.05273 18.1706V5.84181C1.07656 5.16929 1.23324 4.50815 1.51375 3.89647C1.79426 3.28478 2.19305 2.73466 2.68713 2.27781C3.68603 1.35121 5.01198 0.859154 6.37353 0.909807H13.2303C14.277 0.906456 15.2873 1.29371 16.0635 1.99581L19.6155 5.26221C19.9945 5.58875 20.3005 5.99139 20.5137 6.44395C20.7268 6.89651 20.8423 7.38887 20.8527 7.88901Z"
      stroke="black"
      stroke-width="1.3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10.9531 18.3319V10.2031"
      stroke="black"
      stroke-width="1.3"
      stroke-miterlimit="10"
      stroke-linecap="round"
    />
    <path
      d="M7.22656 14.9141L10.4246 18.1133C10.4939 18.183 10.5764 18.2383 10.6672 18.2761C10.758 18.3139 10.8554 18.3333 10.9538 18.3333C11.0521 18.3333 11.1495 18.3139 11.2403 18.2761C11.3311 18.2383 11.4136 18.183 11.483 18.1133L14.681 14.9153"
      stroke="black"
      stroke-width="1.3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
