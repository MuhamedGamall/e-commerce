import { Carousel } from "../components/common/index";
import { CardsGrid, FilterSidebar, TopBar, } from "../components/ui/index";
import Box from "@mui/material/Box";

const dummyProducts = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
}));

export default function CategoryPage() {
  return (
    <Box display="flex">
      <FilterSidebar />
      <Box flex="1" padding="16px">
        <Carousel />
        <TopBar totalProducts={dummyProducts.length} categoryName="Category Name" />
        <CardsGrid products={dummyProducts} />
      </Box>
    </Box>
  );
}
