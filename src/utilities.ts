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

  priceRanges: { min: number; max: number }[] = [],
  size: string[] = [],

  brands: string[] = []
): Product[] {
  return products.filter((product) => {
    const categoryMatch = category === "all" || product.category === category;

    const priceMatch =
      priceRanges.length === 0 ||
      priceRanges.some(
        (range) => product.price >= range.min && product.price <= range.max
      );

    const sizeMatch =
      size.length === 0 || size.some((s) => product.size.includes(s));

    const brandMatch =
      brands.length === 0 ||
      brands.some((b) => product.brand.toLowerCase().includes(b.toLowerCase()));

    return categoryMatch && priceMatch && sizeMatch && brandMatch;
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
