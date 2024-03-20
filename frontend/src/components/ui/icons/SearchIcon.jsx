/**
 * SearchIcon component.
 * This component is responsible for rendering a search icon.
 *
 * @returns {JSX.Element} The rendered SVG icon.
 */
export const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-1.5 left-5 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
      aria-labelledby="search-icon-title search-icon-description"
      role="graphics-symbol"
    >
      {/* Title for the SVG icon */}
      <title id="search-icon-title">Search icon</title>
      {/* Description for the SVG icon */}
      <desc id="search-icon-description">Icon for search input.</desc>
      {/* Path for the SVG icon */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  );
};
