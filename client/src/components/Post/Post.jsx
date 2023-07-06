import React, { useEffect, useState } from "react";
import {MdFavoriteBorder, MdFavorite, MdMoreHoriz, MdShare, MdOutlineMessage,MdBookmarkBorder,MdBookmark } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

import "./post.scss";
import Comments from "../comments/Comments";
import { selectPosts, setLikes, setPosts } from "../../features/postSlice";
import { selectUser, setBookmarks } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";

const Post = ({ post }) => {
  const [showComment, setShowComment] = useState(false);
  const [showMoreBtn, setShowMoreBtn] = useState(false);

  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();

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
  }, [ location.pathname, post?.user]);
 

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

  const handleBookmarkedPost = async () => {
    try {
      await axios("http://localhost:3000/api/v1/post/" + post._id + "/bookmark", {
        method: "PUT",
        withCredentials: true,
      }).then((d) => {
    
        dispatch(
          setBookmarks({ postId: post._id })
        );
      });
    } catch (error) {
      console.log(error);
    }
  };




  const showMoreBtnHandler = () => {
    setShowMoreBtn(!showMoreBtn);
  };

  const timeLinePosts = useSelector(selectPosts);

  const deletePostFunction = async () => {
    try {
      await axios("http://localhost:3000/api/v1/post/" + post._id, {
        method: "DELETE",
        withCredentials: true,
      }).then(() => {
        
        const deletePost = timeLinePosts.filter(
          (DeletePost) => DeletePost._id !== post._id
        );
        dispatch(setPosts(deletePost));
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
            {post?.user?.profilePic?.url ? (
              <img
                className="profile-img"
                src={post.user.profilePic.url}
                alt={post.name}
              />
            ) : (
              <CgProfile size={30} />
            )}
            <div className="details">
              <Link to={pathLocation}>
                <span>{post?.user?.name}</span>
                <span>1 min ago</span>
              </Link>
            </div>
          </div>
          <div className="post-more-btn">
            {currentUser._id === post?.user?.userId && (
              <MdMoreHoriz
                className="more-btn btn"
                size={20}
                onClick={showMoreBtnHandler}
              />
            )}
            {showMoreBtn && (
              <button className="delete-btn btn" onClick={deletePostFunction}>
                Delete post
              </button>
            )}
          </div>
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
            {post?.likes?.includes(currentUser._id) ? (
              <MdFavorite size={20} onClick={handleLikes} />
            ) : (
              <MdFavoriteBorder onClick={handleLikes} size={20} />
            )}
            <span>{post.likes?.length}</span>
          </div>
          <div className="item" onClick={() => setShowComment(!showComment)}>
            <MdOutlineMessage size={20} />
            <span> {post.comments?.length} comments</span>
          </div>
          <div className="item">
            <MdShare size={20} />
          </div>
          <div className="item" onClick={handleBookmarkedPost}>
          { 
          currentUser.bookmarkedPosts?.includes(post?._id) ?  <MdBookmark size={22} /> :
           <MdBookmarkBorder size={22} />
          }
          </div>
        </div>
        {showComment && <Comments postId={post._id} comments={post.comments} />}
      </div>
    </div>
  );
};

export default Post;
