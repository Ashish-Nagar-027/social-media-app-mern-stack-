import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import {
  selectProfileUser,
  selectProfileUserFollowers,
  selectProfileUserfollowings,
  setProfileUser,
  setUserFollowers,
  setUserFollowings,
} from "../../features/proFileUserSlice";
import "./userConnections.scss";
import loadingImg from "../../assets/loading.png";
import HandleFollowBtn from "../../components/following Button/HandleFollowBtn";

const UserConnections = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(false);


  const [showFollowers, setShowFollowers] = useState(location.hash.slice(1));

  const handleClick = (path) => {
    navigate("#"+path)
  }

 

  const fetchDataFunction = useCallback(async () => {
    const fetchData = await axios.get(
      `http://localhost:3000/api/v1/user/${params.id}`
    );
    dispatch(setProfileUser(fetchData.data));
  }, [dispatch, params.id]);


  const getUserInfo = useCallback(async () => {
    setFetching(true);
    const url =
      "http://localhost:3000/api/v1/user/" +
      params.id +
      "/get" +
      showFollowers;

    const getUser = await axios.get(url);

    if (showFollowers === "followers") {
      dispatch(setUserFollowers(getUser.data));
    }
    if (showFollowers !== "followers") {
      dispatch(setUserFollowings(getUser.data));
    }
    setFetching(false);
  },[dispatch, params.id,showFollowers])



  useEffect(() => {
    if (location.hash === '#followers') {
      setShowFollowers('followers')
   }
   if (location.hash === '#followings') {
     setShowFollowers('followings')
   }
  
      getUserInfo();
     fetchDataFunction()
  }, [showFollowers, location.hash,getUserInfo, fetchDataFunction]);


  const profileUser = useSelector(selectProfileUser);
  const profileUserFollowings = useSelector(selectProfileUserfollowings);
  const profileUserFollowers = useSelector(selectProfileUserFollowers);
  const connections =
    showFollowers === "followers"
      ? profileUserFollowers
      : profileUserFollowings;

  const defaultProfilePic =
    "https://images.pexels.com/photos/15597897/pexels-photo-15597897.jpeg?cs=srgb&dl=pexels-b%E1%BA%A3o-vi%E1%BB%87t-15597897.jpg&fm=jpg&w=640&h=960&_gl=1*qa7fxa*_ga*MTk5NDIxNjk4Ni4xNjc1NjU4Mzkw*_ga_8JE65Q40S6*MTY4MDQ1MDk3Mi40LjEuMTY4MDQ1MDk4My4wLjAuMA..";

  if (fetching) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={loadingImg} alt="loading" />
      </div>
    );
  }
  return (
    <div className="connections">
      <h2>
        <MdArrowBack className="back-icon" onClick={() => navigate(-1)} />{" "}
        {profileUser?.name}
      </h2>
      <hr />
      <div className="main-div">
        <div className="connections-header">
          <div onClick={() => handleClick("followings")} className={`connection-type ${
                showFollowers !== "followers" ? "connection-active-link" : ""
              } `}>
              
             
            Followings (
            {profileUserFollowings?.length || profileUser?.followings?.length || 0} )
          </div>
          <div onClick={() => handleClick("followers")} className={`connection-type ${
                showFollowers === "followers" ? "connection-active-link" : ""
              } `}>
              
            
            Followers(
            {profileUserFollowers?.length || profileUser?.followers?.length || 0})
          </div>
        </div>
        <div className="connections-div">
          {connections?.map((user) => {
            return (
              <div className="user" key={user._id}>
                <div className="userInfo">
                  <Link className="userInfo" to={`/profile/${user._id}`}>
                    <img alt="profile" src={defaultProfilePic} />
                    <span>{user.name}</span>
                  </Link>
                </div>
                <HandleFollowBtn profileUserId={user._id}  />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserConnections;
