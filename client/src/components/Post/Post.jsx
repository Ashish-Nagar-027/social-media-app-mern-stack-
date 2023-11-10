import React, { useEffect, useState } from "react";
import {
  MdFavoriteBorder,
  MdFavorite,
  MdMoreHoriz,
  MdOutlineMessage,
  MdBookmarkBorder,
  MdBookmark,
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

import "./post.scss";
import Comments from "../comments/Comments";
import { selectPosts, setLikes, setPosts } from "../../features/postSlice";
import { selectUser, setBookmarks } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import useDateHandler from "../../hooks/useDateHandler";
import { getBaseUrl } from "../../utility/utility";
import { toast } from "sonner";

const Post = ({ post }) => {
  const [showComment, setShowComment] = useState(false);
  const [showMoreBtn, setShowMoreBtn] = useState(false);
  const [newComments, setNewComments] = useState(null);
  const [likingPost, setLikingPost] = useState(false);
  const [bookmarking, setBookmarking] = useState(false);

  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();

  const location = useLocation();
  const [pathLocation, setPathLocation] = useState(null);

  const { formatTimestamp } = useDateHandler();

  useEffect(() => {
    const pathName = () => {
      if (!location.pathname.split("/")[1] === "profile") {
        setPathLocation(`/${post.user.userId}`);
      }
      return setPathLocation(`/profile/${post.user.userId}`);
    };
    pathName();
  }, [location.pathname, post?.user]);

  const handleLikes = async () => {
    try {
      setLikingPost(true);
      dispatch(setLikes({ postId: post._id, currentUserId: currentUser._id }));
      await axios(getBaseUrl + "/api/v1/post/" + post._id + "/like", {
        method: "PUT",
        withCredentials: true,
        data: {
          userId: currentUser._id,
        },
      }).then((d) => {
        let msg = "Your like added";
        if (d.data === "your like removed") {
          msg = "Your Like Removed";
        }
        toast.success("Like added ", {
          className: "my-classname",
          description: msg,
          duration: 3000,
        });
      });
    } catch (error) {
      console.log(error);
      dispatch(setLikes({ postId: post._id, currentUserId: currentUser._id }));
      toast.error("something is wrong with server", {
        className: "my-classname",
        description: "You Like couldn't be added at this time",
        duration: 3000,
      });
    } finally {
      setLikingPost(false);
    }
  };

  const handleBookmarkedPost = async () => {
    try {
      setBookmarking(true);
      dispatch(setBookmarks({ postId: post._id }));
      await axios(getBaseUrl + "/api/v1/post/" + post._id + "/bookmark", {
        method: "PUT",
        withCredentials: true,
      }).then((d) => {
        let msg = "You added a post in bookmark";
        if (d.data !== "Post bookmarked added") {
          msg = "You removed post a post from bookmark ";
        }
        toast.success("Bookmark added ", {
          className: "my-classname",
          description: msg,
          duration: 3000,
        });
      });
    } catch (error) {
      console.log(error);
      dispatch(setBookmarks({ postId: post._id }));
      toast.error("error ", {
        className: "my-classname",
        description: error,
        duration: 3000,
      });
    } finally {
      setBookmarking(false);
    }
  };

  const showMoreBtnHandler = () => {
    setShowMoreBtn(!showMoreBtn);
  };

  const timeLinePosts = useSelector(selectPosts);

  const deletePostFunction = async () => {
    try {
      await axios(getBaseUrl + "/api/v1/post/" + post._id, {
        method: "DELETE",
        withCredentials: true,
      }).then(() => {
        const deletePost = timeLinePosts.filter(
          (DeletePost) => DeletePost._id !== post._id
        );
        dispatch(setPosts(deletePost));
        toast.success("You Deleted A Post", {
          className: "my-classname",
          description: "Your Post Deleted Successfully ",
          duration: 3000,
        });
      });
    } catch (error) {
      console.log(error);
      toast.error("error while deleting post", {
        className: "my-classname",
        description: "Your post is not deleted",
        duration: 3000,
      });
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
                src={post?.user?.profilePic.url}
                alt={post?.name}
              />
            ) : (
              <CgProfile size={30} />
            )}
            <div className="details">
              <Link to={pathLocation}>
                <span>{post?.user?.name}</span>
                {post?.createdAt && (
                  <span>{formatTimestamp(post?.createdAt)}</span>
                )}
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
              <div>
                <button className="delete-btn btn" onClick={deletePostFunction}>
                  Delete post
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="content">
          <p>{post?.caption}</p>
          {post?.imageUrl?.url !== undefined ? (
            <img src={post?.imageUrl.url} alt="" />
          ) : (
            ""
          )}
        </div>
        <div className="info">
          <div className={likingPost ? "item disableClick" : "item"}>
            {post?.likes?.includes(currentUser._id) ? (
              <MdFavorite size={20} onClick={handleLikes} />
            ) : (
              <MdFavoriteBorder onClick={handleLikes} size={20} />
            )}
            <span>{post?.likes?.length}</span>
          </div>
          <div className="item" onClick={() => setShowComment(!showComment)}>
            <MdOutlineMessage size={20} />
            <span>
              {" "}
              {newComments?.length || post?.comments?.length} comments
            </span>
          </div>
          <div
            className={bookmarking ? "item disableClick" : "item"}
            onClick={handleBookmarkedPost}
          >
            {currentUser.bookmarkedPosts?.includes(post?._id) ? (
              <MdBookmark size={22} />
            ) : (
              <MdBookmarkBorder size={22} />
            )}
          </div>
        </div>
        {showComment && (
          <Comments
            postId={post?._id}
            newComments={newComments}
            setNewComments={setNewComments}
          />
        )}
      </div>
    </div>
  );
};

export default Post;
