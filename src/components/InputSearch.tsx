import { useState } from "react";
import { CiSearch } from "react-icons/ci";

const InputSearch = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="relative">
      <div className="flex items-center mx-2 gap-2 w-[95%] bg-white border border-gray-300 ">
        <CiSearch size={25} color="gray" />
        <input
          type="text"
          placeholder="Search"
          className="w-[95%] p-2 bg-transparent outline-none"
        />
      </div>
    </div>
  );
};
export default InputSearch;
