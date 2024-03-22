/**
 * Item component
 * This component represents a single item in a dropdown menu.
 * It receives the following props:
 * - handleKeyDown: a function to handle key down events
 * - itemPhrase: the text to display for the item. This can be a string or an object with 'beforeMatch', 'match', and 'afterMatch' properties.
 * - item: the data for the item. This should be an object with 'url' and 'id' properties.
 * - focusedElement: the currently focused element in the dropdown menu.
 *
 * The component returns a list item (li) element that contains a heading (h2) element.
 * The heading contains a link (a) element that navigates to the item's URL when clicked.
 * The link's text is determined by the 'itemPhrase' prop. If 'itemPhrase' is an object, the text before, during, and after the match is highlighted.
 * If the 'focusedElement' prop matches the item's id, the link is given a background color and outline.
 */
export const Item = ({ handleKeyDown, itemPhrase, item, focusedElement }) => {
  return (
    <li>
      <h2 className={"font-bold text-[#4e70a0] w-full"}>
        <a
          href={item.url}
          target={"_blank"}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className={
            focusedElement && focusedElement.id === item.id
              ? "block bg-blue-300/50 outline-none text-stone-900 w-full"
              : ""
          }
        >
          {typeof itemPhrase === "object" ? (
            <>
              <span>{itemPhrase.beforeMatch}</span>
              <span className={"bg-yellow-300"}>{itemPhrase.match}</span>
              <span>{itemPhrase.afterMatch}</span>
            </>
          ) : (
            itemPhrase
          )}
        </a>
      </h2>
    </li>
  );
};
