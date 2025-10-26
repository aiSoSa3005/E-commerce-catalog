import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import useCategories from "../hooks/useCategories";
import { getBrands } from "../utilities";
import useProducts from "../hooks/useProducts";

const FilterBar = () => {
  const { categories, error, loading } = useCategories();
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [showRanges, setShowRanges] = useState<boolean>(true);
  const [showSizes, setShowSizes] = useState<boolean>(true);
  const [showBrands, setShowBrands] = useState<boolean>(true);
  const allCategories = [
    { _id: 0, name: "All", description: "All categories" },
    ...categories,
  ];
  const brands: string[] = getBrands(products);
  const ranges = [
    { label: "0-100" },
    { label: "100-200" },
    { label: "200-300" },
    { label: "300-400" },
    { label: "over 400" },
  ];
  const sizes = [
    { label: "S" },
    { label: "M" },
    { label: "L" },
    { label: "XL" },
    { label: "XXL" },
  ];
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* Category Filter */}
      <h1 className="text-xl font-semibold p-4">Category</h1>
      <ul className="p-2">
        {allCategories.map((category, index) => (
          <li
            key={index}
            className={`cursor-pointer p-2 text-lg pl-4 ${
              selectedCategory === category._id
                ? "text-black font-medium "
                : "text-gray-500"
            }`}
            onClick={() => setSelectedCategory(category._id)}
          >
            {category.name}
          </li>
        ))}
      </ul>

      <h1 className="text-xl font-semibold p-4">Filter by:</h1>
      <div
        className={`relative ${
          showRanges ? "max-h-[270px]" : "max-h-10 overflow-hidden"
        } transition-all duration-300 border-b border-gray-200`}
      >
        {/* Price Filter */}
        <h2 className="text-lg font-medium p-4 pt-0">Price</h2>
        <div className="pl-2 ">
          {showRanges ? (
            <IoIosArrowUp
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setShowRanges(false)}
            />
          ) : (
            <IoIosArrowDown
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setShowRanges(true)}
            />
          )}
          {ranges.map((range, index) => (
            <div
              key={index}
              className="flex items-center text-gray-500 gap-2 p-2"
            >
              <input className="w-6 h-6" type="checkbox" id={range.label} />
              <span className="text-lg">${range.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`border-b border-gray-200 relative ${
          showSizes ? "max-h-[270px]" : "max-h-10 overflow-hidden"
        } transition-all duration-300`}
      >
        {/* Size Filter */}
        <h2 className={`text-lg font-medium p-4 pt-0`}>Size</h2>
        <div className="pl-2 ">
          {showSizes ? (
            <IoIosArrowUp
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setShowSizes(false)}
            />
          ) : (
            <IoIosArrowDown
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setShowSizes(true)}
            />
          )}
          {sizes.map((size, index) => (
            <div
              key={index}
              className="flex items-center text-gray-500 gap-2 p-2"
            >
              <input className="w-6 h-6" type="checkbox" id={size.label} />
              <span className="text-lg">{size.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`border-b border-gray-200 relative ${
          showBrands ? "max-h-[490px]" : "max-h-10 overflow-hidden"
        } transition-all duration-300`}
      >
        {showBrands ? (
          <IoIosArrowUp
            className="absolute top-2 right-2 text-gray-500"
            onClick={() => setShowBrands(false)}
          />
        ) : (
          <IoIosArrowDown
            className="absolute top-2 right-2 text-gray-500"
            onClick={() => setShowBrands(true)}
          />
        )}
        {/* Brand Filter */}
        <h2 className="text-lg font-medium p-4 pt-0">Brand</h2>
        <div className="pl-2 ">
          {brands.map((brand: string, index: number) => (
            <div
              key={index}
              className="flex items-center text-gray-500 gap-2 p-2"
            >
              <input className="w-6 h-6" type="checkbox" id={brand} />
              <span className="text-lg">{brand}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Apply Filters Button */}
      <div className="flex items-center gap-2 p-4 justify-between">
        <button className="bg-blue-500 text-white px-4 py-2 flex items-center gap-2 cursor-pointer">
          Apply Filters
        </button>
        <div className="cursor-pointer bg-gray-100 border border-gray-300 p-2">
          <RiDeleteBin6Line
            size={18}
            className="text-2xl cursor-pointer"
            color="gray"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
