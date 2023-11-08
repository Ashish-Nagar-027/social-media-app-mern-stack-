import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { MdEmail, MdEdit } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./profile.scss";
import Posts from "../../components/Posts/Posts";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { selectUser, setEditProfile } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProfileUser,
  setProfileUser,
} from "../../features/proFileUserSlice";

import HandleFollowBtn from "../../components/following Button/HandleFollowBtn";
import { getBaseUrl } from "../../utility/utility";

const Profile = () => {
  const userId = useParams();
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const profileUser = useSelector(selectProfileUser);
  const [fetching, setFetching] = useState(false);

  const fetchDataFunction = useCallback(async () => {
    setFetching(true);

    const fetchData = await axios.get(
      `${getBaseUrl}/api/v1/user/${userId.id}`,
      {
        method: "GET",
        withCredentials: true,
      }
    );
    dispatch(setProfileUser(fetchData.data));
    setFetching(false);
  }, [userId.id, dispatch]);

  useEffect(() => {
    fetchDataFunction();
  }, [userId.id, fetchDataFunction]);

  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
    return () => {
      scrollRef?.current?.removeEventListener("scroll", () => {});
    };
  }, [userId.id]);

  return (
    <>
      <div className="profile" ref={scrollRef}>
        <div className="images">
          {profileUser?.coverPic?.url ? (
            <img src={profileUser?.coverPic.url} alt="" className="cover" />
          ) : (
            <div className="cover bg-blank-img"></div>
          )}

          {!fetching && profileUser?.profilePic?.url ? (
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
              <span>
                {fetching ? (
                  <Skeleton height={"1rem"} width={"5rem"} />
                ) : (
                  profileUser?.name
                )}
              </span>
              <div className="connections-div">
                <p className="followers">
                  {fetching ? (
                    <Skeleton height={"1rem"} width={"5rem"} />
                  ) : (
                    <Link to="connections/followers">
                      Followers : {profileUser?.followers?.length}
                    </Link>
                  )}
                </p>
                <p className="followings">
                  {fetching ? (
                    <Skeleton height={"1rem"} width={"5rem"} />
                  ) : (
                    <Link to="connections/followings">
                      Followings : {profileUser?.followings?.length}
                    </Link>
                  )}
                </p>
              </div>
              {fetching ? (
                <Skeleton height={"2rem"} width={"6rem"} />
              ) : (
                currentUser?._id !== profileUser?._id && (
                  <HandleFollowBtn profileUserId={profileUser?._id} />
                )
              )}
            </div>
            <div className="right">
              {fetching ? (
                <Skeleton height={"2rem"} width={"2rem"} />
              ) : (
                currentUser?._id !== profileUser?._id && (
                  <Link
                    to={`/messages/${currentUser?._id}-${profileUser?._id}`}
                  >
                    <MdEmail className="message-icon" fontSize={24} />
                  </Link>
                )
              )}
              {!fetching && currentUser?._id === profileUser?._id && (
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

export default memo(Profile);
