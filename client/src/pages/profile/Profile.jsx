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
import HandleFollowBtn from "../../components/following Button/HandleFollowBtn";
import LoadingData from "../../components/LoadingData";
import { getBaseUrl } from "../../utility/utility";

const Profile = () => {
  const userId = useParams();
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const profileUser = useSelector(selectProfileUser);
  const [fetching, setFetching] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const editUserInfo = useSelector(editCurrentUser);

  useEffect(() => {
    userId?.id === currentUser?._id ? setIsAdmin(true) : setIsAdmin(false);
  }, [userId, currentUser, setIsAdmin]);

  useEffect(() => {
    const fetchDataFunction = async () => {
      setFetching(true);
      const fetchData = await axios.get(`/api/v1/user/${userId.id}`, {
        method: "GET",
        withCredentials: true,
      });
      dispatch(setProfileUser(fetchData.data));
      setFetching(false);
    };

    if (isAdmin) {
      setProfileUser(currentUser);
    } else {
      fetchDataFunction();
    }
  }, [userId, dispatch, setFetching, isAdmin, currentUser]);

  if (fetching && !currentUser) {
    return <LoadingData />;
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
                  <Link to="connections/followers">
                    Followers : {profileUser?.followers.length}
                  </Link>
                </p>
                <p className="followings">
                  <Link to="connections/followings">
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
