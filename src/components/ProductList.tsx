import useProducts from "../hooks/useProducts";

const ProductList = () => {
  const { products, loading, error } = useProducts();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (products.length === 0) return <div>No products found</div>;

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id}>
            <img
              className="w-full h-full object-cover"
              src={product.image}
              alt={product.title}
            />
            <h3>{product.title}</h3>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;
