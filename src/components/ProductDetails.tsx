import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useProductStore from "../store/productStore";

const ProductDetails = () => {
  const { id } = useParams();
  const { getProductById, fetchProducts, loading } = useProductStore();

  // Fetch products if not already loaded
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const product = id ? getProductById(id) : undefined;

  if (loading) {
    return <div>Loading product...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>Product Details: {product.title}</h1>
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
      <img src={product.image} alt={product.title} />
    </div>
  );
};

export default ProductDetails;
