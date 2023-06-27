import React, { useState, useRef, useEffect } from "react";
import Post from "../Post/Post";
import "./posts.scss";
import { selectUser } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import loadingImg from "../../assets/loading.png";

import { CgProfile } from "react-icons/cg";

import {
  MdOutlineImage,
  MdOutlineVideoFile,
  MdOutlineSend,
  MdOutlineCancel,
} from "react-icons/md";
import { selectPosts, setPosts } from "../../features/postSlice";
import { useLocation } from "react-router-dom";

const Posts = ({ id }) => {

  const location = useLocation();

 

  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();

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
        const postData = await axios("http://localhost:3000/api/v1/post/", {
          method: "POST",
          withCredentials: true,
          data: newPost,
        });

        dispatch(setPosts([postData.data.post, ...timeLinePosts]));
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

  const [loadingData, setLoadingData] = useState(false);
  useEffect(() => {
     
    let neededData = `${id}/timeline`
     
    if(location.pathname === '/bookmarks'){
      neededData = `${currentUser._id}/bookmarks`
    }


    const fetchDataFunction = async () => {
      setLoadingData(true);

      const fetchData = await axios.get(
        `http://localhost:3001/api/v1/post/${neededData}`
      );

      dispatch(setPosts(fetchData.data));
      setLoadingData(false);
    };
    if (currentUser) {
      fetchDataFunction();
    }
  }, [currentUser, id, dispatch, location]);

  if (loadingData && !timeLinePosts) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={loadingImg} alt="loading" />
      </div>
    );
  }


 

  return (
    <>
      {location.pathname === '/' && (
        <div className="create-post">
          <div className="container">
            <div className="user">
              <div className="userInfo" style={{ display: "flex" }}>
                {currentUser.profilePic?.url ? (
                  <img
                    className="profile-pic-img"
                    src={currentUser.profilePic.url}
                    alt={currentUser.name}
                  />
                ) : (
                  <CgProfile size={30} />
                )}
                <p>{currentUser.name}</p>
              </div>
              <input
                placeholder="Write here..."
                value={captionText}
                onChange={(e) => setCaptionText(e.target.value)}
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
            </div>
          </div>
        </div>
      )}
      <div className="posts">
        {timeLinePosts ? (
          timeLinePosts.map((post) => <Post post={post} key={post._id} />)
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={loadingImg} alt="loading" />
          </div>
        )}
      </div>
    </>
  );
};

export default Posts;
