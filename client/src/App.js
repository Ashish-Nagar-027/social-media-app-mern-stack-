
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Bookmarked from "./components/Bookmarked posts/Bookmarked"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./style.scss";
import UserConnections from "./pages/userConnections/UserConnections";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout/Layout";
import Messages from "./pages/messages/Messages";
import UserMessages from "./components/MessagesContainer.jsx/UserMessages";



function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/"  element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }  >
          <Route index element={<Home />} />
          <Route path="bookmarks" element={<Bookmarked />} />
          <Route path="messages" element={<Messages />} />
          <Route path="messages/:id" element={<UserMessages />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="profile/:id/connections" element={<UserConnections />} />
          <Route path="profile/:id/connections" element={<UserConnections />} >
            <Route path="followings" element={<UserConnections />} />
            <Route path="followers" element={<UserConnections/> }/>
          </Route>
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
