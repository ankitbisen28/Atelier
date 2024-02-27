import React from "react";
import { AppBar, Toolbar, Box, Typography, styled, alpha } from "@mui/material";
import InputBase from "@mui/material/InputBase";

import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const CustomToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  // padding: theme.spacing(0, 2),
  height: "100%",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const Navbar = () => {
  return (
    <AppBar sx={{ boxShadow: "none" }}>
      <CustomToolBar>
        <Typography
          variant="h1"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            Meydit
          </Link>
        </Typography>
        <Search>
          <StyledInputBase
            placeholder="Search for products"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton
            sx={{
              border: "1px solid #edf1ff !important",
              padding: ".375rem .75rem",
              borderRadius: "0",
              margin: "15px",
            }}
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <FavoriteIcon color="secondary" />
            </Badge>
          </IconButton>
          <IconButton
            sx={{
              border: "1px solid #edf1ff !important",
              padding: ".375rem .75rem",
              borderRadius: "0",
              margin: "15px",
            }}
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <ShoppingCartIcon color="secondary" />
            </Badge>
          </IconButton>
        </Box>
      </CustomToolBar>
    </AppBar>
  );
};
