import React, { useState, useRef, useEffect, memo } from "react";
import Post from "../Post/Post";
import "./posts.scss";
import { selectUser } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import {
  MdOutlineImage,
  MdOutlineVideoFile,
  MdOutlineSend,
  MdOutlineCancel,
} from "react-icons/md";
import { selectPosts, setPosts } from "../../features/postSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { getBaseUrl } from "../../utility/utility";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { PostSkeleton } from "../Skeletons/Skeletons.jsx";
import { toast } from "sonner";

const Posts = ({ id }) => {
  const location = useLocation();

  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const timeLinePosts = useSelector(selectPosts);

  const [image, setImage] = useState(null);
  const imageRef = useRef();

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const [captionText, setCaptionText] = useState("");
  const [sharingTime, setSharingTime] = useState(false);

  // post (share/adding new post) post
  const sharePost = async () => {
    const newPost = new FormData();
    if (image) {
      newPost.append("image", image);
    }
    newPost.append("caption", captionText);

    if (captionText) {
      setSharingTime(true);

      try {
        const postData = await axios(`${getBaseUrl}/api/v1/post/`, {
          method: "POST",
          withCredentials: true,
          data: newPost,
        });

        const newPostDetails = {
          ...postData.data.post,
          user: {
            ...postData.data.post.user,
            profilePic: currentUser.profilePic,
          },
        };

        // dispatch(setPosts([postData.data.post, ...timeLinePosts]));
        dispatch(setPosts([newPostDetails, ...timeLinePosts]));
        toast.success("Your New Post Added Successfully", {
          className: "my-classname",
          duration: 3000,
        });
        setCaptionText("");
        setImage(null);
      } catch (error) {
        console.log(error);
      }
      setSharingTime(false);
    } else {
      alert("please write caption");
    }
  };

  const [path, setPath] = useState();
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    let neededData = `${id}/timeline`;
    if (location.pathname === "/bookmarks") {
      neededData = `${currentUser?._id}/bookmarks`;
    }

    if (location.pathname.includes("/profile/")) {
      neededData = `${id}/user`;
    }

    const fetchDataFunction = async (neededData) => {
      if (path !== location.pathname) {
        setLoadingData(true);
        setPath(location.pathname);
      }

      const fetchData = await axios(`${getBaseUrl}/api/v1/post/${neededData}`, {
        method: "GET",
        withCredentials: true,
        credentials: "include",
      }).catch((error) => {
        console.log(error);
        if (error.statusText === "Unauthorized") {
          navigate("/login");
        }
      });

      dispatch(setPosts(fetchData.data.filter((post) => post !== null)));

      setLoadingData(false);
    };
    if (currentUser?._id) {
      fetchDataFunction(neededData);
    }
  }, [
    currentUser?._id,
    id,
    location,
    dispatch,
    navigate,
    currentUser?.bookmarkedPosts,
    path,
  ]);

  if (location.pathname === "/bookmarks") {
    if (currentUser?.bookmarkedPosts?.length === 0) {
      return (
        <h2
          style={{
            display: "flex",
            padding: "1rem",
            textAlign: "center",
          }}
        >
          you don't have any bookmarked post 😅
        </h2>
      );
    }
  }

  return (
    <>
      {location.pathname === "/" && (
        <div className="create-post">
          <div className="container">
            <div className="user">
              <div className="userInfo" style={{ display: "flex" }}>
                {currentUser?.profilePic?.url ? (
                  <img
                    className="profile-pic-img"
                    src={currentUser?.profilePic?.url}
                    alt={currentUser?.name}
                  />
                ) : (
                  <CgProfile size={30} />
                )}
                <p>{currentUser?.name || <Skeleton width={"5rem"} />}</p>
              </div>
              <input
                placeholder="Write here..."
                value={captionText}
                onChange={(e) => currentUser && setCaptionText(e.target.value)}
              />
              {image && (
                <div className="uploaded-img">
                  <MdOutlineCancel
                    size={30}
                    className="cancel-upload-img"
                    onClick={() => setImage(null)}
                  />
                  <img src={URL.createObjectURL(image)} alt="" />
                </div>
              )}
              {!currentUser ? (
                <Skeleton height={"2rem"} />
              ) : (
                <div className="upload-items">
                  <div>
                    <div
                      className="upload-item"
                      onClick={() => imageRef.current.click()}
                    >
                      <MdOutlineImage size={20} />
                      <span>Image</span>
                    </div>
                    <div
                      className="upload-item"
                      onClick={() => imageRef.current.click()}
                    >
                      <MdOutlineVideoFile size={20} />
                      <span>video</span>
                    </div>
                    <div style={{ display: "none" }}>
                      <input
                        type="file"
                        name="image-input"
                        ref={imageRef}
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                  {sharingTime ? (
                    <button disabled>
                      sharing... <MdOutlineSend size={20} />
                    </button>
                  ) : (
                    <button onClick={sharePost}>
                      Share Post <MdOutlineSend size={20} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {loadingData && <PostSkeleton items={3} gap />}
      <div className="posts">
        {!timeLinePosts && <PostSkeleton items={3} />}

        {timeLinePosts &&
          !loadingData &&
          (timeLinePosts?.length > 0 ? (
            <>
              {timeLinePosts?.map((post) => (
                <Post post={post} key={post?._id} />
              ))}
            </>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "centers",
                height: "300px",
                border: "1px solid gray",
              }}
            >
              <h2
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                User has No Posts
              </h2>
            </div>
          ))}
      </div>
    </>
  );
};

export default memo(Posts);
