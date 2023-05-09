import React, { useEffect, useState } from "react";
import { MdMoreHoriz, MdShare, MdOutlineMessage } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import axios from "axios";

import "./post.scss";
import Comments from "../comments/Comments";
import { setLikes } from "../../features/postSlice";
import { selectUser } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Post = ({ post }) => {
  const [showComment, setShowComment] = useState(false);

  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();

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
  }, [pathLocation, setPathLocation, location, post]);

  const handleLikes = async () => {
    try {
      await axios("http://localhost:3000/api/v1/post/" + post._id + "/like", {
        method: "PUT",
        withCredentials: true,
        data: {
          userId: currentUser._id,
        },
      }).then(() => {
        dispatch(
          setLikes({ postId: post._id, currentUserId: currentUser._id })
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

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
          {post.imageUrl?.url !== undefined ? (
            <img src={post.imageUrl.url} alt="" />
          ) : (
            ""
          )}
        </div>
        <div className="info">
          <div className="item">
            {post.likes.includes(currentUser._id) ? (
              <MdFavorite size={20} onClick={handleLikes} />
            ) : (
              <MdFavoriteBorder onClick={handleLikes} size={20} />
            )}
            <span>{post.likes.length}</span>
          </div>
          <div className="item" onClick={() => setShowComment(!showComment)}>
            <MdOutlineMessage size={20} />
            <span> {post.comments.length} comments</span>
          </div>
          <div className="item">
            <MdShare size={20} />
          </div>
        </div>
        {showComment && <Comments postId={post._id} comments={post.comments} />}
      </div>
    </div>
  );
};

export default Post;
