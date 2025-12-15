import { create } from "zustand";
import type { Product } from "../types";

interface CartStore {
  cartProducts: Product[];
  addCartProduct: (p: Product) => void;
}

const useCartStore = create<CartStore>((set, get) => ({
  cartProducts: [],
  addCartProduct: (p: Product) => {
    const updatedcartProducts = [...get().cartProducts, p];
    set({ cartProducts: updatedcartProducts });
  },
}));

export default useCartStore;
