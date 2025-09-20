import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";

// @ts-ignore
import placeholderImage from "../../../assets/images/card-placeholder.png";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import { RiDiscountPercentFill } from "react-icons/ri";

const FrequentlyProductCard = () => {
  return (
    <Card className="freq-card">
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

      <Box className="freq-card__content">
        <CardContent className="freq-card__content-inner">
          <Box className="freq-card__title-row">
            <Typography variant="body1" className="freq-card__title">
              Product Name
            </Typography>
            <Checkbox className="freq-card__checkbox" checked />
          </Box>

          <Box className="freq-card__rating">
            <StarIcon />
            <Typography className="freq-card__rating-text">
              4.2 (1.8k)
            </Typography>
          </Box>

          <Box className="freq-card__price">
            <Typography component="span" className="freq-card__price-new">
              123$
            </Typography>
            <Typography component="span" className="freq-card__price-old">
              456$
            </Typography>
          </Box>

          <Typography className="freq-card__desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore amet consectetur adipiscing elit
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default FrequentlyProductCard;
