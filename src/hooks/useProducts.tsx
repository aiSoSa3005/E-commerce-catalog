import type { Product } from "../types";
import { API_URL } from "../api";
import { useState, useEffect } from "react";

import axios from "axios";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/products`, {
          signal: controller.signal,
        });
        setProducts(res.data.data);
        setLoading(false);
      } catch (error: unknown) {
        if (!axios.isCancel(error)) setError(error as string);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
    return () => controller.abort();
  }, []);

  return { products, loading, error };
};

export default useProducts;
