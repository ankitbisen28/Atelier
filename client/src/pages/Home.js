import { Button, Container, Grid, Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import UserContext from "../Context/UserContext";
import { Category } from "../components/Category";
import { Banner } from "../components/Banner";
import { Services } from "../components/Services";
import { ClothCategory } from "../components/ClothCategory";

export const Home = () => {
  const { logout } = useContext(UserContext);

  return (
    <>
      <Container style={{ maxWidth: "1350px" }}>
        <Grid
          container
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          marginTop={9}
          height={{ xs: "0", lg: "70vh" }}
        >
          <Grid item xs={4} style={{ paddingLeft: "0", paddingTop: "0" }}>
            <Category />
          </Grid>
          <Grid item xs={8} style={{ paddingLeft: "0", paddingTop: "0" }}>
            <Banner />
          </Grid>
        </Grid>
        <Services />
        <Typography variant="h4" textAlign="center" mt={3}>Explore Category</Typography>
        <Box display="flex" flexDirection="row" gap={7}>
          <ClothCategory />
          <ClothCategory />
          <ClothCategory />
        </Box>
        <Button color="error" onClick={logout}>
          Logout
        </Button>
      </Container>
    </>
  );
};
