import { useState } from "react";
import useCategories from "../hooks/useCategories";
import type { Category } from "../types";
import { all } from "axios";

const FilterBar = () => {
  const { categories, error, loading } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const allCategories = [
    { _id: 0, name: "All", description: "All categories" },
    ...categories,
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
    </div>
  );
};

export default FilterBar;
