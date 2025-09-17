import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, IconButton, Box } from "@mui/material";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";

interface ProductCardProps {
  view: "grid" | "list";
}

const ProductCard: React.FC<ProductCardProps> = ({ view }) => {
  return (
    <Card className={`product-card ${view}`}>
      <Box className="image-container">
        <span className="badge">New</span>
        <CardMedia
          component="img"
          image="https://via.placeholder.com/200x150"
          alt="Product"
          className="product-image"
        />
        <IconButton className="wishlist-btn">
          <AiOutlineHeart />
        </IconButton>
      </Box>

      <CardContent className="content">
        <Typography variant="h6" className="product-title">
          Product Name
        </Typography>
        <Typography variant="body2" color="text.secondary" className="price">
          123$
          <span className="old-price">156$</span>
        </Typography>

        <Box className="rating">
          <AiFillStar className="star" />
          <Typography variant="body2">4.2 (1.8k)</Typography>
        </Box>

        <Typography variant="body2" className="desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore amet consectetur adipiscing elit.
        </Typography>

        <Button className="add-btn" startIcon={<BsCart2 />}>
          Add to cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
