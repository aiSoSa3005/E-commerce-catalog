import CardProduct from "./CardProduct";
import useProducts from "../hooks/useProducts";
interface ProductListProps {
  query: string;
  section: string;
}

const ProductList = ({ query, section }: ProductListProps) => {
  const { products, loading, error } = useProducts(query, section);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (products.length === 0) return <div>No products found</div>;

  return (
    <>
      <div className="grid grid-cols-3 grid-rows-auto gap-4 p-4">
        {products.map((product, index) => (
          <CardProduct key={index} product={product} />
        ))}
        {/*  <CardProduct product={products[0]} /> */}
      </div>
    </>
  );
};

export default ProductList;
