import React from "react";
import { useNavigate } from "react-router";
import { AppBar, IconButton, Grid, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const handleClickHomeButton = () => {
    return navigate("/");
  };
  const handleClickMailButton = () => {
    return navigate("/chatpage");
  };
  const handleClickAccountButton = () => {
    return navigate("/profilepage");
  };
  return (
    <AppBar position="static" sx={{ height: "6vh" }}>
      <Grid
        container
        sx={{
          alignItems: "center",
        }}
      >
        <Grid size={4}>
          <IconButton onClick={handleClickHomeButton}>
            <HomeIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Grid>
        <Grid size={4} textAlign="center">
          <Typography variant="h4" onClick={handleClickHomeButton}>
            Talender
          </Typography>
        </Grid>
        <Grid
          size={4}
          container
          direction="row"
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid size="grow" />
          <Grid size={3}>
            <IconButton onClick={handleClickMailButton}>
              <MailIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Grid>
          <Grid size={3}>
            <IconButton>
              <NotificationsIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Grid>
          <Grid size={3}>
            <IconButton onClick={handleClickAccountButton}>
              <AccountCircleIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Grid>
          {/* <Grid size="grow" /> */}
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Header;
