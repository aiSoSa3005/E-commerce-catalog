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
    return products.filter((product) => (product.rating = 5));
  }
  return products;
}
