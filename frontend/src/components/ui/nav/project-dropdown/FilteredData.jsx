import { useState, useEffect } from "react";
import { ProjectImage } from "./ProjectImage.jsx";
import { Group } from "./Group.jsx";
import { Item } from "./Item.jsx";

/**
 * `FilteredData` is a React component that displays a list of data filtered by a search query.
 * It also handles keyboard navigation for the list items.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.data - The data to be displayed.
 * @param {string} props.searchQuery - The search query to filter the data.
 *
 * @example
 * <FilteredData data={data} searchQuery="query" />
 *
 * @returns {React.Element} The rendered component.
 */
export const FilteredData = ({ data, searchQuery }) => {
  /**
   * @type {Object} highlightedIndices - The indices of the highlighted item and group.
   * @property {number} item - The index of the highlighted item.
   * @property {number} group - The index of the highlighted group.
   */
  const [highlightedIndices, setHighlightedIndices] = useState({
    item: 0,
    group: 0,
  });

  /**
   * @type {Object|null} focusedElement - The currently focused element.
   */
  const [focusedElement, setFocusedElement] = useState(null);

  /**
   * Sets the initial highlighted indices when the data changes.
   */
  useEffect(() => {
    setHighlightedIndices({ item: data.length > 0 ? 0 : -1, group: 0 });
  }, [data]);

  /**
   * Handles the keydown event.
   *
   * @param {Object} event - The event object.
   */
  const handleKeyDown = (event) => {
    // Check if the pressed key is ArrowDown or ArrowUp
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      // Update the highlighted indices
      setHighlightedIndices((prevIndices) => {
        // Get the current group and item indices
        let nextGroup = prevIndices.group;
        let nextItem = prevIndices.item;

        // If the ArrowDown key is pressed
        if (event.key === "ArrowDown") {
          // If the current group index is less than the length of the groups array
          if (nextGroup < data[nextItem].groups.length) {
            // Increment the group index
            nextGroup++;
          } else {
            // Reset the group index and increment the item index if it's less than the length of the data array
            nextGroup = 0;
            nextItem = nextItem < data.length - 1 ? nextItem + 1 : 0;
          }
        }
        // If the ArrowUp key is pressed
        else if (event.key === "ArrowUp") {
          // If the current group index is greater than 0
          if (nextGroup > 0) {
            // Decrement the group index
            nextGroup--;
          } else {
            // Decrement the item index if it's greater than 0 and set the group index to the length of the groups array
            nextItem = nextItem > 0 ? nextItem - 1 : data.length - 1;
            nextGroup = data[nextItem].groups.length;
          }
        }

        // Get the active item from the data array
        const activeItem = data[nextItem];
        // Get the active element from the active item or its groups
        const activeElement = activeItem
          ? nextGroup === 0
            ? activeItem
            : activeItem.groups[nextGroup - 1]
          : null;
        // Set the focused element
        setFocusedElement(activeElement);

        // Return the new indices
        return {
          item: nextItem,
          group: nextGroup,
        };
      });
    }
    // If the Enter key is pressed and there is a focused element
    else if (event.key === "Enter" && focusedElement) {
      // If the focused element has an url property, navigate to that url
      if (focusedElement.url) {
        window.location.href = focusedElement.url;
      }
      // If the focused element has a link property, navigate to that link
      else {
        window.location.href = focusedElement.link;
      }
    }
  };

  /**
   * Adds and removes the keydown event listener.
   */
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [data, highlightedIndices]);

  /**
   * Checks for a match between the search query and the phrase.
   * If a match is found, it returns an object with the text before, during, and after the match.
   * If no match is found and the phrase is not a group, it returns the phrase's name.
   *
   * @param {Object} phrase - The phrase to check for a match.
   * @param {string} searchQuery - The search query.
   * @param {boolean} isGroup - Whether the phrase is a group.
   *
   * @returns {Object|string} The match result.
   */
  const checkForMatch = (phrase, searchQuery, isGroup) => {
    const lowerCaseName = phrase.name.toLowerCase();
    const lowerCaseQuery = searchQuery.toLowerCase();
    const startIndex = lowerCaseName.indexOf(lowerCaseQuery);
    if (startIndex >= 0) {
      const endIndex = startIndex + searchQuery.length;
      const beforeMatch = phrase.name.slice(0, startIndex);
      const match = phrase.name.slice(startIndex, endIndex);
      const afterMatch = phrase.name.slice(endIndex);
      return {
        beforeMatch,
        match,
        afterMatch,
      };
    }
    if (!isGroup) {
      return phrase.name;
    }
  };

  /**
   * Render the FilteredData component
   */
  return (
    <>
      {data.map((item) => {
        const itemPhrase = checkForMatch(item, searchQuery, false);
        const headingContent = (
          <Item
            handleKeyDown={handleKeyDown}
            itemPhrase={itemPhrase}
            item={item}
            key={item.id}
            focusedElement={focusedElement}
          />
        );

        return (
          <div key={item.id} className={`grid grid-cols-3 `}>
            <div className={"col-span-1 border"}>
              <ProjectImage src={item.image.link} alt={item.name} />
            </div>
            <div className={"col-span-2 border p-2"}>
              <ol className={"list-inside"}>
                {headingContent}
                {item.groups.map((group) => {
                  const groupPhrase = checkForMatch(group, searchQuery, true);
                  return (
                    <Group
                      searchQuery={searchQuery}
                      group={group}
                      focusedElement={focusedElement}
                      groupPhrase={groupPhrase}
                      key={group.id}
                    />
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
