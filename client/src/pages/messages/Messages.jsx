import React, { memo, useCallback, useEffect, useState } from "react";
import MessageProfile from "../../components/messages_profile/Messageprofile";
import "./messages.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import axios from "axios";
import LoadingData from "../../components/LoadingData";
import {
  selectConversation,
  setConversation,
} from "../../features/conversationSlice";
import { getBaseUrl } from "../../utility/utility";
import { toast } from "sonner";

const Messages = () => {
  const [fetching, setFetching] = useState(false);
  const [searchUserInput, SetSearchUserInput] = useState("");
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

  const handleUserSearchInput = (e) => {
    SetSearchUserInput(e.target.value);
    toast.warning("Search User Feature Will Be Available Soon.", {
      className: "my-classname",
      duration: 1000,
    });
  };

  return (
    <div className="container">
      <input
        className="serach_input"
        type="text"
        placeholder="Search Dirct Messages"
        value={searchUserInput}
        onChange={handleUserSearchInput}
      ></input>
      {fetching && !conversations && <LoadingData />}
      {!fetching && conversations?.length === 0 ? (
        <h2>you don't have any previous conversation</h2>
      ) : (
        conversations?.map((conversation) => {
          const otherUserId = conversation?.members.filter(
            (userId) => userId !== currentUser._id
          )[0];

          return (
            <MessageProfile
              key={conversation._id}
              otherUserId={otherUserId}
              conversationId={conversation._id}
            />
          );
        })
      )}
    </div>
  );
};

export default memo(Messages);
