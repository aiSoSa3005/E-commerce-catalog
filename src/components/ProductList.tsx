import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import CardProduct from "./CardProduct";

interface ProductListProps {
  query: string;
  section: string;
}

const PAGE_SIZE = 6;

const ProductList = ({ query, section }: ProductListProps) => {
  const navigate = useNavigate();
  const { products, loading, error } = useProducts(query, section);
  const [page, setPage] = useState(1);

  const visibleProducts = useMemo(() => {
    return products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  }, [products, page]);

  const hasMore = useMemo(
    () => visibleProducts.length < products.length,
    [visibleProducts, products]
  );

  const numberOfPages = Math.ceil(products.length / PAGE_SIZE);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (products.length === 0)
    return (
      <div className="text-center text-2xl font-bold">No products found</div>
    );

  return (
    <div className="flex flex-col gap-6 h-[800px] relative">
      <div className="grid grid-cols-3 grid-rows-2 gap-4 p-4">
        {visibleProducts.map((product) => (
          <CardProduct
            key={product._id}
            product={product}
            onClick={() => {
              navigate(`/product/${product._id}`);
            }}
          />
        ))}
      </div>

      <div className="flex justify-center items-center absolute bottom-0 left-0 right-0">
        {Array.from({ length: numberOfPages }, (_, index) => index + 1).map(
          (p) => (
            <button
              key={p}
              className={`${
                p === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-500"
              } px-4 py-2 rounded-md m-1`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ProductList;
