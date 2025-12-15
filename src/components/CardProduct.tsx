import { useState } from "react";
import type { Product } from "../types";
import { AiOutlineShoppingCart } from "react-icons/ai";
interface CardProductProps {
  product: Product;
  OnImgClick: () => void;
  onCartClick: (id: number) => void;
}

const CardProduct = ({
  product,
  OnImgClick,
  onCartClick,
}: CardProductProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="aspect-[3/4] flex flex-col justify-between items-center border border-gray-200 p">
      <div>
        <img
          onClick={OnImgClick}
          className=" object-contain aspect-square auto"
          src={product.image}
          alt={product.title}
          loading="lazy"
        />
      </div>
      <div className="p-2 flex flex-col gap-1 w-[200px]">
        <h3 className="text-lg font-semibold font-inter text-center whitespace-nowrap">
          {product.title}
        </h3>
        <div className="flex items-center justify-between">
          <div className="">
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
              onClick={() => {
                onCartClick(product._id);
              }}
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
