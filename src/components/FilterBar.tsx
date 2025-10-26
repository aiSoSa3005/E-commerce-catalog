import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import useCategories from "../hooks/useCategories";

const FilterBar = () => {
  const { categories, error, loading } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [showRanges, setShowRanges] = useState<boolean>(true);
  const allCategories = [
    { _id: 0, name: "All", description: "All categories" },
    ...categories,
  ];
  const ranges = [
    { label: "0-100" },
    { label: "100-200" },
    { label: "200-300" },
    { label: "300-400" },
    { label: "over 400" },
  ];
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
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
          showRanges ? "max-h-[200px]" : "max-h-10 overflow-hidden"
        } transition-all duration-300`}
      >
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
    </div>
  );
};

export default FilterBar;
