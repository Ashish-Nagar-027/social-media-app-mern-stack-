import React, { useState } from "react";
import { MdMoreHoriz, MdShare, MdOutlineMessage } from "react-icons/md";
import { Link } from "react-router-dom";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

import "./post.scss";
import Comments from "../comments/Comments";

const Post = ({ post }) => {
  const Linked = false;

  const [showComment, setShowComment] = useState(false);

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt={post.name} />
            <div className="details">
              <Link to={`./profile/${post.owner}`}>
                <span>{post.name}</span>
                <span>1 min ago</span>
              </Link>
            </div>
          </div>
          <MdMoreHoriz />
        </div>
        <div className="content">
          <p>{post.caption}</p>
          <img src={post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {Linked ? <MdFavorite size={20} /> : <MdFavoriteBorder size={20} />}
            <span> 12 Likes</span>
          </div>
          <div className="item" onClick={() => setShowComment(!showComment)}>
            <MdOutlineMessage size={20} />
            <span> 12 comments</span>
          </div>
          <div className="item">
            <MdShare size={20} />
          </div>
        </div>
        {showComment && <Comments />}
      </div>
    </div>
  );
};

export default Post;
