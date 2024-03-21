import { useState, useEffect } from "react";
import { ProjectImage } from "./ProjectImage.jsx";

export const FilteredData = ({ data, searchQuery }) => {
  const [highlightedIndices, setHighlightedIndices] = useState({
    item: 0,
    group: 0,
  });

  const [focusedElement, setFocusedElement] = useState(null);

  useEffect(() => {
    setHighlightedIndices({ item: data.length > 0 ? 0 : -1, group: 0 });
  }, [data]);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      setHighlightedIndices((prevIndices) => {
        let nextGroup = prevIndices.group;
        let nextItem = prevIndices.item;

        if (event.key === "ArrowDown") {
          if (nextGroup < data[nextItem].groups.length - 1) {
            nextGroup++;
          } else {
            nextGroup = 0;
            nextItem = nextItem < data.length - 1 ? nextItem + 1 : 0;
          }
        } else if (event.key === "ArrowUp") {
          if (nextGroup > 0) {
            nextGroup--;
          } else {
            nextItem = nextItem > 0 ? nextItem - 1 : data.length - 1;
            nextGroup = data[nextItem].groups.length - 1;
          }
        }

        const activeItem = data[nextItem];
        const activeElement = activeItem
          ? nextGroup === 0
            ? activeItem
            : activeItem.groups[nextGroup - 1]
          : null;
        setFocusedElement(activeElement);

        return {
          item: nextItem,
          group: nextGroup,
        };
      });
    } else if (event.key === "Enter" && focusedElement) {
      if (focusedElement.url) {
        window.location.href = focusedElement.url;
      } else {
        window.location.href = focusedElement.link;
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [data, highlightedIndices]);

  return (
    <>
      {data.map((item, itemIndex) => {
        let headingContent = (
          <li>
            <h2 className={"font-bold text-[#4e70a0]"}>
              <a
                href={item.url}
                target={"_blank"}
                tabIndex={0} // Make the item name focusable
                onKeyDown={handleKeyDown} // Add the keydown event handler
                className={
                  focusedElement && focusedElement.id === item.id
                    ? "bg-blue-300/50 outline-none text-stone-900"
                    : ""
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
        if (startIndex >= 0) {
          // Changed condition to >= 0
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
                  tabIndex={0} // Make the item name focusable
                  onKeyDown={handleKeyDown} // Add the keydown event handler
                  className={
                    focusedElement && focusedElement.id === item.id
                      ? "bg-blue-300/50 outline-none text-stone-900"
                      : ""
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
              <ProjectImage src={item.image.link} alt={item.name} />
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
                        tabIndex={0}
                        className={
                          focusedElement && focusedElement.id === group.id
                            ? " bg-blue-300/50 outline-none text-stone-900 ml-4"
                            : "ml-4"
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
