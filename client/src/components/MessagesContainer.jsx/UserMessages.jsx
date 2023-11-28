import React, { useEffect, useRef, useState } from "react";
import "./UserMessages.scss";
import { MdArrowBack } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import {
  selectConversationUser,
  setConversationUser,
} from "../../features/conversationSlice";
import axios from "axios";
import useDateHandler from "../../hooks/useDateHandler";
import { getBaseUrl } from "../../utility/utility";
import LoadingData from "../../components/LoadingData";

var socket;
const UserMessages = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  let otherUserId = id.split("-")[1];
  const scrollRef = useRef();
  const currentUser = useSelector(selectUser);
  const [msgInput, setMessageInput] = useState("");
  const [msgList, setMsgList] = useState(null);
  const conversationsUser = useSelector(selectConversationUser);
  const { formatTimestamp } = useDateHandler();
  const dispatch = useDispatch();
  const [currentConversation, setCurrentConversation] = useState(null);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchDataFunction = async () => {
      setFetching(true);
      const fetchData = await axios.get(
        `${getBaseUrl}/api/v1/user/${otherUserId}`
      );

      dispatch(setConversationUser(fetchData.data));
    };
    fetchDataFunction();
  }, [dispatch, otherUserId]);

  useEffect(() => {
    const fetchDataFunction = async () => {
      setFetching(true);
      const fetchData = await axios.get(
        `${getBaseUrl}/api/v1/conversations/${otherUserId}`,
        {
          method: "GET",
          withCredentials: true,
        }
      );
      setCurrentConversation(...fetchData.data);
    };
    fetchDataFunction();
  }, []);

  useEffect(() => {
    socket = io(getBaseUrl);

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [currentConversation?._id]);

  useEffect(() => {
    try {
      const fetchDataFunction = async () => {
        const fetchData = await axios.get(
          getBaseUrl + `/api/v1/messages/${currentConversation?._id}`
        );
        if (Array.isArray(fetchData.data)) {
          setMsgList(fetchData.data);
        }
        socket.emit("join_chat", currentConversation?._id);
        setFetching(false);
      };
      if (currentConversation?._id) {
        fetchDataFunction();
      }
    } catch (error) {
      setFetching(false);

      console.log(error.message);
    }
  }, [currentConversation?._id]);

  const sendMessage = async () => {
    const msg = {
      conversationId: currentConversation?._id,
      sender: currentUser._id,
      text: msgInput,
    };

    try {
      const postMsg = await axios(getBaseUrl + "/api/v1/messages/", {
        method: "POST",
        withCredentials: true,
        data: msg,
      });

      await socket.emit("new_message", postMsg.data.msg);
    } catch (error) {
      console.log(error);
    }
    setMessageInput("");
  };

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [msgList]);

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMsgList((msgs) => [...msgs, data]);
    });
  }, [setMsgList, socket]);

  return (
    <div className="messages-container">
      <div className="user-msg-top">
        <h2>
          <MdArrowBack className="back-icon" onClick={() => navigate(-1)} />{" "}
          {conversationsUser?.name}
        </h2>
      </div>
      <div className="messages_here">
        <ul>
          {fetching && <LoadingData />}
          {msgList &&
            msgList.map((msgData) => {
              if (msgData.sender === currentUser._id) {
                return (
                  <li className="its_me" key={msgData?._id} ref={scrollRef}>
                    <div className="message_wrapper">{msgData.text}</div>
                    <p>{formatTimestamp(msgData.createdAt)}</p>
                  </li>
                );
              }

              return (
                <li key={msgData._id} ref={scrollRef}>
                  <div className="message_wrapper">{msgData.text}</div>
                  <p>{formatTimestamp(msgData.createdAt)}</p>
                </li>
              );
            })}
          {msgList && msgList?.length === 0 && !fetching && (
            <h2
              style={{
                display: "flex",
                textAlign: "center",
              }}
            >
              you don't have any any messages yet 😅
            </h2>
          )}
        </ul>
      </div>
      <div className="msg_input">
        <div className="svg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-mood-smile-beam"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#00abfb"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 21a9 9 0 1 1 0 -18a9 9 0 0 1 0 18z" />
            <path d="M10 10c-.5 -1 -2.5 -1 -3 0" />
            <path d="M17 10c-.5 -1 -2.5 -1 -3 0" />
            <path d="M14.5 15a3.5 3.5 0 0 1 -5 0" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Start typing here"
          onChange={(e) => setMessageInput(e.target.value)}
          value={msgInput}
        />
        <button className="svg send_svg" onClick={sendMessage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-send"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#00abfb"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 14l11 -11" />
            <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UserMessages;
