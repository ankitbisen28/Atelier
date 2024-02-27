import React from "react";
import { Box, Typography, styled } from "@mui/material";
import Ankit from "../assets/Images/Ankit.jpg";

const StyledBox = styled(Box)({
  width: "30%",
  height: "40vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
});

export const ClothCategory = () => {
  return (
    <>
      <StyledBox mt={4}>
        <img
          alt="cloths category"
          src={Ankit}
          width="250px"
          height="250px"
        ></img>
        <Typography>Men's Dresses</Typography>
      </StyledBox>
    </>
  );
};
