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

export async function getCategories() {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
