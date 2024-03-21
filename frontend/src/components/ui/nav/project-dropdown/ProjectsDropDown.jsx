import { SearchBar } from "./SearchBar.jsx";
import { FilteredData } from "./FilteredData.jsx";
import { useState } from "react";

/**
 * ProjectsDropDown component.
 * This component is responsible for rendering a dropdown menu for projects.
 * It includes a search bar for filtering projects and a list of filtered projects.
 *
 * @param {Object} props - Component props.
 * @param {Array} props.data - The data to be passed to the FilteredData component.
 * @param {boolean} props.showProjects - A boolean indicating whether the dropdown menu should be displayed.
 *
 * @returns {JSX.Element} The rendered component.
 */
export const ProjectsDropDown = ({ data, showProjects }) => {
  /**
   * State for tracking the current search query.
   * Initially, the search query is an empty string.
   */
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * The filtered data derived from the data prop.
   * It filters the data based on the search query.
   * The filtering is case-insensitive and checks if the search query is present in either the group or project name.
   * If a group matches the search query, its parent project is also included in the filtered data.
   */
  const filteredData = data
    .map((item, index) => {
      const groups = item.groups.filter((group) =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      const isItemVisible =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        groups.length > 0;
      return isItemVisible ? { ...item, groups, index } : null;
    })
    .filter(Boolean);

  return (
    <div
      className={`border border-stone-400 border-t-0 b w-64 top-12 left-[4.4rem] absolute text-stone-400 ${
        showProjects ? "block" : "hidden"
      }`}
    >
      {/* SearchBar component for filtering projects */}
      <SearchBar onSearch={(value) => setSearchQuery(value)} />
      {/* FilteredData component for displaying the filtered projects */}
      <FilteredData data={filteredData} searchQuery={searchQuery} />
    </div>
  );
};
