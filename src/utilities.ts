import { API_URL } from "./api";
import axios from "axios";
import type { Product } from "./types";

export function filterBySection(
  section: string,
  products: Product[]
): Product[] {
  if (!section) return products;
  if (section === "new-arrival") {
    return products.filter((product) => product.isNew === true);
  }
  if (section === "trendy") {
    return products.filter((product) => product.rating >= 4);
  }
  if (section === "popular") {
    return products.filter((product) => product.rating === 5);
  }
  return products;
}

export function filterProducts(
  products: Product[],
  category: string = "all",
  price: { min: number; max: number } = { min: 0, max: Infinity },
  size: string[] = [],
  brand: string = ""
): Product[] {
  return products.filter((product) => {
    return (
      (category === "all" || product.category === category) &&
      ((price.min === 0 && price.max === Infinity) ||
        (product.price >= price.min && product.price <= price.max)) &&
      (size.length === 0 || size.some((s) => product.size.includes(s))) &&
      (brand === "" ||
        product.brand.toLowerCase().includes(brand.toLowerCase()))
    );
  });
}

export async function getCategories() {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export function getBrands(products: Product[]) {
  const brands = products.map((product) => product.brand).slice(0, 10);
  return [...new Set(brands)];
}
