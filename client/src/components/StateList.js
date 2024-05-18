import React from "react";

export const StateList = ({ state, handleChange, values }) => {
  return (
    <div className="my-8 mx-4 w-64">
      <label
        htmlFor="state"
        className="block text-gray-700"
      >
        State
      </label>
      <select
        id="state"
        name="state"
        value={values.state}
        onChange={handleChange}
        className="block w-full mt-2 p-2 border border-gray-300 rounded"
      >
        <option value="" disabled>Select State</option>
        {state.map((item) => (
          <option key={item.key} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};
