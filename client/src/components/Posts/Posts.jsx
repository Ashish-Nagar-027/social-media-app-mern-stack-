import React, { useState, useRef } from "react";
import Post from "../Post/Post";
import "./posts.scss";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";

import {
  MdOutlineImage,
  MdOutlineVideoFile,
  MdOutlineSend,
  MdOutlineCancel,
} from "react-icons/md";

const Posts = ({ timeLinePosts, setTimeLinePosts }) => {
  const posts = [
    {
      id: 1,
      name: "John Doe",
      userId: 1,
      profilePic:
        "https://images.pexels.com/photos/15597897/pexels-photo-15597897.jpeg?cs=srgb&dl=pexels-b%E1%BA%A3o-vi%E1%BB%87t-15597897.jpg&fm=jpg&w=640&h=960&_gl=1*qa7fxa*_ga*MTk5NDIxNjk4Ni4xNjc1NjU4Mzkw*_ga_8JE65Q40S6*MTY4MDQ1MDk3Mi40LjEuMTY4MDQ1MDk4My4wLjAuMA..",
      desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, laboriosam.",
      img: "https://images.pexels.com/photos/15656117/pexels-photo-15656117.jpeg?cs=srgb&dl=pexels-aliakbar-nosrati-15656117.jpg&fm=jpg&w=640&h=760&_gl=1*rixznq*_ga*MTk5NDIxNjk4Ni4xNjc1NjU4Mzkw*_ga_8JE65Q40S6*MTY4MDkyNzY2NC42LjEuMTY4MDkyNzc1My4wLjAuMA..",
    },
    {
      id: 2,
      name: "John Doe",
      userId: 1,
      profilePic:
        "https://images.pexels.com/photos/15597897/pexels-photo-15597897.jpeg?cs=srgb&dl=pexels-b%E1%BA%A3o-vi%E1%BB%87t-15597897.jpg&fm=jpg&w=640&h=960&_gl=1*qa7fxa*_ga*MTk5NDIxNjk4Ni4xNjc1NjU4Mzkw*_ga_8JE65Q40S6*MTY4MDQ1MDk3Mi40LjEuMTY4MDQ1MDk4My4wLjAuMA..",
      desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, laboriosam.",
      img: "https://images.pexels.com/photos/15656117/pexels-photo-15656117.jpeg?cs=srgb&dl=pexels-aliakbar-nosrati-15656117.jpg&fm=jpg&w=640&h=760&_gl=1*rixznq*_ga*MTk5NDIxNjk4Ni4xNjc1NjU4Mzkw*_ga_8JE65Q40S6*MTY4MDkyNzY2NC42LjEuMTY4MDkyNzc1My4wLjAuMA..",
    },
    {
      id: 3,
      name: "John Doe",
      userId: 1,
      profilePic:
        "https://images.pexels.com/photos/15597897/pexels-photo-15597897.jpeg?cs=srgb&dl=pexels-b%E1%BA%A3o-vi%E1%BB%87t-15597897.jpg&fm=jpg&w=640&h=960&_gl=1*qa7fxa*_ga*MTk5NDIxNjk4Ni4xNjc1NjU4Mzkw*_ga_8JE65Q40S6*MTY4MDQ1MDk3Mi40LjEuMTY4MDQ1MDk4My4wLjAuMA..",
      desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, laboriosam.",
      img: "https://images.pexels.com/photos/15656117/pexels-photo-15656117.jpeg?cs=srgb&dl=pexels-aliakbar-nosrati-15656117.jpg&fm=jpg&w=640&h=760&_gl=1*rixznq*_ga*MTk5NDIxNjk4Ni4xNjc1NjU4Mzkw*_ga_8JE65Q40S6*MTY4MDkyNzY2NC42LjEuMTY4MDkyNzc1My4wLjAuMA..",
    },
  ];

  const currentUser = useSelector(selectUser);

  const [image, setImage] = useState(null);
  const imageRef = useRef();

  const defaultProfilePic =
    "https://images.pexels.com/photos/15597897/pexels-photo-15597897.jpeg?cs=srgb&dl=pexels-b%E1%BA%A3o-vi%E1%BB%87t-15597897.jpg&fm=jpg&w=640&h=960&_gl=1*qa7fxa*_ga*MTk5NDIxNjk4Ni4xNjc1NjU4Mzkw*_ga_8JE65Q40S6*MTY4MDQ1MDk3Mi40LjEuMTY4MDQ1MDk4My4wLjAuMA..";

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage({
        image: URL.createObjectURL(img),
      });
    }
  };

  const [captionText, setCaptionText] = useState("");

  const sharePost = async () => {
    if (captionText) {
      const postData = await fetch("/api/v1/post", {
        method: "Post",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ caption: captionText }),

        credentials: "include",
      });

      const jsonData = await postData.json();

      setTimeLinePosts([jsonData.post, ...timeLinePosts]);
      setCaptionText("");
    } else {
      alert("please write caption");
    }
  };

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
                <img src={image.image} alt="" />
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
        {timeLinePosts?.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </>
  );
};

export default Posts;
