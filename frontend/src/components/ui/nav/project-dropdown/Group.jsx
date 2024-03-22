/**
 * Group component
 * This component represents a single group in a dropdown menu.
 * It receives the following props:
 * - group: the data for the group. This should be an object with 'url', 'id', and 'name' properties.
 * - focusedElement: the currently focused element in the dropdown menu.
 * - searchQuery: the current search query. This is used to determine whether to display the group's name or a highlighted version of the group's name.
 * - groupPhrase: the text to display for the group. This can be a string or an object with 'beforeMatch', 'match', and 'afterMatch' properties.
 *
 * The component returns a list item (li) element that contains a link (a) element.
 * The link navigates to the group's URL when clicked.
 * The link's text is determined by the 'searchQuery' and 'groupPhrase' props. If 'searchQuery' is an empty string, the group's name is displayed. If 'searchQuery' is not an empty string, the text before, during, and after the match is highlighted.
 * If the 'focusedElement' prop matches the group's id, the link is given a background color and outline.
 */
export const Group = ({ group, focusedElement, searchQuery, groupPhrase }) => {
  return (
    <li key={group.id}>
      <a
        href={group.url}
        target={"_blank"}
        tabIndex={0}
        className={
          focusedElement && focusedElement.id === group.id
            ? "block bg-blue-300/50 outline-none text-stone-900 pl-4 w-full"
            : "pl-4"
        }
      >
        {searchQuery === "" ? (
          group.name
        ) : (
          <>
            <span>{groupPhrase.beforeMatch}</span>
            <span className={"bg-yellow-300"}>{groupPhrase.match}</span>
            <span>{groupPhrase.afterMatch}</span>
          </>
        )}
      </a>
    </li>
  );
};
