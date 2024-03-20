import { useState } from "react";
import { ProjectsDropDown } from "./ProjectsDropDown.jsx";

/**
 * MenuItems component.
 * This component is responsible for rendering the navigation menu items.
 *
 * @param {Object} props - Component props.
 * @param {Array} props.data - The data to be passed to the ProjectsDropDown component.
 *
 * @returns {JSX.Element} The rendered component.
 */
export const MenuItems = ({ data }) => {
  /**
   * State for tracking which menu item is currently active.
   * Initially, all menu items are inactive.
   */
  const [state, setState] = useState({
    homeActive: false,
    projectsActive: false,
    productsActive: false,
  });

  /**
   * CSS classes for the navigation items.
   */
  const navItemClasses = `hover:bg-white hover:text-stone-800 px-4 py-2 rounded-t-md
    text-sm font-medium cursor-pointer transition-colors duration-300 ease-in-out h-full`;

  return (
    <ul
      className={
        "flex justify-center items-center space-x-8 text-white h-full pt-2 relative"
      }
    >
      <li
        className={`${navItemClasses} ${
          state.homeActive ? "bg-white text-stone-800" : ""
        }`}
        onClick={() =>
          setState({
            homeActive: true,
            projectsActive: false,
            productsActive: false,
          })
        }
      >
        Home
      </li>
      <li
        className={`${navItemClasses} ${
          state.projectsActive ? "bg-white text-stone-800" : ""
        }`}
        onClick={() =>
          setState({
            homeActive: false,
            projectsActive: true,
            productsActive: false,
          })
        }
      >
        Go to projects
      </li>
      {/* Dropdown menu for the projects. It is displayed when the 'projectsActive' state is true. */}
      <ProjectsDropDown data={data} showProjects={state.projectsActive} />
      <li
        className={`${navItemClasses} ${
          state.productsActive ? "bg-white text-stone-800" : ""
        }`}
        onClick={() =>
          setState({
            homeActive: false,
            projectsActive: false,
            productsActive: true,
          })
        }
      >
        Products
      </li>
    </ul>
  );
};
