import { Box, styled } from "@mui/material";
import React from "react";
import { NavBar2 } from "./NavBar2";
import { BannerInside } from "./BannerInside";

const StyledBox = styled(Box)({
  padding: "0",
  margin: "0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const Banner = () => {
  return (
    <StyledBox>
      <NavBar2 />
      <BannerInside />
    </StyledBox>
  );
};
