import React, { useEffect, useState } from "react";
import { MdEmail, MdEdit } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

import "./profile.scss";
import Posts from "../../components/Posts/Posts";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  editCurrentUser,
  selectUser,
  setEditProfile,
} from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProfileUser,
  setProfileUser,
} from "../../features/proFileUserSlice";
import EditUserInfo from "../../components/Edit-current -user/EditUserInfo";
import loadingImg from "../../assets/loading.png";

import HandleFollowBtn from "../../components/following Button/HandleFollowBtn";

const Profile = () => {
  const userId = useParams();
  const currentUser = useSelector(selectUser);

  const dispatch = useDispatch();
  const profileUser = useSelector(selectProfileUser);
  const editUserInfo = useSelector(editCurrentUser);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchDataFunction = async () => {
      setFetching(true);
      const fetchData = await axios.get(
        `http://localhost:3001/api/v1/user/${userId.id}`
      );
      dispatch(setProfileUser(fetchData.data));
      setFetching(false);
    };

    fetchDataFunction();
  }, [userId, dispatch, setFetching]);

  if (fetching && !currentUser) {
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
          {profileUser?.coverPic?.url ? (
            <img src={profileUser?.coverPic.url} alt="" className="cover" />
          ) : (
            <div className="cover bg-blank-img"></div>
          )}

          {profileUser?.profilePic?.url ? (
            <img
              src={profileUser?.profilePic?.url}
              alt=""
              className="profilePic"
            />
          ) : (
            <CgProfile className="profilePic profile-blank-img" />
          )}
        </div>
        <div className="profileContainer">
          <div className="userInfo">
            <div className="center">
              <span>{profileUser?.name}</span>
              <div className="connections-div">
                <p className="followers">
                  <Link to="connections#followers">
                    Followers : {profileUser?.followers.length}
                  </Link>
                </p>
                <p className="followings">
                  <Link to="connections#followings">
                    Followings : {profileUser?.followings.length}
                  </Link>
                </p>
              </div>
              {currentUser?._id !== profileUser?._id && (
                <HandleFollowBtn profileUserId={profileUser?._id} />
              )}
            </div>
            <div className="right">
              {currentUser?._id !== profileUser?._id && (
                <Link to={`/messages/${currentUser?._id}-${profileUser?._id}`}>
                  <MdEmail className="message-icon" fontSize={24} />
                </Link>
              )}
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
