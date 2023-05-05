import LeftBar from "./components/leftBar/LeftBar";
import Navbar from "./components/navbar/Navbar";
import RightBar from "./components/rightBar/RightBar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./style.scss";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import UserConnections from "./pages/userConnections/UserConnections";

function App() {
  const currentUser = useSelector(selectUser);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const Layout = () => {
    return (
      <>
        <Navbar />
        <div
          style={{
            display: "flex",
            padding: "1rem",
            backgroundColor: " #f5f7f8",
          }}
        >
          <LeftBar />
          <div className="centerBar">
            <Outlet />
          </div>
          <RightBar />
        </div>
      </>
    );
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="profile/:id/connections" element={<UserConnections />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
