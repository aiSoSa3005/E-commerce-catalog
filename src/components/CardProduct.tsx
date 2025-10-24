import { useState } from "react";
import type { Product } from "../types";
import { AiOutlineShoppingCart } from "react-icons/ai";
interface CardProductProps {
  product: Product;
}

const CardProduct = ({ product }: CardProductProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="w-[250px] h-[350px] aspect-[3/4] flex flex-col justify-between items-center border border-gray-200 p-2">
      <div>
        <img
          className=" object-contain aspect-square auto"
          src={product.image}
          alt={product.title}
        />
      </div>
      <div className="p-4 flex flex-col gap-1">
        <h3 className="text-lg font-semibold font-inter">{product.title}</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-xs font-semibold">Price</p>
            <p className="mr-2 whitespace-nowrap text-lg font-bold text-black">
              {" "}
              ${product.price}
            </p>
          </div>
          <button
            className={`${
              isHovered
                ? "bg-blue-500 border-blue-500"
                : "bg-white border-blue-300"
            } border-3 border-blue-300 text-white overflow-hidden align-center px-2 py-2 max-w-[50px] hover:max-w-[120px] transition-all duration-300 flex items-center gap-2 whitespace-nowrap`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AiOutlineShoppingCart
              color={isHovered ? "white" : "dodgerblue"}
              size={16}
            />
            <p
              className={`text-white ${isHovered ? "block" : "hidden"} text-xs`}
            >
              Add to Cart
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
