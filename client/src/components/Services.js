import { Box } from "@mui/material";
import React from "react";
import { ServiceCard } from "./ServiceCard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckIcon from "@mui/icons-material/Check";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";

export const Services = () => {
  return (
    <Box
      mt={15}
      gap={10}
      display="flex"
      flexDirection={{ xs: "colum", lg: "row" }}
    >
      <ServiceCard Icon={LocalShippingIcon} product="Quality Product" />
      <ServiceCard Icon={CheckIcon} product="Free Shipping" />
      <ServiceCard Icon={CompareArrowsIcon} product="14-Day Return" />
      <ServiceCard Icon={AddIcCallIcon} product="24/7 Support" />
    </Box>
  );
};
