import React, { useEffect, useRef, useState } from "react";
import "./UserMessages.scss";
import { MdArrowBack } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { selectConversationUser } from "../../features/conversationSlice";
import axios from "axios";
import useDateHandler from "../../hooks/useDateHandler";

var socket;
const UserMessages = () => {
  const navigate = useNavigate();
  const params = useParams();
  const scrollRef = useRef();
  const currentUser = useSelector(selectUser);
  const [msgInput, setMessageInput] = useState("");
  const [msgList, setMsgList] = useState([]);
  const conversationsUser = useSelector(selectConversationUser);
  const { formatTimestamp } = useDateHandler();

  useEffect(() => {
    socket = io(getBaseUrl);

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchDataFunction = async () => {
      const fetchData = await axios.get(`/api/v1/messages/${params.id}`);
      setMsgList(fetchData.data);
      socket.emit("join_chat", params.id);
    };
    fetchDataFunction();
  }, [params.id]);

  const sendMessage = async () => {
    const msg = {
      conversationId: params.id,
      sender: currentUser._id,
      text: msgInput,
    };

    try {
      const postMsg = await axios("/api/v1/messages/", {
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
  }, [setMsgList]);

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
          {msgList.map((msgData) => {
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
