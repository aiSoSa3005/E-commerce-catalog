export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  size: string[];
  brand: string;
  isNew: boolean;
  rating: number;
}

export interface Category {
  id: number;
  name: string;
}
