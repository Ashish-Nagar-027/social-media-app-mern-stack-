import React, { useState } from "react";
import "./comments.scss";
import { useSelector } from "react-redux";

import axios from "axios";

import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { selectUser } from "../../features/userSlice";
import { MdDelete } from "react-icons/md";

const Comments = ({ postId, userComments, setComments }) => {
  const currentUser = useSelector(selectUser);

  const [commentInputValue, setCommentInputValue] = useState("");

  const handCommentSubmit = async () => {
    if (commentInputValue !== "") {
      try {
        await axios(
          "http://localhost:3000/api/v1/post/" + postId + "/comment",
          {
            method: "PUT",
            withCredentials: true,
            data: {
              comment: commentInputValue,
            },
          }
        ).then((comment) => {
          setComments((prevComments) => [
            ...prevComments,
            comment.data.comment,
          ]);
        });
      } catch (error) {
        console.log(error);
      }
      setCommentInputValue("");
    }
  };

  const deleteComment = async (id) => {
    try {
      await axios("http://localhost:3000/api/v1/post/" + postId + "/comment", {
        method: "Delete",
        withCredentials: true,
        data: {
          commentId: id,
        },
      }).then((msg) => {
        setComments((prevComment) => {
          return prevComment.filter((comment) => comment._id !== id);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="comments">
      {/* add comments input*/}
      <div className="write-comment">
        {currentUser?.profilePic?.url ? (
          <img alt="profile" src={currentUser.profilePic.url} />
        ) : (
          <CgProfile size={30} />
        )}
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
        {userComments?.map((comment) => {
          return (
            <div key={comment._id} className="comment">
              <div className="link_div">
                <Link
                  className="userInfo"
                  to={`/profile/${comment.user.userId}`}
                >
                  {currentUser?.profilePic?.url ? (
                    <img alt="profile" src={currentUser.profilePic.url} />
                  ) : (
                    <CgProfile size={30} />
                  )}
                  <div className="info">
                    <span>{comment.user.name}</span>
                    <p>{comment.comment}</p>
                  </div>
                </Link>
                {currentUser._id === comment.user.userId && (
                  <MdDelete
                    onClick={() => deleteComment(comment._id)}
                    className="delete_comment"
                    size={20}
                  />
                )}
              </div>
              <span className="date">1 hour ago</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
