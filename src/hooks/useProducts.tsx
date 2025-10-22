import type { Product } from "../types";
import { API_URL } from "../api";
import { useState, useEffect } from "react";

import axios from "axios";

const useProducts = (query: string) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      } catch (error: unknown) {
        if (!axios.isCancel(error)) {
          setError(error as string);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, []);

  // Filter products based on query
  const products = query
    ? allProducts.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      )
    : allProducts;

  return { products, loading, error };
};

export default useProducts;
