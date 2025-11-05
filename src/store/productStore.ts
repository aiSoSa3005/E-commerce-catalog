import { create } from "zustand";
import type { Product } from "../types";
import { API_URL } from "../api";
import axios from "axios";
import { getBrands } from "../utilities";

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  brands: string[];

  // Actions
  fetchProducts: () => Promise<void>;
  getProductById: (id: string | number) => Product | undefined;
  resetProducts: () => void;
}

const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  brands: [],

  fetchProducts: async () => {
    if (get().products.length > 0) {
      return;
    }

    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/products`);
      const products = res.data.data;
      const brands = getBrands(products);

      set({
        products,
        brands,
        loading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch products",
        loading: false,
      });
    }
  },

  getProductById: (id: string | number) => {
    return get().products.find(
      (product) =>
        product._id === Number(id) || product._id.toString() === id.toString()
    );
  },

  resetProducts: () => {
    set({ products: [], brands: [], error: null, loading: false });
  },
}));

export default useProductStore;
