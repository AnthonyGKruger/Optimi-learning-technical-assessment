import { useState, useEffect, useRef } from "react";

/**
 * FilteredData component is responsible for rendering the filtered data based on the search query.
 * It also handles keyboard navigation through the data items and their groups.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.data - The data to be rendered.
 * @param {string} props.searchQuery - The search query to filter the data.
 */
export const FilteredData = ({ data, searchQuery }) => {
  // State for keeping track of the currently highlighted item and group
  const [highlightedIndices, setHighlightedIndices] = useState({
    item: 0,
    group: 0,
  });

  // Create a nested array of refs for each group in each item
  const linksRef = data.map((item) => item.groups.map(() => useRef(null)));

  // Effect for setting the initial highlighted item and group
  useEffect(() => {
    setHighlightedIndices({ item: data.length > 0 ? 0 : -1, group: 0 });
  }, [data]);

  // Handler for keydown events
  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      // If the down arrow key is pressed, move the highlight to the next group or item
      setHighlightedIndices((prevIndices) => {
        const nextGroup = prevIndices.group + 1;
        const nextItem =
          prevIndices.item +
          (nextGroup >= data[prevIndices.item].groups.length ? 1 : 0);
        return {
          item: nextItem < data.length ? nextItem : prevIndices.item,
          group:
            nextGroup < data[prevIndices.item].groups.length ? nextGroup : 0,
        };
      });
    } else if (event.key === "ArrowUp") {
      // If the up arrow key is pressed, move the highlight to the previous group or item
      setHighlightedIndices((prevIndices) => {
        const nextGroup = prevIndices.group - 1;
        const nextItem = prevIndices.item - (nextGroup < 0 ? 1 : 0);
        return {
          item: nextItem >= 0 ? nextItem : prevIndices.item,
          group:
            nextGroup >= 0
              ? nextGroup
              : data[prevIndices.item].groups.length - 1,
        };
      });
    } else if (event.key === "Enter") {
      // If the enter key is pressed, click the active link
      const activeLink = linksRef.current[highlightedIndices.group];
      if (activeLink) {
        activeLink.click();
      }
    }
  };

  // Effect for adding and removing the keydown event listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [data, highlightedIndices]);

  // Effect for focusing the active link
  useEffect(() => {
    let activeLink;
    if (
      highlightedIndices.item < linksRef.length &&
      highlightedIndices.group < linksRef[highlightedIndices.item].length
    ) {
      activeLink =
        linksRef[highlightedIndices.item][highlightedIndices.group].current;
    }
    if (activeLink) {
      activeLink.focus();
    }
  }, [highlightedIndices, linksRef]);

  // Render the data items and their groups
  return (
    <>
      {data.map((item, itemIndex) => {
        let headingContent = (
          <li>
            <h2 className={"font-bold text-[#4e70a0]"}>
              <a
                href={item.url}
                target={"_blank"}
                ref={(el) => (linksRef[itemIndex][itemIndex].current = el)}
                tabIndex={0} // Make the item name focusable
                onKeyDown={handleKeyDown} // Add the keydown event handler
                className={
                  "focus:bg-blue-300/50 focus:outline-none focus:text-stone-900"
                }
              >
                {item.name}
              </a>
            </h2>
          </li>
        );
        const lowerCaseName = item.name.toLowerCase();
        const lowerCaseQuery = searchQuery.toLowerCase();
        const startIndex = lowerCaseName.indexOf(lowerCaseQuery);
        if (startIndex > 0) {
          const endIndex = startIndex + searchQuery.length;
          const beforeMatch = item.name.slice(0, startIndex);
          const match = item.name.slice(startIndex, endIndex);
          const afterMatch = item.name.slice(endIndex);
          headingContent = (
            <li key={item.id}>
              <h2 className={"font-bold text-[#4e70a0]"}>
                <a
                  href={item.url}
                  target={"_blank"}
                  ref={(el) => (linksRef[itemIndex][itemIndex].current = el)}
                  tabIndex={0}
                  className={
                    "focus:bg-blue-300/50 focus:outline-none focus:text-stone-900"
                  }
                >
                  {beforeMatch}
                  <span className={"bg-yellow-300"}>{match}</span>
                  {afterMatch}
                </a>
              </h2>
            </li>
          );
        }

        return (
          <div key={item.id} className={`grid grid-cols-3 `}>
            <div className={"col-span-1 border"}>
              <img
                src={item.image.link}
                alt={item.name}
                width={32}
                height={32}
                className={"aspect-square mt-1 mx-auto"}
              />
            </div>
            <div className={"col-span-2 border p-2"}>
              <ol className={"list-inside"}>
                {headingContent}
                {item.groups.map((group, groupIndex) => {
                  const lowerCaseName = group.name.toLowerCase();
                  const lowerCaseQuery = searchQuery.toLowerCase();
                  const startIndex = lowerCaseName.indexOf(lowerCaseQuery);
                  if (startIndex === -1) {
                    return <li key={group.id}>{group.name}</li>;
                  }
                  const endIndex = startIndex + searchQuery.length;
                  const beforeMatch = group.name.slice(0, startIndex);
                  const match = group.name.slice(startIndex, endIndex);
                  const afterMatch = group.name.slice(endIndex);
                  return (
                    <li key={group.id}>
                      <a
                        href={group.url}
                        target={"_blank"}
                        ref={(el) =>
                          (linksRef[itemIndex][groupIndex].current = el)
                        }
                        tabIndex={0}
                        className={
                          "focus:bg-blue-300/50 focus:outline-none focus:text-stone-900 ml-4"
                        }
                      >
                        {beforeMatch}
                        <span className={"bg-yellow-300"}>{match}</span>
                        {afterMatch}
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        );
      })}
    </>
  );
};
