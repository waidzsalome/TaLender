import { Routes, Route } from "react-router";
import { Box } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Mainpage from "./MainPage/Mainpage";
import Profilepage from "./ProfilePage/Profilepage";
import Swipepage from "./SwipePage/Swipepage";
import Chatpage from "./ChatPage/Chatpage";
import ManagePage from "./MangementPage/ManagePage";
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
  return (
    <Box>
      <Header />
      <Routes>
        {routesMap.map((routeItem) => (
          <Route path={routeItem.path} element={routeItem.element} />
        ))}
      </Routes>
      <Footer />
    </Box>
  );
};

export default App;
