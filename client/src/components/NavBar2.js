import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Stack, Avatar, Button } from "@mui/material";
import UserContext from "../Context/UserContext";

export const NavBar2 = () => {
  const { profile } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "space-between", height: "70px" }}>
        <Stack direction="row" gap="40px" alignItems="center">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            Home
          </Link>
          <Link
            style={{
              textDecoration: "none",
              color: "black",
            }}
            to="/about"
          >
            About
          </Link>
          <Link
            style={{
              textDecoration: "none",
              color: "black",
            }}
            to="/listjobs"
          >
            Jobs
          </Link>
        </Stack>
        <Stack direction="row" alignItems="flex-end">
          <Button onClick={() => navigate("/profile")}>
            <Avatar alt="Ankit Bisen" src={profile} />
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
