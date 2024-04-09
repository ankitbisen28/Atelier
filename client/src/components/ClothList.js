import React, { useContext } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import JobContext from "../Context/JobContext";


export const ClothList = ({ cloth, handleChange, values, errors }) => {
  const {categories} = useContext(JobContext)
  return (
    <FormControl sx={{margin: "2rem 1rem 0 0", width: "17rem"}}>
      <InputLabel id="demo-simple-select-label">ClothList</InputLabel>
      <Select defaultValue = "" name="type_clothing" value={values.type_clothing} onChange={handleChange} label="Cloths">
        {categories.map((item) => {
          return (
            <MenuItem key={item._id} value={item._id}>
              {item.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
