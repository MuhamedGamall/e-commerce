import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
// @ts-ignore
import placeholderImage from "../../../assets/images/card-placeholder.png";

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
    <ButtonGroup className="action-buttons">
      <Button className="action-buttons__btn" onClick={handleRemove}>
        Remove
      </Button>
      <Button className="action-buttons__btn" onClick={handleSaveForLater}>
        Save for later
      </Button>
      <Button className="action-buttons__btn" onClick={handleEdit}>
        Edit
      </Button>
    </ButtonGroup>
  );
}


const CartCard = () => {
  const [quantity, setQuantity] = useState(5);
  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  return (
    <Card className="cart-card">
      <Box className="cart-card__box">
        {/* Image Section */}
        <Box className="cart-card__image">
          <CardMedia component="img" image={placeholderImage} alt="Product" />
          <Box className="cart-card__label">New</Box>
          <IconButton className="cart-card__fav-icon">
            <FavoriteBorderIcon />
          </IconButton>
        </Box>

        {/* Content Section */}
        <CardContent className="cart-card__content">
          <Box className="cart-card__details">
            <Box className="cart-card__title-box">
              <Typography variant="body1" fontWeight="600">
                Product Name
              </Typography>
              <Box className="cart-card__rating-code">
                <Box className="cart-card__rating">
                  <StarIcon />
                  <Typography>4.2 (1.8k)</Typography>
                </Box>
                <Typography className="cart-card__code">#Code654321</Typography>
              </Box>
            </Box>

            <Typography className="cart-card__description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            </Typography>

            <Box className="cart-card__color-size">
              <Box className="cart-card__color-box" />
              <span>Black</span>
              <span>|</span>
              <span>Size : XL</span>
            </Box>

            <span className="cart-card__stock">
              In Stock : Ships in 1-2 Business days
            </span>
          </Box>

          {/* Price and Quantity Section */}
          <Box className="cart-card__price-section">
            <Box className="cart-card__quantity-price">
              <Box className="cart-card__quantity-box">
                <IconButton
                  className="cart-card__quantity-button cart-card__quantity-button--decrease"
                  onClick={() => handleQuantityChange(-1)}
                >
                  <MdKeyboardArrowUp style={{ transform: "rotate(180deg)" }} />
                </IconButton>
                <Typography className="cart-card__quantity-value">
                  {quantity}
                </Typography>
                <IconButton
                  className="cart-card__quantity-button cart-card__quantity-button--increase"
                  onClick={() => handleQuantityChange(1)}
                >
                  <MdKeyboardArrowUp />
                </IconButton>
              </Box>

              <Box className="cart-card__price-box">
                <Typography
                  component="span"
                  className="cart-card__current-price"
                >
                  123$
                </Typography>
                <Typography component="span" className="cart-card__old-price">
                  456$
                </Typography>
              </Box>
            </Box>

            <Box className="cart-card__total-box">
              <Typography className="cart-card__total-label">Total:</Typography>
              <Typography className="cart-card__total-value">123$</Typography>
            </Box>
          </Box>
        </CardContent>
      </Box>

      <CardActions className="cart-card__actions">
        <ActionButtonGroup />
      </CardActions>
    </Card>
  );
};

export default CartCard;
