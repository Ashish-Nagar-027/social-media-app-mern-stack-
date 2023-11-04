import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import "./rightbar.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import HandleFollowBtn from "../following Button/HandleFollowBtn";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import { getBaseUrl } from "../../utility/utility";
import { RightbarSkeleton } from "../Skeletons/Skeletons.jsx";

const RightBar = () => {
  const [suggestUsers, setSuggestUsers] = useState(null);
  const currentUser = useSelector(selectUser);

  useEffect(() => {
    const getSuggestUserFunction = async () => {
      if (currentUser?._id) {
        const fetchSuggestUser = await axios.get(
          `${getBaseUrl}/api/v1/user/${currentUser?._id}/suggestusers`
        );
        setSuggestUsers(fetchSuggestUser.data);
      }
    };
    getSuggestUserFunction();
  }, [setSuggestUsers, currentUser?._id]);

  return (
    <div className="rightbar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          {suggestUsers ? (
            suggestUsers.map((user) => {
              return (
                <div className="user" key={user._id}>
                  <div className="userInfo">
                    <Link className="userInfo" to={`/profile/${user._id}`}>
                      {user.profilePic?.url ? (
                        <img
                          className="profile-img"
                          src={user.profilePic.url}
                          alt={user.name}
                        />
                      ) : (
                        <CgProfile size={32} />
                      )}
                      <span>{user.name} </span>
                    </Link>
                  </div>
                  <div className="buttons">
                    {user ? (
                      <HandleFollowBtn profileUserId={user._id} />
                    ) : (
                      <RightbarSkeleton />
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <RightbarSkeleton items={5} />
          )}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
