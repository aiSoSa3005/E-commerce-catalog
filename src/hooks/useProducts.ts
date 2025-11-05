import { useEffect } from "react";
import { filterBySection, filterProducts } from "../utilities";
import useFilterStore from "../store/filterStore";
import useProductStore from "../store/productStore";

const useProducts = (query?: string, section: string = "all") => {
  const {
    products: allProducts,
    loading,
    error,
    brands,
    fetchProducts,
  } = useProductStore();

  const { category, price, size, brand } = useFilterStore();

  // Fetch products once when component mounts (store handles caching)
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Step 1: Filter by text query
  const filteredByQuery = query
    ? allProducts.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      )
    : allProducts;

  // Step 2: Filter by section (new-arrival, trendy, popular)
  const filteredBySection = filterBySection(section, filteredByQuery);

  // Step 3: Apply store filters (category, price, size, brand)

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
