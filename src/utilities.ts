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
  // Now accepts array of price ranges (multiple ranges can be selected)
  priceRanges: { min: number; max: number }[] = [],
  size: string[] = [],
  // Now accepts array of brands (multiple brands can be selected)
  brands: string[] = []
): Product[] {
  return products.filter((product) => {
    // 1. Category filter: "all" means show all, otherwise match exact category
    const categoryMatch = category === "all" || product.category === category;

    // 2. Price filter: If no ranges selected, show all products
    // Otherwise, product price must fall within at least one selected range
    const priceMatch =
      priceRanges.length === 0 ||
      priceRanges.some(
        (range) => product.price >= range.min && product.price <= range.max
      );

    // 3. Size filter: If no sizes selected, show all products
    // Otherwise, product must have at least one of the selected sizes
    const sizeMatch =
      size.length === 0 || size.some((s) => product.size.includes(s));

    // 4. Brand filter: If no brands selected, show all products
    // Otherwise, product brand must match one of the selected brands (case-insensitive)
    const brandMatch =
      brands.length === 0 ||
      brands.some((b) => product.brand.toLowerCase().includes(b.toLowerCase()));

    // Product must match ALL filters (AND logic)
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
