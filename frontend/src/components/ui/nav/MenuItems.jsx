export const MenuItems = ({ data }) => {
  const navItemClasses = `hover:bg-white hover:text-stone-800 px-4 py-2 rounded-t-md 
    text-sm font-medium cursor-pointer transition-colors duration-300 ease-in-out h-full relative`;

  console.log(data);

  const dataContent = data.map((item) => {
    return (
      <div key={item.id} className={"grid grid-cols-3"}>
        <div className={"col-span-1 border"}>
          <img
            src={item.image.link}
            alt={item.name}
            width={32}
            height={32}
            className={"aspect-square mt-2 mx-auto"}
          />
        </div>
        <div className={"col-span-2 border"}>
          <h2>{item.name}</h2>
          <ul>
            {item.groups.map((group) => {
              return <li key={group.id}>{group.name}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  });

  return (
    <ul
      className={
        "flex justify-center items-center space-x-8 text-white h-full pt-2 "
      }
    >
      <li className={navItemClasses}>Home</li>
      <li className={navItemClasses}>
        Go to Projects
        <div
          className={
            "border border-t-0 b w-72 top-10 left-0 absolute text-stone-400"
          }
        >
          <div className={"h-12"}> search input</div>
          {dataContent}
        </div>
      </li>
      <li className={navItemClasses}>Products</li>
    </ul>
  );
};
