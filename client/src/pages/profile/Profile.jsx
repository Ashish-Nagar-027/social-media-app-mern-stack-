import React, { useEffect } from "react";
import { MdEmail, MdEdit } from "react-icons/md";

import "./profile.scss";
import Posts from "../../components/Posts/Posts";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  editCurrentUser,
  selectUser,
  setEditProfile,
  setFollowings,
} from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProfileUser,
  setProfileUser,
} from "../../features/proFileUserSlice";
import EditUserInfo from "../../components/Edit-current -user/EditUserInfo";
import loadingImg from "../../assets/loading.png";

const Profile = () => {
  const userId = useParams();
  const currentUser = useSelector(selectUser);

  const dispatch = useDispatch();
  const profileUser = useSelector(selectProfileUser);
  const editUserInfo = useSelector(editCurrentUser);

  useEffect(() => {
    const fetchDataFunction = async () => {
      const fetchData = await axios.get(
        `http://localhost:3001/api/v1/user/${userId.id}`
      );
      dispatch(setProfileUser(fetchData.data));
    };

    fetchDataFunction();
  }, [userId, dispatch]);

  const followingHandling = async (id) => {
    const url = "http://localhost:3000/api/v1/user/" + id + "/";

    if (!currentUser.followings.includes(id)) {
      await axios(url + "follow", {
        method: "PUT",
        withCredentials: true,
      }).then(() => dispatch(setFollowings([...currentUser.followings, id])));
    } else {
      const followingsArray = currentUser.followings;

      let newFollowings = followingsArray.filter(
        (followingId) => followingId !== id
      );

      await axios(url + "unfollow", {
        method: "PUT",
        withCredentials: true,
      }).then(() => dispatch(setFollowings(newFollowings)));
    }
  };

  if (!profileUser) {
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
    <>
      {editUserInfo && <EditUserInfo />}
      <div className="profile">
        <div className="images">
          <img
            src="https://images.pexels.com/photos/15953937/pexels-photo-15953937.jpeg?cs=srgb&dl=pexels-jaime-reimer-15953937.jpg&fm=jpg&_gl=1*srqdvs*_ga*MTk5NDIxNjk4Ni4xNjc1NjU4Mzkw*_ga_8JE65Q40S6*MTY4MDQ5MjAzMi41LjEuMTY4MDQ5MzQ1Ny4wLjAuMA"
            alt=""
            className="cover"
          />

          <img
            src="https://images.pexels.com/photos/15656117/pexels-photo-15656117.jpeg?cs=srgb&dl=pexels-aliakbar-nosrati-15656117.jpg&fm=jpg&w=640&h=760&_gl=1*rixznq*_ga*MTk5NDIxNjk4Ni4xNjc1NjU4Mzkw*_ga_8JE65Q40S6*MTY4MDkyNzY2NC42LjEuMTY4MDkyNzc1My4wLjAuMA.."
            alt=""
            className="profilePic"
          />
        </div>
        <div className="profileContainer">
          <div className="userInfo">
            <div className="center">
              {/* <p>This is some user infomation. Don't write too much here</p> */}
              <div className="connections-div">
                <p className="followers">
                  <Link to="connections" state={{ show: "followers" }}>
                    Followers : {profileUser?.followers.length}
                  </Link>
                </p>
                <p className="followings">
                  <Link to="connections" state={{ show: "followings" }}>
                    Followings : {profileUser?.followings.length}
                  </Link>
                </p>
              </div>
              <span>{profileUser?.name}</span>
              {currentUser?._id !== profileUser?._id && (
                <button onClick={() => followingHandling(profileUser._id)}>
                  {profileUser
                    ? currentUser?.followings.includes(profileUser._id)
                      ? "following"
                      : "follow"
                    : "follow"}
                </button>
              )}
            </div>
            <div className="right">
              <MdEmail className="message-icon" fontSize={24} />
              {currentUser?._id === profileUser?._id && (
                <button
                  className="profile-edit-button"
                  onClick={() => dispatch(setEditProfile())}
                >
                  Edit profile
                  <MdEdit fontSize={15} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 10 }}>
        <Posts id={userId.id} />
      </div>
    </>
  );
};

export default Profile;
