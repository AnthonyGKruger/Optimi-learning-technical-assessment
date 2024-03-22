/**
 * `ProjectImage` is a functional component that renders an image.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.src - The source URL of the image.
 * @param {string} props.name - The alternative text for the image.
 *
 * @example
 * <ProjectImage src="image_url" name="image_name" />
 *
 * @returns {React.Element} An `img` element with the provided `src` and `alt` attributes.
 */
export const ProjectImage = ({ src, name }) => {
  return (
    <img
      src={src}
      alt={name}
      width={32}
      height={32}
      className={"aspect-square mt-1 mx-auto"}
    />
  );
};
