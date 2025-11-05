import CardProduct from "./CardProduct";
import useProducts from "../hooks/useProducts";
import { useNavigate } from "react-router-dom";
interface ProductListProps {
  query: string;
  section: string;
}

const ProductList = ({ query, section }: ProductListProps) => {
  const navigate = useNavigate();
  const { products, loading, error } = useProducts(query, section);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (products.length === 0)
    return (
      <div className="text-center text-2xl font-bold">No products found</div>
    );

  return (
    <>
      <div className="grid grid-cols-3 grid-rows-auto gap-4 p-4">
        {products.map((product, index) => (
          <CardProduct
            key={index}
            product={product}
            onClick={() => {
              navigate(`/product/${product._id}`);
            }}
          />
        ))}
      </div>
    </>
  );
};

export default ProductList;
