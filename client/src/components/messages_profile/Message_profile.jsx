import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";

import "./message_profile.scss";

const Message_profile = () => {
  const user = useState([]);

  return (
    <div className="msg-profile-user" key={user._id || "random"}>
      <div className="userInfo">
        <div className="userInfo">
          {user?.profilePic?.url ? (
            <img
              className="profile-img"
              src={user.profilePic.url}
              alt={user.name}
            />
          ) : (
            <CgProfile size={30} />
          )}
          <span>{user.name || "Ashish nagar"} </span>
        </div>
      </div>
    </div>
  );
};

export default Message_profile;
