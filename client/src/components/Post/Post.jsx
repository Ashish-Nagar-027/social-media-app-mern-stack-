import React, { useEffect, useState } from "react";
import { MdMoreHoriz, MdShare, MdOutlineMessage } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

import "./post.scss";
import Comments from "../comments/Comments";

const Post = ({ post }) => {
  const Linked = false;

  const [showComment, setShowComment] = useState(false);

  const defaultProfilePic =
    "https://images.pexels.com/photos/15597897/pexels-photo-15597897.jpeg?cs=srgb&dl=pexels-b%E1%BA%A3o-vi%E1%BB%87t-15597897.jpg&fm=jpg&w=640&h=960&_gl=1*qa7fxa*_ga*MTk5NDIxNjk4Ni4xNjc1NjU4Mzkw*_ga_8JE65Q40S6*MTY4MDQ1MDk3Mi40LjEuMTY4MDQ1MDk4My4wLjAuMA..";

  const location = useLocation();
  const [pathLocation, setPathLocation] = useState(null);
  useEffect(() => {
    const pathName = () => {
      if (!location.pathname.split("/")[1] === "profile") {
        setPathLocation(`/${post.user.userId}`);
      }
      return setPathLocation(`/profile/${post.user.userId}`);
    };
    pathName();
  }, [pathLocation, setPathLocation, location]);

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={defaultProfilePic} alt={post.name} />
            <div className="details">
              <Link to={pathLocation}>
                <span>{post.user.name}</span>
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
