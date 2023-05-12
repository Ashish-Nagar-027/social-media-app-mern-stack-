import React, { useState } from "react";
import "./comments.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import axios from "axios";
import { setComments } from "../../features/postSlice";

const Comments = ({ postId, comments }) => {
  const userImg =
    "https://images.pexels.com/photos/15597897/pexels-photo-15597897.jpeg?cs=srgb&dl=pexels-b%E1%BA%A3o-vi%E1%BB%87t-15597897.jpg&fm=jpg&w=640&h=960&_gl=1*qa7fxa*_ga*MTk5NDIxNjk4Ni4xNjc1NjU4Mzkw*_ga_8JE65Q40S6*MTY4MDQ1MDk3Mi40LjEuMTY4MDQ1MDk4My4wLjAuMA..";

  const [commentInputValue, setCommentInputValue] = useState("");

  const dispatch = useDispatch();

  const userComments = comments;

  const handCommentSubmit = async () => {
    if (commentInputValue !== "") {
      try {
        const addComment = await axios(
          "http://localhost:3000/api/v1/post/" + postId + "/comment",
          {
            method: "PUT",
            withCredentials: true,
            data: {
              comment: commentInputValue,
            },
          }
        ).then((comment) => {
          dispatch(
            setComments({ postId: postId, comment: comment.data.comment })
          );
        });
      } catch (error) {
        console.log(error);
      }

      setCommentInputValue("");
    }
  };

  return (
    <div className="comments">
      {/* add comments input*/}
      <div className="write-comment">
        <img src={userImg} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={commentInputValue}
          onChange={(e) => setCommentInputValue(e.target.value)}
        />
        <button onClick={handCommentSubmit}>Send</button>
      </div>
      {/* show comments */}
      <div className="show-comments">
        {userComments.map((comment) => (
          <div key={comment._id} className="comment">
            <div>
              <img alt="" src={userImg} />
              <div className="info">
                <span>{comment.user.name}</span>
                <p>{comment.comment}</p>
              </div>
            </div>
            <span className="date">1 hour ago</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
