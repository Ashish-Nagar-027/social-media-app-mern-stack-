import React, { memo, useCallback, useEffect, useState } from "react";
import MessageProfile from "../../components/messages_profile/Messageprofile";
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
import { getBaseUrl } from "../../utility/utility";

const Messages = () => {
  const [fetching, setFetching] = useState(false);
  const currentUser = useSelector(selectUser);

  const dispatch = useDispatch();

  const conversations = useSelector(selectConversation);

  const fetchConnections = useCallback(async () => {
    setFetching(true);

    let url = getBaseUrl + `/api/v1/conversations/${currentUser?._id}`;

    const fetchData = await axios.get(url, {
      method: "GET",
      withCredentials: true,
    });

    dispatch(setConversation(fetchData.data));
    setFetching(false);
  }, [currentUser?._id, dispatch]);

  useEffect(() => {
    fetchConnections();
  }, [fetchConnections]);

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
          const otherUserId = conversation?.members.filter(
            (userId) => userId !== currentUser._id
          )[0];

          return (
            // <Link
            //   key={conversation._id}
            //   className="user-msg-profile"
            //   to={`/messages/${currentUser?._id}-${otherUserId}`}
            // >
            <MessageProfile
              key={conversation._id}
              otherUserId={otherUserId}
              conversationId={conversation._id}
            />
            // </Link>
          );
        })
      )}
    </div>
  );
};

export default memo(Messages);
