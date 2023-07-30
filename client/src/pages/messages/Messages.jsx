import React, { useEffect, useState } from "react";
import Message_profile from "../../components/messages_profile/Message_profile";
import "./messages.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import axios from "axios";
import LoadingData from "../../components/LoadingData";
import {
  selectConversation,
  setConversation,
} from "../../features/conversationSlice";

const Messages = () => {
  const currentUser = useSelector(selectUser);

  const [fetching, setFetching] = useState(false);

  const dispatch = useDispatch();

  const conversations = useSelector(selectConversation);

  useEffect(() => {
    const fetchConnections = async () => {
      setFetching(true);
      let url = `http://localhost:3001/api/v1/conversations/${currentUser?._id}`;
      const fetchData = await axios.get(url);

      dispatch(setConversation(fetchData.data));
      setFetching(false);
    };

    fetchConnections();
  }, [currentUser?._id]);

  return (
    <div className="container">
      <Link className="serach_component" to={"/messages/id"}>
        <h3>Search Profile</h3>
      </Link>

      {fetching && !conversations && <LoadingData />}

      {!fetching && conversations?.length === 0 ? (
        <h2>you don't have any previous conversation</h2>
      ) : (
        conversations?.map((conversation) => {
          return (
            <Link
              key={conversation._id}
              className="user-msg-profile"
              to={"/messages/" + conversation._id}
            >
              <Message_profile user={conversation} />
            </Link>
          );
        })
      )}
    </div>
  );
};

export default Messages;
