import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Box, Typography, Checkbox, Slider, Button } from "@mui/material";
import {
  AiOutlineReload,
  AiFillStar,
  AiOutlineStar,
  AiOutlineClose,
} from "react-icons/ai";
import { useSearchParams } from "react-router-dom";

const categoriesList = [
  "All Categories",
  "Category No.1",
  "Category No.2",
  "Category No.3",
];

const FilterSidebar = React.memo(({ priceMin = 5, priceMax = 200 }: any) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([priceMin, priceMax]);
  const [ratings, setRatings] = useState([]);

  // Load from query once
  useEffect(() => {
    const cats = searchParams.getAll("category");
    const min = Number(searchParams.get("priceMin")) || priceMin;
    const max = Number(searchParams.get("priceMax")) || priceMax;
    const rts = searchParams.getAll("rating").map(Number);

    setSelectedCategories(cats);
    setPriceRange([min, max]);
    setRatings(rts);
  }, []); // mount only

  // Sync state → query
  useEffect(() => {
    const params = {};
    if (selectedCategories.length) params.category = selectedCategories;
    if (priceRange[0] !== priceMin || priceRange[1] !== priceMax) {
      params.priceMin = priceRange[0];
      params.priceMax = priceRange[1];
    }
    if (ratings.length) params.rating = ratings;

    setSearchParams(params);
  }, [
    selectedCategories,
    priceRange,
    ratings,
    setSearchParams,
    priceMin,
    priceMax,
  ]);

  // Handlers wrapped with useCallback
  const handleCategoryChange = useCallback((cat) => {
    if (cat === "All Categories") {
      setSelectedCategories(["All Categories"]);
      return;
    }
    setSelectedCategories((prev) => {
      if (prev.includes("All Categories")) return [cat];
      return prev.includes(cat)
        ? prev.filter((c) => c !== cat)
        : [...prev, cat];
    });
  }, []);

  const handleRemoveCategory = useCallback(
    (cat) => setSelectedCategories((prev) => prev.filter((c) => c !== cat)),
    []
  );

  const handleRatingChange = useCallback((stars) => {
    setRatings((prev) =>
      prev.includes(stars) ? prev.filter((r) => r !== stars) : [...prev, stars]
    );
  }, []);

  const handleReset = useCallback(() => {
    setSelectedCategories([]);
    setPriceRange([priceMin, priceMax]);
    setRatings([]);
    setSearchParams({});
  }, [priceMin, priceMax, setSearchParams]);

  // Pre-calc price labels (memoized)
  const priceLabels = useMemo(
    () => [
      priceMin,
      Math.floor((priceMin + priceMax) / 4),
      Math.floor((priceMin + priceMax) / 2),
      Math.floor(((priceMin + priceMax) * 3) / 4),
      priceMax,
    ],
    [priceMin, priceMax]
  );

  return (
    <Box className="sidebar">
      {/* Header */}
      <Box className="filter-header">
        <Typography variant="subtitle1" className="filter-title">
          Filter by
        </Typography>
        <Button
          className="reset-btn"
          onClick={handleReset}
          startIcon={<AiOutlineReload />}
        >
          Reset Changes
        </Button>
      </Box>

      {/* Applied Filters */}
      <Box className="applied-filters">
        {selectedCategories.map((cat) => (
          <span key={cat} className="chip">
            {cat}
            <Button
              className="chip-remove"
              onClick={() => handleRemoveCategory(cat)}
            >
              <AiOutlineClose />
            </Button>
          </span>
        ))}

        {(priceRange[0] !== priceMin || priceRange[1] !== priceMax) && (
          <span className="chip">
            ${priceRange[0]} - ${priceRange[1]}
            <Button
              className="chip-remove"
              onClick={() => setPriceRange([priceMin, priceMax])}
            >
              <AiOutlineClose />
            </Button>
          </span>
        )}

        {ratings.map((r) => (
          <span key={r} className="chip">
            ⭐ {r}+
            <Button
              className="chip-remove"
              onClick={() => handleRatingChange(r)}
            >
              <AiOutlineClose />
            </Button>
          </span>
        ))}
      </Box>

      {/* Categories */}
      <Box className="filter-section">
        <Typography variant="subtitle2" className="section-title">
          Categories
        </Typography>
        <Box className="checkbox-group">
          {categoriesList.map((cat) => (
            <label key={cat}>
              <Checkbox
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
              />
              {cat}
            </label>
          ))}
        </Box>
      </Box>

      {/* Price Range */}
      <Box className="filter-section">
        <Typography variant="subtitle2" className="section-title">
          Price range
        </Typography>
        <Slider
          value={priceRange}
          onChange={(e, newVal) => {
            if (newVal[0] <= newVal[1]) setPriceRange(newVal);
          }}
          valueLabelDisplay="on"
          min={priceMin}
          max={priceMax}
        />
        <Box className="price-labels">
          {priceLabels.map((val, i) => (
            <span key={i}>${val}</span>
          ))}
        </Box>
      </Box>

      {/* Rating */}
      <Box className="filter-section">
        <Typography variant="subtitle2" className="section-title">
          Rating
        </Typography>
        <Box className="rating-options">
          {[5, 4, 3, 2, 1].map((stars) => (
            <label key={stars}>
              <Checkbox
                checked={ratings.includes(stars)}
                onChange={() => handleRatingChange(stars)}
              />
              {[...Array(5)].map((_, i) =>
                i < stars ? (
                  <AiFillStar key={i} className="star-icon" />
                ) : (
                  <AiOutlineStar key={i} className="star-icon" />
                )
              )}
            </label>
          ))}
        </Box>
      </Box>
    </Box>
  );
});

export default FilterSidebar;
