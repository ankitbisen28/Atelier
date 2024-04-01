import React from "react";
import { Box, Typography, styled } from "@mui/material";
import cat_one from "../assets/Images/cat-1.jpg";
import cat_two from "../assets/Images/cat-2.jpg";
import cat_three from "../assets/Images/cat-3.jpg";

const StyledBox = styled(Box)({
  width: "30%",
  height: "40vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
});

const cats = [
  { name: "Men's Dresses", img: cat_one },
  { name: "Women's dresses", img: cat_two },
  { name: "kid's Dresses", img: cat_three },
];

export const ClothCategory = () => {
  return (
    <>
      {cats.map((item, index) => {
        return (
          <StyledBox mt={4} key={index}>
            <img
              alt="cloths category"
              src={item.img}
              width="300px"
              height="250px"
            ></img>
            <Typography>{item.name}</Typography>
          </StyledBox>
        );
      })}
    </>
  );
};
