/**
 * Importing necessary modules and components
 */
import { useEffect, useState } from "react";
import { Spinner } from "./components/ui/loaders/Spinner.jsx";
import { MenuItems } from "./components/ui/nav/MenuItems.jsx";
import { sha256 } from "js-sha256";

/**
 * Main App component
 * This component fetches data from the server and displays it in a navigation bar.
 * It uses the useState hook to manage the data, loading, and error states.
 * It uses the useEffect hook to fetch the data when the component mounts.
 * If the data is loading, it displays a Spinner component.
 * If there is an error, it displays the error message.
 * If the data has loaded successfully, it displays the data in MenuItems components.
 */
const App = () => {
  /**
   * @type {Array} data - The data fetched from the server
   * @type {boolean} loading - The loading state of the data fetch
   * @type {Error} error - Any error that occurred during the data fetch
   */
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * useEffect hook
   * This hook is used to fetch the data when the component mounts.
   * It sets the loading state to true, then tries to fetch the data.
   * If the fetch is successful, it sets the data state with the fetched data.
   * If the fetch fails, it sets the error state with the error.
   * Finally, it sets the loading state to false.
   */
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        /**
         * Hashing the ACCESS_TOKEN_SECRET environment variable
         * @type {string}
         */
        const token = sha256(
          import.meta.env.VITE_ACCESS_TOKEN_SECRET.toString(),
        );

        /**
         * Fetching data from the server
         * @type {Response}
         */
        const response = await fetch("http://localhost:3000/projects", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /**
   * Render
   * This is the render method of the App component.
   * It returns a JSX element that contains a navigation bar.
   * If the data is loading, it displays a Spinner component.
   * If there is an error, it displays the error message.
   * If the data has loaded successfully, it displays the data in MenuItems components.
   * @returns {JSX.Element} The rendered App component
   */
  return (
    <>
      <nav className={"bg-[#4e70a0] h-12 flex items-center justify-center"}>
        {loading && <Spinner />}
        {!loading && error && (
          <p className={"text-white"}>
            Whoops, looks like there was an error: {error.message}
          </p>
        )}
        {!loading && !error && data && <MenuItems data={data} />}
      </nav>
    </>
  );
};

/**
 * Exporting the App component as the default export
 */
export default App;
