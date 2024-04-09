import React, { useContext } from "react";
import { Button, styled, Typography } from "@mui/material";
import JobContext from "../Context/JobContext";

const StyledRedirectButton = styled(Button)({
  color: "#1c1c1c",
  width: "100%",
});

export const Category = () => {
  const { categories } = useContext(JobContext);

  return (
    <>

      <Typography textAlign='center'
      variant="h5"
      margin="20px 20px"
      fontWeight={600}
        style={{ background: "#ffff" }}
      >
        Categories
      </Typography>
      {categories.map((item, index) => {
        return (
          <StyledRedirectButton key={item._id} color="info">
            {item.name}
          </StyledRedirectButton>
        );
      })}
    </>
  );
};
