import React, { memo, useEffect } from "react";
import { CgProfile } from "react-icons/cg";

import "./message_profile.scss";
import { selectUser } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  selectConversationUser,
  setConversationUser,
} from "../../features/conversationSlice";

const MessageProfile = ({ user }) => {
  const currentUser = useSelector(selectUser);
  const otherUserId = user?.members.filter(
    (userId) => userId !== currentUser._id
  )[0];

  const dispatch = useDispatch();
  const conversationsUser = useSelector(selectConversationUser);

  useEffect(() => {
    const fetchDataFunction = async () => {
      const fetchData = await axios.get(
        `http://localhost:3001/api/v1/user/${otherUserId}`
      );
      dispatch(setConversationUser(fetchData.data));
    };
    fetchDataFunction();
  }, [dispatch, otherUserId]);

  if (conversationsUser) {
    return (
      <div className="msg-profile-user">
        <div className="userInfo">
          <div className="userInfo">
            {conversationsUser.profilePic?.url ? (
              <img
                className="profile-img"
                src={conversationsUser.profilePic.url}
                alt={conversationsUser.name}
              />
            ) : (
              <CgProfile size={30} />
            )}
            <span>{conversationsUser.name} </span>
          </div>
        </div>
      </div>
    );
  }
};

export default memo(MessageProfile);
