import { useEffect, useState } from "react";
import { API_URL } from "../api";
import axios from "axios";
import type { Category } from "../types";

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchCategories = async () => {
      try {
        setError(null);
        setLoading(true);
        const res = await axios.get<{ data: Category[] }>(
          `${API_URL}/categories`,
          {
            signal: controller.signal,
          }
        );
        setCategories(res.data.data.slice(0, 7) as Category[]);
      } catch (error: unknown) {
        if (!axios.isCancel(error)) {
          setError(error as string);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    return () => controller.abort();
  }, []);

  return { categories, error, loading };
};

export default useCategories;
