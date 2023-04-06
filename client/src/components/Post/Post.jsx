import React from "react";
import { MdMoreHoriz } from "react-icons/md";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  return (
    <div className="post">
      <div className="user">
        <div className="userInfo">
          <img src={post.profilePic} alt={post.name} />
          <div className="details">
            <Link to={`profile/${post.userId}`}>
              <span>{post.name}</span>
            </Link>
          </div>
        </div>
        <MdMoreHoriz />
      </div>
      <div className="content"></div>
      <div className="info"></div>
    </div>
  );
};

export default Post;
