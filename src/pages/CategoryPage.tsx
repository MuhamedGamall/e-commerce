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

// Components
const Breadcrumbs = () => (
  <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
    <span>Home</span>
    <ChevronRight className="w-4 h-4" />
    <span>Category</span>
    <ChevronRight className="w-4 h-4" />
    <span className="text-gray-900 font-medium">Products</span>
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
    <div className="relative mb-8 overflow-hidden rounded-lg bg-gray-900">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {heroSlides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0 relative">
            <div className="h-64 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                <p className="text-xl opacity-90">{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-4 h-4 ${
          star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ))}
  </div>
);

const ProductCard = ({
  product,
  isListView,
}: {
  product: Product;
  isListView: boolean;
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  if (isListView) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex items-center space-x-4">
        <div className="relative flex-shrink-0">
          <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="w-16 h-16 bg-gray-300 rounded"></div>
          </div>
          {product.isNew && (
            <span className="absolute -top-2 -left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              New
            </span>
          )}
        </div>

        <div className="flex-grow">
          <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{product.description}</p>
          <StarRating rating={product.rating} />
        </div>

        <div className="flex flex-col items-end space-y-2">
          <span className="text-2xl font-bold text-blue-600">
            ${product.price}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-full transition-colors ${
                isFavorite
                  ? "bg-red-100 text-red-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Heart
                className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`}
              />
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <div className="h-48 bg-gray-200 flex items-center justify-center">
          <div className="w-32 h-32 bg-gray-300 rounded-lg"></div>
        </div>
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            New
          </span>
        )}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
            isFavorite
              ? "bg-red-100 text-red-600"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        <div className="flex items-center justify-between mb-3">
          <StarRating rating={product.rating} />
          <span className="text-xl font-bold text-blue-600">
            ${product.price}
          </span>
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
          <ShoppingCart className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

const Sidebar = ({
  filters,
  setFilters,
  isOpen,
  setIsOpen,
}: {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
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

  const handleCategoryChange = (category: string, checked: boolean) => {
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
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Filters</h3>

      {/* Categories */}
      <div>
        <h4 className="font-medium mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={(e) =>
                  handleCategoryChange(category, e.target.checked)
                }
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="space-y-3">
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
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>$0</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Location */}
      <div>
        <h4 className="font-medium mb-3">Location</h4>
        <select
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      {/* Rating */}
      <div>
        <h4 className="font-medium mb-3">Minimum Rating</h4>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center space-x-2">
              <input
                type="radio"
                name="rating"
                checked={filters.minRating === rating}
                onChange={() => setFilters({ ...filters, minRating: rating })}
                className="text-blue-600 focus:ring-blue-500"
              />
              <StarRating rating={rating} />
              <span className="text-sm">& up</span>
            </label>
          ))}
        </div>
      </div>

      {/* Map Placeholder */}
      <div>
        <h4 className="font-medium mb-3">Location Map</h4>
        <div className="h-32 bg-blue-100 rounded-lg flex items-center justify-center">
          <span className="text-blue-600 text-sm">Map View</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-white rounded-lg shadow-md p-6 h-fit sticky top-4">
        {sidebarContent}
      </div>

      {/* Mobile Filter Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-white w-80 max-w-sm h-full overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const [goToPage, setGoToPage] = useState("");

  const handleGoToPage = () => {
    const page = parseInt(goToPage);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      setGoToPage("");
    }
  };

  return (
    <div className="flex items-center justify-between mt-8">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Previous
        </button>

        <div className="flex items-center space-x-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-3 py-2 rounded-lg ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "border border-gray-300 hover:bg-gray-50"
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
          className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Next
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Go to page:</span>
        <input
          type="number"
          min="1"
          max={totalPages}
          value={goToPage}
          onChange={(e) => setGoToPage(e.target.value)}
          className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
        />
        <button
          onClick={handleGoToPage}
          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          Go
        </button>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-white mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-gray-300 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Contact Us</li>
            <li>FAQ</li>
            <li>Shipping Info</li>
            <li>Returns</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Careers</li>
            <li>Press</li>
            <li>Investors</li>
            <li>Terms of Service</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Newsletter</li>
            <li>Social Media</li>
            <li>Blog</li>
            <li>Community</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
        <p>&copy; 2025 Your Company Name. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

// Main Component
export function CategoryPage() {
  const [filters, setFilters] = useState<Filters>({
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />
        <HeroSlider />

        <div className="flex gap-6">
          <Sidebar
            filters={filters}
            setFilters={setFilters}
            isOpen={isMobileFiltersOpen}
            setIsOpen={setIsMobileFiltersOpen}
          />

          <div className="flex-1">
            {/* Header Controls */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsMobileFiltersOpen(true)}
                    className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Filter className="w-4 h-4" />
                    <span>Filters</span>
                  </button>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>

                  <span className="text-sm text-gray-600">
                    {filteredProducts.length} products found
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsListView(false)}
                    className={`p-2 rounded-lg ${
                      !isListView
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsListView(true)}
                    className={`p-2 rounded-lg ${
                      isListView
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={`${
                isListView
                  ? "space-y-4"
                  : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              } transition-all duration-300`}
            >
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isListView={isListView}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No products found matching your criteria.
                </p>
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
