import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography
} from "@mui/material";

// @ts-ignore
import placeholderImage from "../../../assets/images/card-placeholder.png";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import { FiShoppingCart } from "react-icons/fi";
import { RiDiscountPercentFill } from "react-icons/ri";


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

export default ProductCard;