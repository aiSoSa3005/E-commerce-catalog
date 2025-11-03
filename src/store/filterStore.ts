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
  price: [], // Empty array means no price filter (show all)
  size: [],
  brand: [],
  setCategory: (category: string) => set({ category }),
  setPrice: (price: { min: number; max: number }[]) => set({ price }),
  setSize: (size: string[]) => set({ size }),
  setBrand: (brand: string[]) => set({ brand }),
  resetFilters: () =>
    set({
      category: "all",
      price: [],
      size: [],
      brand: [],
    }),
}));

export default useFilterStore;
