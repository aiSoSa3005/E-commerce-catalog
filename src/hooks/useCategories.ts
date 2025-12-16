import { useEffect, useState } from "react";
import { API_URL } from "../api";
import axios from "axios";
import type { Category } from "../types";

let cachedCategories: Category[] | null = null;

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>(
    cachedCategories ?? []
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(!cachedCategories);

  useEffect(() => {
    if (cachedCategories) return;

    console.log("IN Cat");
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
        const data = res.data.data.slice(0, 7);
        cachedCategories = data;
        setCategories(data);
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
