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
