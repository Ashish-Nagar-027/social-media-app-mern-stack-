import React, { memo, useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";

import "./message_profile.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { getBaseUrl } from "../../utility/utility";
import { selectUser } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const MessageProfile = ({ otherUserId, conversationId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);

  const [msgProfileUser, setMsgProfileUser] = useState("");

  useEffect(() => {
    const fetchDataFunction = async () => {
      const fetchData = await axios.get(
        `${getBaseUrl}/api/v1/user/${otherUserId}`
      );
      setMsgProfileUser(fetchData.data);
    };
    fetchDataFunction();
  }, [dispatch, otherUserId]);

  const deleteConversationFunction = async (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure, you wanna Delete This Conversation ?")) {
      // console.log(conversationId);
      await axios
        .delete(`${getBaseUrl}/api/v1/conversations/${conversationId}`, {
          withCredentials: true,
        })
        .then((d) => console.log(d.data));
    }
  };
  const handleMsgProfileUser = (e) => {
    if (e.target.className === "msg-profile-user user-msg-profile") {
      navigate(`/messages/${currentUser?._id}-${otherUserId}`);
    }
  };

  if (msgProfileUser)
    return (
      <div
        className="msg-profile-user user-msg-profile"
        onClick={handleMsgProfileUser}
      >
        <div className="userInfo">
          <div className="userInfo">
            {msgProfileUser?.profilePic?.url ? (
              <img
                className="profile-img"
                src={msgProfileUser?.profilePic?.url}
                alt={msgProfileUser?.name}
              />
            ) : (
              <CgProfile size={30} />
            )}
            <span>{msgProfileUser?.name} </span>
          </div>
        </div>
        <button
          className="delete-profile-button"
          onClick={deleteConversationFunction}
        >
          delete
        </button>
      </div>
    );
};

export default memo(MessageProfile);
