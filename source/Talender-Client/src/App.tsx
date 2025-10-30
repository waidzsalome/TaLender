import { Routes, Route } from "react-router";
import { Box } from "@mui/material";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Mainpage from "./MainPage/Mainpage";
import Profilepage from "./ProfilePage/Profilepage";
import Swipepage from "./SwipePage/Swipepage";
import Chatpage from "./ChatPage/Chatpage";
import ManagePage from "./MangementPage/ManagePage";
import Tailoredpage from "./TailoredPage/Tailoredpage";
import LoginRequired from "./components/LoginRequired";

const routesMap = [
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

const App: React.FC = () => {
  return (
    <Box>
      <Header />
      <Routes>
        {/* public webpage */}
        <Route path="/" element={<Mainpage />} />
        <Route path="/loginrequired" element={<LoginRequired />} />
        {/* protected webpage */}
        {routesMap.map((routeItem) => (
          <Route
            path={routeItem.path}
            element={<ProtectedRoute>{routeItem.element}</ProtectedRoute>}
          />
        ))}
      </Routes>
      <Footer />
    </Box>
  );
};

export default App;
