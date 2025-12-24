import { create } from "zustand";
import type { Product } from "../types";

interface CartStore {
  cartProducts: Product[];
  addCartProduct: (p: Product) => void;
  removeCartProdcut: (id: number) => void;
}

const useCartStore = create<CartStore>((set, get) => ({
  cartProducts: [],
  addCartProduct: (p: Product) => {
    const updatedcartProducts = [...get().cartProducts, p];
    const isDuplicate = get().cartProducts.some((cp) => cp._id === p._id);
    if (!isDuplicate) set({ cartProducts: updatedcartProducts });
  },
  removeCartProdcut: (id: number) => {
    const updatedcartProducts = get().cartProducts.filter((p) => p._id != id);
    set({ cartProducts: updatedcartProducts });
  },
}));

export default useCartStore;
