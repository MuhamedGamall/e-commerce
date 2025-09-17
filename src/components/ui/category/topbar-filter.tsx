import React, { useEffect, useState, useCallback } from "react";
import { Box, Select, MenuItem, Typography, IconButton } from "@mui/material";
import { AiOutlineUnorderedList, AiOutlineAppstore } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";

const sortOptions = [
  { value: "default", label: "Sort by" },
  { value: "priceLowHigh", label: "Price: Low to High" },
  { value: "priceHighLow", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rating" },
];

const TopbarFilter = ({ totalProducts = 0, categoryName = "Category" }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [sort, setSort] = useState("default");
  const [view, setView] = useState("grid");

  useEffect(() => {
    const s = searchParams.get("sort") || "default";
    const v = searchParams.get("view") || "grid";
    setSort(s);
    setView(v);
  }, []);

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    params.sort = sort;
    params.view = view;
    setSearchParams(params);
  }, [sort, view, setSearchParams]);

  const handleSortChange = useCallback((value) => {
    setSort(value);
  }, []);

  const handleViewChange = useCallback((value) => {
    setView(value);
  }, []);

  return (
    <Box className="top-bar">
      <Select
        value={sort}
        onChange={(e) => handleSortChange(e.target.value)}
        className="sort-select"
      >
        {sortOptions.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>

      <Box className="view-toggle">
        <Typography variant="body2" className="products-info">
          {totalProducts} Products for <strong>"{categoryName}"</strong>
        </Typography>
        <IconButton
          className={`toggle-btn ${view === "list" ? "active" : ""}`}
          onClick={() => handleViewChange("list")}
        >
          <AiOutlineUnorderedList />
        </IconButton>
        <IconButton
          className={`toggle-btn ${view === "grid" ? "active" : ""}`}
          onClick={() => handleViewChange("grid")}
        >
          <AiOutlineAppstore />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TopbarFilter;
