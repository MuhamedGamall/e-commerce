import React, { useState, useMemo } from "react";
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
import { Filters, Product } from "../types/CategoryTypes";
import { heroSlides, mockProducts } from "../mockData/CategoryData";
import { ProductCard } from "../components";

// Components
const Breadcrumbs = () => (
  <nav className="breadcrumbs">
    <span>Home</span>
    <ChevronRight className="chevron" />
    <span>Category</span>
    <ChevronRight className="chevron" />
    <span className="current">Products</span>
  </nav>
);

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };
  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };
  return (
    <div className="hero-slider">
      <div
        className="slides-container"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {heroSlides.map((slide) => (
          <div key={slide.id} className="slide">
            <div className="content">
              <div className="text-container">
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={prevSlide} className="nav-button prev">
        <ChevronLeft />
      </button>
      <button onClick={nextSlide} className="nav-button next">
        <ChevronRight />
      </button>
      <div className="dots">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`dot ${index === currentSlide ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

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

const Sidebar = ({ filters, setFilters, isOpen, setIsOpen }) => {
  const categories = ["Electronics", "Fashion", "Home", "Sports"];
  const locations = [
    "All",
    "New York",
    "California",
    "Texas",
    "Florida",
    "Washington",
    "Oregon",
    "Nevada",
    "Colorado",
    "Utah",
    "Arizona",
    "Michigan",
    "Illinois",
  ];
  const handleCategoryChange = (category, checked) => {
    if (checked) {
      setFilters({ ...filters, categories: [...filters.categories, category] });
    } else {
      setFilters({
        ...filters,
        categories: filters.categories.filter((c) => c !== category),
      });
    }
  };
  const sidebarContent = (
    <div className="filters">
      <h3>Filters</h3>
      <div className="section categories">
        <h4>Categories</h4>
        <div>
          {categories.map((category) => (
            <label key={category} className="category">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={(e) =>
                  handleCategoryChange(category, e.target.checked)
                }
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="section price-range">
        <h4>Price Range</h4>
        <div>
          <input
            type="range"
            min="0"
            max="1000"
            value={filters.priceRange[1]}
            onChange={(e) =>
              setFilters({
                ...filters,
                priceRange: [0, parseInt(e.target.value)],
              })
            }
            className="slider"
          />
          <div className="range-values">
            <span>$0</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>
      <div className="section location">
        <h4>Location</h4>
        <select
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        >
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
      <div className="section rating">
        <h4>Minimum Rating</h4>
        <div>
          {[5, 4, 3, 2, 1].map((rating) => (
            <label key={rating} className="rating-option">
              <input
                type="radio"
                name="rating"
                checked={filters.minRating === rating}
                onChange={() => setFilters({ ...filters, minRating: rating })}
              />
              <StarRating rating={rating} />
              <span>& up</span>
            </label>
          ))}
        </div>
      </div>
      <div className="section map">
        <h4>Location Map</h4>
        <div className="map-placeholder">
          <span>Map View</span>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <div className="sidebar desktop">{sidebarContent}</div>
      {isOpen && (
        <div className="sidebar mobile open">
          <div className="overlay" onClick={() => setIsOpen(false)} />
          <div className="content">
            <div className="header">
              <h3>Filters</h3>
              <button onClick={() => setIsOpen(false)} className="close-button">
                <X />
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [goToPage, setGoToPage] = useState("");
  const handleGoToPage = () => {
    const page = parseInt(goToPage);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      setGoToPage("");
    }
  };
  return (
    <div className="pagination">
      <div className="nav-buttons">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="prev-next"
        >
          Previous
        </button>
        <div>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`page-button ${
                  currentPage === page ? "active" : "inactive"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="prev-next"
        >
          Next
        </button>
      </div>
      <div className="go-to-page">
        <span>Go to page:</span>
        <input
          type="number"
          min="1"
          max={totalPages}
          value={goToPage}
          onChange={(e) => setGoToPage(e.target.value)}
        />
        <button onClick={handleGoToPage} className="go-button">
          Go
        </button>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="grid">
        <div className="section">
          <h3>About Us</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="section">
          <h3>Customer Service</h3>
          <ul>
            <li>Contact Us</li>
            <li>FAQ</li>
            <li>Shipping Info</li>
            <li>Returns</li>
          </ul>
        </div>
        <div className="section">
          <h3>Company</h3>
          <ul>
            <li>Careers</li>
            <li>Press</li>
            <li>Investors</li>
            <li>Terms of Service</li>
          </ul>
        </div>
        <div className="section">
          <h3>Connect</h3>
          <ul>
            <li>Newsletter</li>
            <li>Social Media</li>
            <li>Blog</li>
            <li>Community</li>
          </ul>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; 2025 Your Company Name. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

// Main Component
export function CategoryPage() {
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 1000],
    location: "All",
    minRating: 1,
  });
  const [sortBy, setSortBy] = useState("newest");
  const [isListView, setIsListView] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const itemsPerPage = 6;

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = mockProducts.filter((product) => {
      const categoryMatch =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category);
      const priceMatch = product.price <= filters.priceRange[1];
      const locationMatch =
        filters.location === "All" || product.location === filters.location;
      const ratingMatch = product.rating >= filters.minRating;
      return categoryMatch && priceMatch && locationMatch && ratingMatch;
    });
    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
      default:
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }
    return filtered;
  }, [filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  return (
    <div className="category-page">
      <div className="container">
        <Breadcrumbs />
        <HeroSlider />
        <div className="content">
          <Sidebar
            filters={filters}
            setFilters={setFilters}
            isOpen={isMobileFiltersOpen}
            setIsOpen={setIsMobileFiltersOpen}
          />
          <div className="main">
            <div className="header-controls">
              <div className="controls-container">
                <div className="left-controls">
                  <button
                    onClick={() => setIsMobileFiltersOpen(true)}
                    className="filter-button"
                  >
                    <Filter />
                    <span>Filters</span>
                  </button>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <span className="product-count">
                    {filteredProducts.length} products found
                  </span>
                </div>
                <div className="view-toggle">
                  <button
                    onClick={() => setIsListView(false)}
                    className={isListView ? "inactive" : "active"}
                  >
                    <Grid />
                  </button>
                  <button
                    onClick={() => setIsListView(true)}
                    className={isListView ? "active" : "inactive"}
                  >
                    <List />
                  </button>
                </div>
              </div>
            </div>
            <div className={`products-grid ${isListView ? "list" : "grid"}`}>
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isListView={isListView}
                />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="no-products">
                <p>No products found matching your criteria.</p>
              </div>
            )}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
