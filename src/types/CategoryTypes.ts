// Types
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  location: string;
  isNew: boolean;
}

export interface Filters {
  categories: string[];
  priceRange: [number, number];
  location: string;
  minRating: number;
}
