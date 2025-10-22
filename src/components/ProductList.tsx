import useProducts from "../hooks/useProducts";
import CardProduct from "./CardProduct";

interface ProductListProps {
  query: string;
}

const ProductList = ({ query }: ProductListProps) => {
  const { products, loading, error } = useProducts(query);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (products.length === 0) return <div>No products found</div>;

  return (
    <>
      <div className="grid grid-cols-3 grid-rows-auto gap-4 p-4">
        {products.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
        {/*  <CardProduct product={products[0]} /> */}
      </div>
    </>
  );
};

export default ProductList;
