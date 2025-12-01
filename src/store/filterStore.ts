import { create } from "zustand";

interface FilterState {
  category: string;
  price: { min: number; max: number }[];
  size: string[];
  brand: string[];
  setCategory: (category: string) => void;
  setPrice: (price: { min: number; max: number }[]) => void;
  setSize: (size: string[]) => void;
  setBrand: (brand: string[]) => void;
  resetFilters: () => void;
}

const useFilterStore = create<FilterState>((set) => ({
  category: "all",
  price: [{ min: 0, max: Infinity }],
  size: [],
  brand: [],
  setCategory: (category: string) => {
    set({ category });
    console.log("set category in the store>>", category);
  },
  setPrice: (price: { min: number; max: number }[]) => {
    console.log("set price in the store>>", price);
    set({ price });
  },
  setSize: (size: string[]) => {
    console.log("set size in the store>>", size);
    set({ size });
  },
  setBrand: (brand: string[]) => {
    console.log("set brand in the store>>", brand);
    set({ brand });
  },
  resetFilters: () =>
    set({
      category: "all",
      price: [{ min: 0, max: Infinity }],
      size: [],
      brand: [],
    }),
}));

export default useFilterStore;
