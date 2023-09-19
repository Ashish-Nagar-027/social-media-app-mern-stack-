import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { setProfileUser, setUserFollowers, setUserFollowings } from "../features/proFileUserSlice";
import axios from "axios";

 const useHandleConnections = () => {
  const location = useLocation()
   const params = useParams();

 const [showFollowers, setShowFollowers] = useState(
    location.pathname.split("/").at(-1)
  )

  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(false);

  const getUserInfo = useCallback(async () => {
    setFetching(true);

    const url =
      "http://localhost:3000/api/v1/user/" + params.id + "/get" + showFollowers;

    const getUser = await axios.get(url);
  
    if (showFollowers === "followers") {
      dispatch(setUserFollowers(getUser.data));
    }
    if (showFollowers !== "followers") {
      dispatch(setUserFollowings(getUser.data));
    }
    setFetching(false);
  }, [dispatch,showFollowers]);


    const fetchDataFunction = useCallback(async () => {
    const fetchData = await axios.get(
      `http://localhost:3000/api/v1/user/${params.id}`
    );
    dispatch(setProfileUser(fetchData.data));
  }, [params.id,dispatch]);

  
  useEffect(() => {
    setShowFollowers(location.pathname.split("/").at(-1));
    getUserInfo();
    fetchDataFunction();
  }, [location.pathname, setShowFollowers, fetchDataFunction, getUserInfo]);


    return {
    fetching,  showFollowers, setShowFollowers,getUserInfo, fetchDataFunction
    }
}

export default useHandleConnections