import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import useCategories from "../hooks/useCategories";
import useFilterStore from "../store/filterStore";
import useProductStore from "../store/productStore";

const FilterBar = () => {
  const { categories, error, loading } = useCategories();
  const brands = useProductStore((state) => state.brands);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showRanges, setShowRanges] = useState<boolean>(false);
  const [showSizes, setShowSizes] = useState<boolean>(false);
  const [showBrands, setShowBrands] = useState<boolean>(false);

  // State to track which checkboxes are checked
  // We use arrays because multiple items can be selected
  const [checkedPrices, setCheckedPrices] = useState<string[]>([]);
  const [checkedSizes, setCheckedSizes] = useState<string[]>([]);
  const [checkedBrands, setCheckedBrands] = useState<string[]>([]);

  const setCategory = useFilterStore((state) => state.setCategory);
  const setPrice = useFilterStore((state) => state.setPrice);
  const setSize = useFilterStore((state) => state.setSize);
  const setBrand = useFilterStore((state) => state.setBrand);
  const resetFilters = useFilterStore((state) => state.resetFilters);

  const allCategories = [
    { _id: 0, name: "All", description: "All categories" },
    ...categories,
  ];

  const ranges = [
    { label: "0-100", min: 0, max: 100 },
    { label: "100-200", min: 100, max: 200 },
    { label: "200-300", min: 200, max: 300 },
    { label: "300-400", min: 300, max: 400 },
    { label: "over 400", min: 400, max: 100000 },
  ];

  const sizes = [
    { label: "S", size: "S" },
    { label: "M", size: "M" },
    { label: "L", size: "L" },
    { label: "XL", size: "XL" },
    { label: "XXL", size: "XXL" },
  ];

  // Helper function to toggle an item in an array
  // If item exists, remove it; if not, add it
  const toggleArrayItem = (array: string[], item: string): string[] => {
    if (array.includes(item)) {
      // Remove item if it's already in the array
      return array.filter((i) => i !== item);
    } else {
      // Add item if it's not in the array
      return [...array, item];
    }
  };

  // Handler for price checkbox changes
  const handlePriceChange = (rangeLabel: string) => {
    setCheckedPrices((prev) => toggleArrayItem(prev, rangeLabel));
  };

  // Handler for size checkbox changes
  const handleSizeChange = (size: string) => {
    setCheckedSizes((prev) => toggleArrayItem(prev, size));
  };

  // Handler for brand checkbox changes
  const handleBrandChange = (brand: string) => {
    setCheckedBrands((prev) => toggleArrayItem(prev, brand));
  };

  // Function to apply filters to the store
  const handleApplyFilters = () => {
    // Convert checked price labels to price range objects
    const priceRanges = ranges
      .filter((range) => checkedPrices.includes(range.label))
      .map((range) => ({ min: range.min, max: range.max }));

    // Update the store with all checked filters
    setPrice(priceRanges);
    setSize(checkedSizes);
    setBrand(checkedBrands);
  };

  // Function to reset all filters
  const handleResetFilters = () => {
    // Clear local state
    setCheckedPrices([]);
    setCheckedSizes([]);
    setCheckedBrands([]);
    setSelectedCategory("all");

    // Clear store
    resetFilters();
  };

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
              selectedCategory === category.name
                ? "text-black font-medium "
                : "text-gray-500"
            }`}
            onClick={() => {
              setSelectedCategory(category.name);
              setCategory(category.name);
            }}
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
              <input
                className="w-6 h-6"
                type="checkbox"
                id={range.label}
                // Controlled checkbox: checked state comes from our state
                checked={checkedPrices.includes(range.label)}
                // When checkbox changes, update our state
                onChange={() => handlePriceChange(range.label)}
              />
              <label htmlFor={range.label} className="text-lg cursor-pointer">
                ${range.label}
              </label>
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
              <input
                className="w-6 h-6"
                type="checkbox"
                id={size.label}
                // Controlled checkbox: checked state comes from our state
                checked={checkedSizes.includes(size.size)}
                // When checkbox changes, update our state
                onChange={() => handleSizeChange(size.size)}
              />
              <label htmlFor={size.label} className="text-lg cursor-pointer">
                {size.label}
              </label>
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
              <input
                className="w-6 h-6"
                type="checkbox"
                id={brand}
                // Controlled checkbox: checked state comes from our state
                checked={checkedBrands.includes(brand)}
                // When checkbox changes, update our state
                onChange={() => handleBrandChange(brand)}
              />
              <label htmlFor={brand} className="text-lg cursor-pointer">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>
      {/* Apply Filters Button */}
      <div className="flex items-center gap-2 p-4 justify-between">
        <button
          className="bg-blue-500 text-white px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-blue-600 transition-colors"
          onClick={handleApplyFilters}
        >
          Apply Filters
        </button>
        <div
          className="cursor-pointer bg-gray-100 border border-gray-300 p-2 hover:bg-gray-200 transition-colors"
          onClick={handleResetFilters}
          title="Reset all filters"
        >
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
