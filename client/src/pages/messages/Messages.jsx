import React from "react";
import Message_profile from "../../components/messages_profile/Message_profile";
import "./messages.scss";
import { Link } from "react-router-dom";

const Messages = () => {
  return (
    <div className="container">
      <Link className="serach_component" to={"/messages/id"}>
        <h3>Search Profile</h3>
      </Link>
      <Link className="user-msg-profile" to={"/messages/id"}>
        <Message_profile />
      </Link>
      <Link className="user-msg-profile" to={"/messages/id"}>
        <Message_profile />
      </Link>
      <Link className="user-msg-profile" to={"/messages/id"}>
        <Message_profile />
      </Link>
    </div>
  );
};

export default Messages;
