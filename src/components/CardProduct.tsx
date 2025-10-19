import type { Product } from "../types";

interface CardProductProps {
  product: Product;
}

const CardProduct = ({ product }: CardProductProps) => {
  return (
    <div className="w-full h-full aspect-[3/4]">
      <div>
        <img
          className=" object-cover aspect-square auto"
          src={product.image}
          alt={product.title}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold font-inter">{product.title}</h3>
        <p>${product.price}</p>
      </div>
    </div>
  );
};

export default CardProduct;
