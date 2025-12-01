import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useFilterStore from "../store/filterStore";
import { deleteEmptyFilter } from "../utilities";

const useFilterSync = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { price, size, brand, setPrice, setSize, setBrand } = useFilterStore();

  const encoderURL = (
    filters: string[] | { min: number; max: number }[] | string,
    type: "string" | "price"
  ) => {
    if (typeof filters === "string") return filters;

    if (type === "string") {
      return (filters as string[]).filter((s) => s.trim() !== "").join(",");
    } else if (type === "price") {
      return (filters as { min: number; max: number }[])
        .map((p) => `${p.min}-${p.max}`)
        .join(",");
    }
    return "";
  };

  const decoderURL = (
    str: string,
    type: "string" | "price"
  ): string[] | { min: number; max: number }[] => {
    if (str === "all") {
      return type === "price" ? [] : [];
    }
    if (type === "string") {
      return str.split(",").filter((s) => s.trim() !== "");
    }
    if (type === "price") {
      if (str === "") return [{ min: 0, max: Infinity }];
      return str.split(",").map((s) => {
        const [min, max] = s.split("-");
        return {
          min: Number(min),
          max: Number(max),
        };
      });
    }
    return [];
  };
  /* Sync the filters with the URL */
  useEffect(() => {
    console.log("Runna 1 effect");

    const urlPrice = decoderURL(searchParams.get("price") || "", "price");

    const urlfinalPrice =
      urlPrice && urlPrice.length > 0
        ? (urlPrice as { min: number; max: number }[])
        : [{ min: 0, max: Infinity }];

    const urlSize = decoderURL(
      searchParams.get("size") || "",
      "string"
    ) as string[];
    const urlBrand = decoderURL(
      searchParams.get("brand") || "",
      "string"
    ) as string[];

    if (JSON.stringify(urlfinalPrice) != JSON.stringify(price))
      setPrice(urlfinalPrice);
    if (JSON.stringify(urlSize) != JSON.stringify(size)) setSize(urlSize);
    if (JSON.stringify(urlBrand) != JSON.stringify(brand)) setBrand(urlBrand);
  }, [searchParams]);
  /* Sync the filters with the URL */
  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    console.log("Runna 2 effect");

    const decodedPrice = decoderURL(
      searchParams.get("price") || "",
      "price"
    ) as { min: number; max: number }[];

    if (JSON.stringify(price) != JSON.stringify(decodedPrice)) {
      console.log("price >>", price);
      if (price.length > 0 && price[0].max != Infinity) {
        newSearchParams.set("price", encoderURL(price, "price"));
      } else {
        newSearchParams.delete("price");
      }
    }

    const decodedSize = decoderURL(
      searchParams.get("size") || "",
      "string"
    ) as string[];

    if (JSON.stringify(size) != JSON.stringify(decodedSize))
      newSearchParams.set("size", encoderURL(size, "string"));

    const decodedBrand = decoderURL(
      searchParams.get("brand") || "",
      "string"
    ) as string[];

    if (JSON.stringify(brand) != JSON.stringify(decodedBrand))
      newSearchParams.set("brand", encoderURL(brand, "string"));

    const currentSearchParams = searchParams.toString();
    const newSearchParamsString = deleteEmptyFilter(newSearchParams).toString();
    if (currentSearchParams != newSearchParamsString)
      setSearchParams(newSearchParamsString);
  }, [price, size, brand]);
};

export default useFilterSync;
