import { SearchIcon } from "../icons/SearchIcon.jsx";
import { useState } from "react";

export const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className={"h-12"}>
      <div className="relative my-6 flex items-center justify-center">
        <input
          id="search-input"
          type="text"
          name="search-input"
          value={searchQuery}
          onChange={handleSearch}
          className="relative w-full h-8 px-4 pl-7 mx-4 transition-all border shadow-sm shadow-[#4e70a0]
            rounded outline-none peer border-[#4e70a0] text-slate-500 autofill:bg-white invalid:border-pink-500
            invalid:text-pink-500 focus:border-[#4e70a0] focus:outline-none invalid:focus:border-pink-500
            focus-visible:outline-none"
        />
        <SearchIcon />
      </div>
    </div>
  );
};
