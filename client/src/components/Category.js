import React, { useContext } from "react";
import JobContext from "../Context/JobContext";

export const Category = () => {
  const { categories } = useContext(JobContext);

  return (
    <>
      <h5 className="text-center text-xl font-semibold my-5 color-white">
        Categories
      </h5>
      {categories.map((item) => (
        <button
          key={item._id}
          className="w-full py-2 px-4 text-white bg-info-500 hover:bg-info-600"
        >
          {item.name}
        </button>
      ))}
    </>
  );
};
