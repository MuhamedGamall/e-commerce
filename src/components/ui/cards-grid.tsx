import React from "react";
import Box from "@mui/material/Box";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../common/ProductCard";

interface CardsGridProps {
  products: { id: number; name: string }[];
}

const CardsGrid: React.FC<CardsGridProps> = ({ products }) => {
  const [searchParams] = useSearchParams();
  const view = (searchParams.get("view") as "grid" | "list") || "grid";

  return (
    <Box className={`cards-grid ${view}`}>
      {products.map((product) => (
        <ProductCard key={product.id} view={view} />
      ))}
    </Box>
  );
};

export default CardsGrid;
