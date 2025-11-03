import type { Product } from "../types";
import { API_URL } from "../api";
import { useState, useEffect } from "react";

import axios from "axios";
import { filterBySection, filterProducts, getBrands } from "../utilities";
import useFilterStore from "../store/filterStore";

const useProducts = (query?: string, section: string = "all") => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [brands, setBrands] = useState<string[]>([]);

  // Read filter values from the store
  // This hook will re-run whenever these values change
  const { category, price, size, brand } = useFilterStore();

  // Fetch all products once
  useEffect(() => {
    const controller = new AbortController();
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`${API_URL}/products`, {
          signal: controller.signal,
        });
        setAllProducts(res.data.data);
        const brands = getBrands(res.data.data);
        setBrands(brands);
      } catch (error: unknown) {
        if (!axios.isCancel(error)) {
          setError(
            error instanceof Error ? error.message : "An error occurred"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, []);

  // Step 1: Filter by text query (search)
  const filteredByQuery = query
    ? allProducts.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      )
    : allProducts;

  // Step 2: Filter by section (new-arrival, trendy, popular)
  const filteredBySection = filterBySection(section, filteredByQuery);

  // Step 3: Apply store filters (category, price, size, brand)
  // This is where your filter store values are used!
  const products = filterProducts(
    filteredBySection,
    category, // from store
    price, // array of price ranges from store
    size, // array of sizes from store
    brand // array of brands from store
  );

  return {
    products,
    loading,
    error,
    brands,
  };
};

export default useProducts;
