import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import {
  selectProfileUser,
  selectProfileUserFollowers,
  selectProfileUserfollowings,
  setUserFollowers,
  setUserFollowings,
} from "../../features/proFileUserSlice";
import "./userConnections.scss";

const UserConnections = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [showFollowers, setShowFollowers] = useState(() => {
    if (location.state.show) {
      return location.state.show;
    }
    return "followers";
  });

  useEffect(() => {
    const getUserInfo = async () => {
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
    };
    getUserInfo();
  }, [showFollowers]);

  const profileUser = useSelector(selectProfileUser);
  const profileUserFollowings = useSelector(selectProfileUserfollowings);
  const profileUserFollowers = useSelector(selectProfileUserFollowers);
  const connections =
    showFollowers === "followers"
      ? profileUserFollowers
      : profileUserFollowings;

  const defaultProfilePic =
    "https://images.pexels.com/photos/15597897/pexels-photo-15597897.jpeg?cs=srgb&dl=pexels-b%E1%BA%A3o-vi%E1%BB%87t-15597897.jpg&fm=jpg&w=640&h=960&_gl=1*qa7fxa*_ga*MTk5NDIxNjk4Ni4xNjc1NjU4Mzkw*_ga_8JE65Q40S6*MTY4MDQ1MDk3Mi40LjEuMTY4MDQ1MDk4My4wLjAuMA..";

  return (
    <div className="connections">
      <h2>
        <MdArrowBack className="back-icon" onClick={() => navigate(-1)} />{" "}
        {profileUser?.name}
      </h2>
      <hr />
      <div className="main-div">
        <div className="connections-header">
          <div
            className={`connection-type ${
              showFollowers !== "followers" ? "connection-active-link" : ""
            } `}
            onClick={() => setShowFollowers("followings")}
          >
            Followings ({profileUserFollowings?.length || 0} )
          </div>
          <div
            className={`connection-type ${
              showFollowers === "followers" ? "connection-active-link" : ""
            } `}
            onClick={() => setShowFollowers("followers")}
          >
            Followers({profileUserFollowers?.length || 0})
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
                <button>follow</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserConnections;
