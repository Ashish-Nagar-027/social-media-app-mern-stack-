import React, { memo, useCallback, useEffect, useState } from "react";
import "./comments.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { selectUser } from "../../features/userSlice";
import { MdDelete } from "react-icons/md";
import { getBaseUrl } from "../../utility/utility";
import LoadingData from "../LoadingData";
import useDateHandler from "../../hooks/useDateHandler";
import { toast } from "sonner";

const Comments = ({ postId, newComments, setNewComments }) => {
  const currentUser = useSelector(selectUser);

  const [commentInputValue, setCommentInputValue] = useState("");
  const [fetchingComments, setFetchingComments] = useState(false);
  const { formatTimestamp } = useDateHandler();

  const handCommentSubmit = async () => {
    if (commentInputValue !== "") {
      try {
        await axios(getBaseUrl + "/api/v1/post/" + postId + "/comment", {
          method: "PUT",
          withCredentials: true,
          data: {
            comment: commentInputValue,
          },
        }).then((comment) => {
          setNewComments((prevComments) => [
            ...prevComments,
            comment.data.comment,
          ]);
          toast.success("Your Comment added ", {
            className: "my-classname",
            description: `Comment: ${commentInputValue}`,
            duration: 3000,
          });
        });
      } catch (error) {
        console.log(error);
      }
      setCommentInputValue("");
    }
  };

  const deleteComment = async (id) => {
    try {
      await axios(getBaseUrl + "/api/v1/post/" + postId + "/comment", {
        method: "Delete",
        withCredentials: true,
        data: {
          commentId: id,
        },
      }).then((msg) => {
        setNewComments((prevComment) => {
          return prevComment.filter((comment) => comment._id !== id);
        });
        toast.success("Your Comment Deleted ", {
          className: "my-classname",
          duration: 3000,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = useCallback(async () => {
    try {
      setFetchingComments(true);
      await axios(getBaseUrl + "/api/v1/post/" + postId + "/comment", {
        method: "get",
        withCredentials: true,
      }).then((d) => {
        setNewComments(d.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingComments(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [postId]);

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
      {fetchingComments && <LoadingData />}
      {/* show comments */}
      <div className="show-comments">
        {newComments?.map((comment) => {
          return (
            <div key={comment._id} className="comment">
              <div className="link_div">
                <Link
                  className="userInfo"
                  to={`/profile/${comment.user.userId}`}
                >
                  {comment.user?.profilePic?.url ? (
                    <img alt="profile" src={comment.user.profilePic.url} />
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
              <span className="date">
                {formatTimestamp(comment?.createdAt)}
              </span>
            </div>
          );
        })}

        {/* if no comments */}
        {newComments?.length === 0 && (
          <p style={{ margin: "auto" }}>No comments Yet</p>
        )}
      </div>
    </div>
  );
};

export default memo(Comments);
