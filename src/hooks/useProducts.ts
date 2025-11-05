import { useEffect } from "react";
import { filterBySection, filterProducts } from "../utilities";
import useFilterStore from "../store/filterStore";
import useProductStore from "../store/productStore";

const useProducts = (query?: string, section: string = "all") => {
  // Get products from store instead of fetching
  const { products: allProducts, loading, error, brands, fetchProducts } = useProductStore();
  
  // Read filter values from the store
  const { category, price, size, brand } = useFilterStore();

  // Fetch products once when component mounts (store handles caching)
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Step 1: Filter by text query (search)
  const filteredByQuery = query
    ? allProducts.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      )
    : allProducts;

  // Step 2: Filter by section (new-arrival, trendy, popular)
  const filteredBySection = filterBySection(section, filteredByQuery);

  // Step 3: Apply store filters (category, price, size, brand)
  // This is where your filter store values are used!
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
