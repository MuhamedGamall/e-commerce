import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Rating,
  Typography
} from "@mui/material";

// @ts-ignore
import like from "../../../assets/icons/like.png";

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

export default ReviewCard;
