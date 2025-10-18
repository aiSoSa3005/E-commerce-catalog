import { useState } from "react";

const InputSearch = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search"
        className="w-[95%] p-2 border border-gray-300 outline-none"
      />
    </div>
  );
};
export default InputSearch;
