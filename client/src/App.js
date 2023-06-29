import LeftBar from "./components/leftBar/LeftBar";
import Navbar from "./components/navbar/Navbar";
import RightBar from "./components/rightBar/RightBar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Bookmarked from "./components/Bookmarked posts/Bookmarked"
import {
  createBrowserRouter,
  createRoutesFromElements,

  Outlet,
  Route,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectUser } from "./features/userSlice";
import UserConnections from "./pages/userConnections/UserConnections";
import { useEffect } from "react";




function App() {
  const currentUser = useSelector(selectUser);
  
  const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
  const dispatch = useDispatch()

  
        useEffect(() => {
         
          const checkUser = async () => {
            try {
              const data = await fetch("/api/v1/auth/getuser", {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                credentials: "include",
              });
              const jsonData = await data.json();
    
              if (data.ok) { 
             
                dispatch(loginUser(jsonData));
               return navigate("/");
              } else {
                return navigate('/login')
              }
            } catch (error) {
        console.log(error)
            }
          }
          if (!currentUser) {
            checkUser()
        }
        }, [])

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
          <Route path="bookmarks" element={<Bookmarked />} />
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
