import ResponsiveCarousel from "../components/common/Carousel";

// @ts-ignore
import placeholder from "../assets/images/card-placeholder.png";
// @ts-ignore
import like from "../assets/icons/like.png";
import { Button } from "@mui/material";
const FeaturedArticle = () => {
  return (
    <section className="featured-section">
      <div className="featured-content">
        <div className="image-container">
          <img src={placeholder} alt="" className="image-placeholder" />
        </div>

        <div className="text-content">
          <h1 className="featured-title">Featured article title</h1>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus
            consequatur debitis vero quia omnis velit dolorem tempore,
            dignissimos, quod tempora id non aspernatur nisi ullam voluptate
            ducimus quidem architecto nam. eiusmod tempor incididunt ut labore
            et dolore magna aliqua
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus
            consequatur debitis vero quia omnis velit dolorem tempore,
            dignissimos, quod tempora id non aspernatur nisi ullam voluptate
            ducimus quidem architecto nam.
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus
            consequatur debitis vero quia omnis velit dolorem tempore,
            dignissimos, quod tempora id non aspernatur nisi ullam voluptate
            ducimus quidem architecto nam.
          </p>

          <div className="help-section">
            <span>- Did this help?</span>
            <div className="button-group">
              <Button className="btn">
                <img src={like} width={20} alt="" />
                Yes
              </Button>
              <Button className="btn">
                <img
                  src={like}
                  width={20}
                  style={{ transform: "rotate(180deg)" }}
                  alt=""
                />
                No
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const RelatedCard = ({ title, description }) => (
  <div className="article-card" >
    <img src={placeholder} alt="" className="card-image" />
    <div className="card-content">
      <h3>{title}</h3>
      <p>{description}</p>
      <Button variant="contained" className="view-btn">View article</Button>
    </div>
  </div>
);

const RelatedArticles = () => {
  const relatedArticles = Array(6).fill({
    title: "Featured article title",
    description: "Short blurb or introduction to the article's subject matter",
  });

  return (
    <section className="related-section">
      <h2>Related Articles :</h2>
      <ResponsiveCarousel>
        {relatedArticles.map((article, index) => (
          <RelatedCard
          
            key={index}
            title={article.title}
            description={article.description}
          />
        ))}
      </ResponsiveCarousel>
    </section>
  );
};

const FAQs = () => {
  return (
    <div className="container FAQs">
      <FeaturedArticle />
      <RelatedArticles />
    </div>
  );
};

export default FAQs;
