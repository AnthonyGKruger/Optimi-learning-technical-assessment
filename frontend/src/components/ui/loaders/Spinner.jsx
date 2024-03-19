/**
 * Spinner component
 * This is a functional component that returns an SVG spinner.
 * The spinner is a circle that spins around its center.
 * The SVG has a viewBox of '0 0 24 24', which means it's a 24x24 square.
 * The SVG is filled with 'none' and has a namespace of 'http://www.w3.org/2000/svg'.
 * The SVG has aria-live set to 'polite', which means that screen readers will wait until they finish speaking to announce updates.
 * The SVG has aria-busy set to 'true', which means it's currently updating.
 * The SVG has aria-labelledby set to 'title-loader desc-loader', which means it's labelled by the elements with the ids 'title-loader' and 'desc-loader'.
 * The SVG has a className of 'w-6 h-6 animate animate-spin', which means it has a width and height of 6 units and has animation applied to it.
 * The SVG contains a title and a description for accessibility purposes.
 * The SVG contains a circle and a path that form the spinner.
 * @returns {JSX.Element} The Spinner component
 */
export const Spinner = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-live="polite"
      aria-busy="true"
      aria-labelledby="title-loader desc-loader"
      className="w-6 h-6 animate animate-spin"
    >
      <title id="title-loader">Loading spinner</title>
      <desc id="desc-loader">This spinner will show when data is loading</desc>
      <circle
        cx="12"
        cy="12"
        r="10"
        className="stroke-slate-200"
        strokeWidth="4"
      />
      <path
        d="M12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2"
        className="stroke-white"
        strokeWidth="4"
      />
    </svg>
  );
};
