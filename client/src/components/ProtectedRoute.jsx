import { useEffect } from "react";
import { loginUser, selectUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector(selectUser)?._id;

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
          return navigate("/login");
        }
      } catch (error) {
        console.log(error);
        console.log(error);
      }
    };
    if (!currentUser) {
      checkUser();
    }
  }, [currentUser, dispatch, navigate]);

  return children;
};

export default ProtectedRoute;
