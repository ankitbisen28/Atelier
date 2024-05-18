import React, { useContext } from "react";
import JobContext from "../Context/JobContext";

export const ClothList = ({ cloth, handleChange, values, errors }) => {
  const { categories } = useContext(JobContext);

  return (
    <div className="my-8 mx-4 w-64">
      <label htmlFor="type_clothing" className="block text-gray-700">
        ClothList
      </label>
      <select
        id="type_clothing"
        name="type_clothing"
        value={values.type_clothing}
        onChange={handleChange}
        className="block w-full mt-2 p-2 border border-gray-300 rounded"
      >
        <option value="" disabled>
          Select Cloth Type
        </option>
        {categories.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
      {errors.type_clothing && (
        <p className="mt-2 text-sm text-red-600">{errors.type_clothing}</p>
      )}
    </div>
  );
};
