import { AppBar, Box, IconButton, Grid, Typography } from "@mui/material";
import { Routes, Route, useNavigate } from "react-router";
import Mainpage from "./MainPage/Mainpage";
import Profilepage from "./ProfilePage/Profilepage";
import Swipepage from "./SwipePage/Swipepage";
import Chatpage from "./ChatPage/Chatpage";
import ManagePage from "./MangementPage/ManagePage";
import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Tailoredpage from "./TailoredPage/Tailoredpage";

const routesMap = [
  {
    path: "/",
    element: <Mainpage />,
  },
  {
    path: "profilepage",
    element: <Profilepage />,
  },
  {
    path: "/swipepage",
    element: <Swipepage />,
  },
  {
    path: "/tailoredpage",
    element: <Tailoredpage />,
  },
  {
    path: "/chatpage",
    element: <Chatpage />,
  },
  {
    path: "/managepage",
    element: <ManagePage />,
  },
];

const App = () => {
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Grid
          container
          sx={{
            alignItems: "center",
            p: "5px",
          }}
        >
          <Grid size={4}>
            <IconButton onClick={handleClickHomeButton}>
              <HomeIcon fontSize="large" />
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
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Grid size={2}>
              <IconButton onClick={handleClickMailButton}>
                <MailIcon fontSize="large" />
              </IconButton>
            </Grid>
            <Grid size={2}>
              <IconButton>
                <NotificationsIcon fontSize="large" />
              </IconButton>
            </Grid>
            <Grid size={2}>
              <IconButton onClick={handleClickAccountButton}>
                <AccountCircleIcon fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </AppBar>

      <Routes>
        {routesMap.map((routeItem) => (
          <Route path={routeItem.path} element={routeItem.element} />
        ))}
      </Routes>
    </Box>
  );
};

export default App;
