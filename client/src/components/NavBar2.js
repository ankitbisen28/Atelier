import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Stack, Avatar, Button } from "@mui/material";
import UserContext from "../Context/UserContext";

export const NavBar2 = () => {
  const { profile, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  return (
    <AppBar position="static" sx={{ boxShadow: "none", background:"#ffff" }}>
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
        <Stack direction="row" alignItems="center">
          <Button variant="contained" color="secondary">
            <Link
              style={{
                textDecoration: "none",
                color: "black",
              }}
              to="/postJob"
            >
              Post
            </Link>
          </Button>
          <Button sx={{margin:'3px'}} onClick={logout} variant="contained" color="secondary">
              logout
          </Button>
          <Button onClick={() => navigate(`/user/${userId}`)}>
            <Avatar alt="Ankit Bisen" src={profile} />
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
