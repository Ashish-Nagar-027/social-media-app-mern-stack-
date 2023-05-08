import React, { useState, useRef, useEffect } from "react";
import Post from "../Post/Post";
import "./posts.scss";
import { selectUser } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import loadingImg from "../../assets/loading.png";

import {
  MdOutlineImage,
  MdOutlineVideoFile,
  MdOutlineSend,
  MdOutlineCancel,
} from "react-icons/md";
import { selectPosts, setPosts } from "../../features/postSlice";

const Posts = ({ id }) => {
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();
  // const setPosts
  const timeLinePosts = useSelector(selectPosts);

  const [image, setImage] = useState(null);
  const imageRef = useRef();

  const defaultProfilePic =
    "https://images.pexels.com/photos/15597897/pexels-photo-15597897.jpeg?cs=srgb&dl=pexels-b%E1%BA%A3o-vi%E1%BB%87t-15597897.jpg&fm=jpg&w=640&h=960&_gl=1*qa7fxa*_ga*MTk5NDIxNjk4Ni4xNjc1NjU4Mzkw*_ga_8JE65Q40S6*MTY4MDQ1MDk3Mi40LjEuMTY4MDQ1MDk4My4wLjAuMA..";

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const [captionText, setCaptionText] = useState("");

  // post (share) post
  const sharePost = async () => {
    if (captionText) {
      const postData = await axios.post("/api/v1/post", {
        caption: captionText,
      });

      dispatch(setPosts([postData.data.post, ...timeLinePosts]));

      setCaptionText("");
    } else {
      alert("please write caption");
    }
  };

  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    const fetchDataFunction = async () => {
      setFetching(true);

      const fetchData = await axios.get(
        `http://localhost:3001/api/v1/post/${id}/timeline`
      );

      dispatch(setPosts(fetchData.data));
      setFetching(false);
    };
    if (currentUser) {
      fetchDataFunction();
    }
  }, [currentUser, id]);

  if (fetching) {
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
      <div className="create-post">
        <div className="container">
          <div className="user">
            <div className="userInfo" style={{ display: "flex" }}>
              <img
                src={defaultProfilePic}
                alt={currentUser.name}
                className="profile-pic-img"
              />
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
              <button onClick={sharePost}>
                Share Post <MdOutlineSend size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

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
