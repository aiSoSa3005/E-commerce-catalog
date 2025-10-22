import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

interface InputSearchProps {
  onSearch: (query: string) => void;
}

const InputSearch = ({ onSearch }: InputSearchProps) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(search);
    }, 2000);
    return () => clearTimeout(timer);
  }, [search]);
  return (
    <div className="relative">
      <div className="flex items-center mx-2 gap-2 w-[95%] bg-white border border-gray-300 ">
        <CiSearch size={25} color="gray" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
          className="w-[95%] p-2 bg-transparent outline-none"
        />
      </div>
    </div>
  );
};
export default InputSearch;
