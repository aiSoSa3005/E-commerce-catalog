import { SiTekton } from "react-icons/si";
import { CiBellOn } from "react-icons/ci";
import { TfiEmail } from "react-icons/tfi";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import InputSearch from "../components/InputSearch";
import ProductList from "../components/ProductList";
import SectionBar from "../components/SectionBar";
import { useState } from "react";

const Catalog = () => {
  const [query, setQuery] = useState("");
  const [section, setSection] = useState("all");
  const dictSection = {
    all: {
      title: "All Products",
      description: "Shop all products",
    },
    "new-arrival": {
      title: "New Arrival",
      description: "Stop into the Style- Fresh Kicks & Fresh Looks",
    },
    trendy: {
      title: "Trendy",
      description: "Newest in streetwear, sneakers, and accessories",
    },
    popular: {
      title: "Popular",
      description: "Shop the most popular styles",
    },
  };
  return (
    <div className="grid h-screen w-screen lg:grid-cols-[2fr_5fr_3fr] grid-rows-[auto_1fr]">
      <div className="bg-white relative font-inter border border-gray-200 text-xl font-semibold flex items-center gap-2 p-2">
        <span>
          <SiTekton className="w-10 h-10" />
        </span>
        <h1 className="text-2xl font-semibold ">HIRONAGHLE</h1>
        <div className="absolute right-0 top-4 w-7 h-7 bg-white border-b border-t border-l border-gray-300 flex items-center justify-center">
          <MdKeyboardDoubleArrowLeft />
        </div>
      </div>
      <nav className="bg-white col-span-2 border border-gray-200 w-full flex items-center gap-2 p-2">
        <div className="flex-2">
          <InputSearch
            onSearch={(query) => {
              setQuery(query);
              console.log(query);
            }}
          />
        </div>
        <div className="w-full flex items-center gap-2 flex-1">
          <div className="w-10 h-10 bg-white border border-gray-300 flex items-center justify-center">
            <CiBellOn size={20} color="gray" />
          </div>
          <div className="w-10 h-10 bg-white border border-gray-300 flex items-center justify-center">
            <TfiEmail size={20} color="gray" />
          </div>
        </div>
      </nav>
      <div className="bg-white grid grid-cols-[1fr_3fr]">
        <div className="bg-white border border-gray-200">NAVBAR LEFT</div>
        <div className="bg-white">FILTERS CATEGORY</div>
      </div>
      <div className="bg-white border border-gray-200 p-2 ">
        <SectionBar onSectionChange={(section) => setSection(section)} />
        <h1 className="text-2xl font-semibold mt-4 ml-4">
          {dictSection[section as keyof typeof dictSection].title}
        </h1>
        <p className="text-gray-500 mt-2 ml-4">
          {dictSection[section as keyof typeof dictSection].description}
        </p>
        <ProductList query={query} section={section} />
      </div>
      <div className="bg-white">DETAILS PRODUCT</div>
    </div>
  );
};

export default Catalog;
