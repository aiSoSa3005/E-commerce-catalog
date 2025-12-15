import ProductList from "../components/ProductList";
import SectionBar from "../components/SectionBar";
import { useRef, useState } from "react";
import FilterBar from "../components/FilterBar";
import { Outlet } from "react-router-dom";
import useFilterSync from "../hooks/useFilterSync";
import MainLayout from "../layouts/MainLayout";

const Catalog = () => {
  const refCounte = useRef(0);
  console.log("catalog render count: ", refCounte.current++);
  useFilterSync();

  const [query, setQuery] = useState("");
  const [section, setSection] = useState("all");
  /*   const { cartProducts } = useCartStore();
  console.log(cartProducts); */
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
    <MainLayout
      onSearch={(searchQuery) => setQuery(searchQuery)}
      onLogoClick={() => setSection("all")}
      filters={<FilterBar />}
      side={<Outlet />}
    >
      <SectionBar onSectionChange={(section) => setSection(section)} />
      <h1 className="text-2xl font-semibold mt-4 ml-4">
        {dictSection[section as keyof typeof dictSection].title}
      </h1>
      <p className="text-gray-500 mt-2 ml-4">
        {dictSection[section as keyof typeof dictSection].description}
      </p>
      <ProductList query={query} section={section} />
    </MainLayout>
  );
};

export default Catalog;
