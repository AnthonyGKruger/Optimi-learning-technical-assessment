import { SearchIcon } from "../../icons/SearchIcon.jsx";
import { useState } from "react";

/**
 * SearchBar component
 *
 * This component renders a search bar with an input field and a search icon.
 * It also handles the search input validation and search query state.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Function} props.onSearch - The function to be called when a search is performed.
 */
export const SearchBar = ({ onSearch }) => {
  // The state for the search query
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * Validates the search query.
   *
   * This function checks if the query is a string and does not contain any potentially harmful characters or scripts.
   *
   * @param {string} query - The search query to validate.
   * @returns {boolean} - Returns true if the query is safe to process, false otherwise.
   */
  const validateSearch = (query) => {
    // Check if the query is a string
    if (typeof query !== "string") {
      return false;
    }

    // Check for potentially harmful characters or scripts
    const regex = /<(.|\n)*?>/g; // This regex pattern matches any HTML tags
    if (regex.test(query)) {
      return false;
    }

    // If the query passes all checks, it is safe to process
    return true;
  };

  /**
   * Handles the search input.
   *
   * This function validates the search input and updates the search query state.
   * It also calls the onSearch function passed as a prop with the validated search query.
   *
   * @param {Object} e - The event object.
   */
  const handleSearch = (e) => {
    if (validateSearch(e.target.value)) {
      setSearchQuery(e.target.value);
      onSearch(e.target.value);
    }
  };

  // Render the search bar with an input field and a search icon
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
