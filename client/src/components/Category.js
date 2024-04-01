import React, { useContext } from "react";
import { Button, MenuItem, Menu, styled } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext";
import Cloths from "../utils/Cloths.json";

const StyledButton = styled(Button)({
  height: "4.5rem",
  width: "30em",
  boxShadow: "none",
  borderRadius: "0",
  backgroundColor: "#d19c97",
});

const StyledMenuItem = styled(MenuItem)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "26.3rem",
  alignItems: "center",
});

const StyledRedirectButton = styled(Button)({
  color: "#1c1c1c",
  width: "100%",
});

export const Category = () => {
  const navigate = useNavigate();
  const cloth = Cloths.clothes;

  const { logout } = useContext(UserContext);

  return (
    <>
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <StyledButton
              variant="contained"
              {...bindTrigger(popupState)}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Categories
            </StyledButton>
            {/* <Menu {...bindMenu(popupState)} sx={{ borderRadius: "none" }}>
              <StyledMenuItem onClick={popupState.close}> */}
            {cloth.map((item, index) => {
              return (
                <StyledRedirectButton key={index} color="info">
                  {item}
                </StyledRedirectButton>
              );
            })}
            {/* </StyledMenuItem> */}
            <StyledMenuItem onClick={popupState.close}>
              <StyledRedirectButton color="info" onClick={() => logout()}>
                Logout
              </StyledRedirectButton>{" "}
            </StyledMenuItem>
            {/* </Menu> */}
          </React.Fragment>
        )}
      </PopupState>
    </>
  );
};
