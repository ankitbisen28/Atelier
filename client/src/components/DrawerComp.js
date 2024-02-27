import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  styled
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

export const DrawerComp = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const CustomStyledLink = styled(Link)({
    fontFamily: "Ubuntu",
    textDecoration: "none",
    color: "#394867",
  });

  return (
    <>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          <ListItemButton>
            <ListItemIcon>
              <CustomStyledLink to="/">Home</CustomStyledLink>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
            <ListItemIcon>
              <CustomStyledLink to="/myprofile">Profile</CustomStyledLink>
            </ListItemIcon>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <CustomStyledLink to="/about">About Me</CustomStyledLink>
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon color="white" />
      </IconButton>
    </>
  );
};
