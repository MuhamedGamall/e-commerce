import {
  Heart,
  ShoppingCart,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  Star,
  Filter,
  X,
} from "lucide-react";
import { FaRegHeart } from "react-icons/fa";

import React, { useState } from "react";
import discount from "../assets/svgs/discount.svg";
import star from "../assets/svgs/star.svg";
import abdelazez from "../assets/images/abdelazez-profile-pic.png";
export const ProductCard = ({ product, isListView }) => {
  const StarRating = ({ rating }) => (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`star ${star <= rating ? "filled" : "empty"}`}
        />
      ))}
    </div>
  );
  const [isFavorite, setIsFavorite] = useState(false);
  if (isListView) {
    return (
      <div className="product-card list-view">
        <div className="image-container">
          <div className="placeholder">
            <div className="inner-placeholder"></div>
          </div>
          {product.isNew && <span className="new-badge">New</span>}
        </div>
        <div className="content">
          <h3>{product.title}</h3>
          <p>{product.description}</p>
        </div>
        <div className="actions">
          <span className="price">${product.price}</span>
          <div className="buttons">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`favorite-button ${
                isFavorite ? "active" : "inactive"
              }`}
            >
              <Heart className={isFavorite ? "fill-current" : ""} />
            </button>
            <span>
              <img src={discount} alt="" />
            </span>
            <button className="add-to-cart">
              <ShoppingCart />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="product-card grid-view">
      <div className="image-container">
        <img src={""} alt="" />

        {product.isNew && <span className="new-badge">New</span>}

        <span className="disc-button">
          <img src={discount} alt="" />
        </span>

        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`favorite-button ${isFavorite ? "active" : "inactive"}`}
        >
          <FaRegHeart className={isFavorite ? "fill-current" : ""} />
        </button>
      </div>

      <div className="content">
        <div className="title-price">
          <h3 className="title-producr">{product.title}</h3>
          <span className="price">${product.price}</span>
        </div>
        <div className="price-rating">
          <img src={star} alt="" />
          <span>4.2(1.8k)</span>
        </div>
        <p>{product.description}</p>

        <button className="add-to-cart">
          <ShoppingCart />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};
