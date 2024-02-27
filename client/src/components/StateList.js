import React from 'react'
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

export const StateList = ({state, handleChange, values}) => {
  return (
    <FormControl sx={{margin: "2rem 1rem 0 0", width: "17rem"}}>
          <InputLabel id="demo-simple-select-label">State</InputLabel>
          <Select defaultValue = "" name="state" onChange={handleChange} label="State" value={values.state}>
            {state.map((item) => {
              return (
                <MenuItem key={item.key} value={item.name}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
  )
}
