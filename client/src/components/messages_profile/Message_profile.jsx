import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";

import "./message_profile.scss";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import axios from "axios";

const Message_profile = ({ user }) => {
  // console.log(user);
  const currentUser = useSelector(selectUser);
  const otherUserId = user?.members.filter(
    (userId) => userId !== currentUser._id
  );

  const [msgUser, setMsgUser] = useState();

  useEffect(() => {
    const fetchDataFunction = async () => {
      const fetchData = await axios.get(
        `http://localhost:3001/api/v1/user/${otherUserId[0]}`
      );
      setMsgUser(fetchData.data);
    };
    fetchDataFunction();
  }, []);

  if (msgUser) {
    return (
      <div className="msg-profile-user">
        <div className="userInfo">
          <div className="userInfo">
            {msgUser.profilePic?.url ? (
              <img
                className="profile-img"
                src={msgUser.profilePic.url}
                alt={msgUser.name}
              />
            ) : (
              <CgProfile size={30} />
            )}
            <span>{msgUser.name} </span>
          </div>
        </div>
      </div>
    );
  }
};

export default Message_profile;
