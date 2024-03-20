// import { useState, useEffect } from "react";
//
// export const FilteredData = ({ data, searchQuery }) => {
//   const [highlightedIndices, setHighlightedIndices] = useState({
//     item: -1,
//     group: -1,
//   });
//
//   useEffect(() => {
//     setHighlightedIndices({ item: data.length > 0 ? 0 : -1, group: 0 });
//   }, [data]);
//
//   const handleKeyDown = (event) => {
//     if (event.key === "ArrowDown") {
//       console.log("ArrowDown");
//       setHighlightedIndices((prevIndices) => {
//         const nextGroup = prevIndices.group + 1;
//         const nextItem =
//           prevIndices.item +
//           (nextGroup >= data[prevIndices.item].groups.length ? 1 : 0);
//         return {
//           item: nextItem < data.length ? nextItem : prevIndices.item,
//           group:
//             nextGroup < data[prevIndices.item].groups.length ? nextGroup : 0,
//         };
//       });
//     } else if (event.key === "ArrowUp") {
//       console.log("ArrowUp");
//       setHighlightedIndices((prevIndices) => {
//         const nextGroup = prevIndices.group - 1;
//         const nextItem = prevIndices.item - (nextGroup < 0 ? 1 : 0);
//         return {
//           item: nextItem >= 0 ? nextItem : prevIndices.item,
//           group:
//             nextGroup >= 0
//               ? nextGroup
//               : data[prevIndices.item].groups.length - 1,
//         };
//       });
//     } else if (event.key === "Enter") {
//       console.log("Enter");
//       const activeGroup =
//         data[highlightedIndices.item].groups[highlightedIndices.group];
//       if (activeGroup) {
//         window.location.href = activeGroup.url;
//       }
//     }
//   };
//
//   useEffect(() => {
//     window.addEventListener("keydown", handleKeyDown);
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [data, highlightedIndices]);
//
//   return (
//     <>
//       {data.map((item, index) => (
//         <div key={item.id} className={`grid grid-cols-3 `}>
//           <div className={"col-span-1 border"}>
//             <img
//               src={item.image.link}
//               alt={item.name}
//               width={32}
//               height={32}
//               className={"aspect-square mt-1 mx-auto"}
//             />
//           </div>
//           <div className={"col-span-2 border p-2"}>
//             <h2 className={"font-bold text-[#4e70a0]"}>
//               <a href={item.url} target={"_blank"}>
//                 {item.name}
//               </a>
//             </h2>
//             <ol className={"list-inside ml-4"}>
//               {item.groups.map((group) => {
//                 const lowerCaseName = group.name.toLowerCase();
//                 const lowerCaseQuery = searchQuery.toLowerCase();
//                 const startIndex = lowerCaseName.indexOf(lowerCaseQuery);
//                 if (startIndex === -1) {
//                   return <li key={group.id}>{group.name}</li>;
//                 }
//                 const endIndex = startIndex + searchQuery.length;
//                 const beforeMatch = group.name.slice(0, startIndex);
//                 const match = group.name.slice(startIndex, endIndex);
//                 const afterMatch = group.name.slice(endIndex);
//                 return (
//                   <li key={group.id}>
//                     <a href={group.url} target={"_blank"}>
//                       {beforeMatch}
//                       <span className={"bg-yellow-300"}>{match}</span>
//                       {afterMatch}
//                     </a>
//                   </li>
//                 );
//               })}
//             </ol>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

import { useState, useEffect, useRef } from "react";

export const FilteredData = ({ data, searchQuery }) => {
  const [highlightedIndices, setHighlightedIndices] = useState({
    item: -1,
    group: -1,
  });

  const linksRef = useRef([]);

  useEffect(() => {
    setHighlightedIndices({ item: data.length > 0 ? 0 : -1, group: 0 });
  }, [data]);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
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
      const activeLink = linksRef.current[highlightedIndices.group];
      if (activeLink) {
        activeLink.click();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [data, highlightedIndices]);

  useEffect(() => {
    const activeLink = linksRef.current[highlightedIndices.group];
    if (activeLink) {
      activeLink.focus();
    }
  }, [highlightedIndices]);

  return (
    <>
      {data.map((item) => (
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
            <h2 className={"font-bold text-[#4e70a0]"}>
              <a href={item.url} target={"_blank"}>
                {item.name}
              </a>
            </h2>
            <ol className={"list-inside ml-4"}>
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
                      ref={(el) => (linksRef.current[groupIndex] = el)}
                      tabIndex={0}
                      className={
                        "focus:bg-blue-300/50 focus:outline-none focus:text-stone-900"
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
      ))}
    </>
  );
};
