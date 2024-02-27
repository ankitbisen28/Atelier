import { Box, Typography, styled } from "@mui/material";
import React from "react";


const StyledBox = styled(Box)({
  width: "20%",
  height: "15vh",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  boxSizing: "border-box",
  border: "1px #dbdbdb solid",
  borderRadius: "5px",
});

export const ServiceCard = ({Icon, product}) => {
  return (
    <StyledBox>
      <Icon color="secondary" fontSize="large"/>
      <Typography variant="h6" ml={2} fontWeight="700">{product}</Typography>
    </StyledBox>
  );
};
