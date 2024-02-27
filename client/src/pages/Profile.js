import React, { useContext } from "react";
import { Box, Button, Grid, Typography, styled } from "@mui/material";
import UserContext from "../Context/UserContext";

const CircleImage = styled(Box)({
  width: "200px",
  height: "200px",
  borderRadius: "50%",
});

export const Profile = () => {
  const { userDetails, logout, profile } = useContext(UserContext);

  const userProfile = userDetails[0].userProfile[0];
  const email = userDetails[0].email;
  // console.log(email);

  return (
    <Box
      width="100wh"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid container spacing={6} key={userProfile.id}>
        <Grid
          item
          xs={6}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <CircleImage
            component="img"
            alt="profile image"
            src={profile}
          ></CircleImage>
          <Typography
            fontSize={30}
          >{`${userProfile.first_name} ${userProfile.last_name}`}</Typography>
        </Grid>
        <Grid item xs={6} display="flex" flexDirection="column">
          <Typography fontSize={20}>
            Email : {email}
          </Typography>
          <Typography marginTop="2rem" fontSize={20}>
            Phone : {userProfile.phone}
          </Typography>
          <Typography marginTop="2rem" fontSize={20}>
            Address : {userProfile.address}
          </Typography>
          <Typography marginTop="2rem" fontSize={20}>
            State : {userProfile.state}
          </Typography>
          <Typography marginTop="2rem" fontSize={20}>
            Post Code : {userProfile.post_code}
          </Typography>
          <Button
            style={{ marginTop: "2rem", width: "100px" }}
            variant="contained"
            onClick={logout}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
