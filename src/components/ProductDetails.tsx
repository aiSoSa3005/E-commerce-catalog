import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useProductStore from "../store/productStore";
import { IoCartOutline, IoHeartOutline } from "react-icons/io5";

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
    <div className="flex flex-col p-4 items-center justify-center  gap-4">
      <div className="flex flex-col items-start gap-2 w-full">
        <h1 className=" text-xl text-left font-semibold text-black uppercase">
          Detail Product
        </h1>
        <p className="text-left text-sm font-semibold text-[#8a8a8a] uppercase">
          {product.category}
        </p>
      </div>
      <img
        className="object-cover w-full h-[500px]"
        src={product.image}
        alt={product.title}
      />
      <div className="flex flex-col items-start gap-2 w-full">
        <h1 className="text-black text-2xl font-semibold">{product.title}</h1>
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-row items-center gap-2">
            <button className="bg-white border border-blue-500 text-blue-500 px-4 py-2 ">
              {product.brand}
            </button>
            <button className="bg-white border border-blue-500 text-blue-500 px-4 py-2 ">
              {product.rating}/5
            </button>
          </div>
          <div>
            <p className="text-black text-2xl font-semibold">
              ${product.price}
            </p>
          </div>
        </div>
        <div>
          <p className="text-black text-sm font-semibold">Size</p>
          {product.size.map((s) => (
            <button
              key={s}
              className="bg-white border border-blue-500 text-blue-500 px-4 py-2 mr-5 mt-1"
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex flex-row items-center justify-between w-full gap-2 mt-4">
          <button className="flex cursor-pointer flex-1 bg-blue-500 text-white px-4 py-2 flex-row items-center gap-2">
            Add to cart <IoCartOutline size={20} />
          </button>
          <button className="flex cursor-pointer flex-1 bg-white text-blue-500 border border-blue-500 px-4 py-2 flex-row items-center gap-2">
            Add to wishlist <IoHeartOutline size={20} />
          </button>
        </div>
        <div>
          <p className="text-black text-xl font-semibold">Description</p>
          <p className="text-gray-500 text-sm font-semibold">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
