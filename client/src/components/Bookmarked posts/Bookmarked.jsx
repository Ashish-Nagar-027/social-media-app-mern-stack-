import React from "react";
import "./Bookmarked.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import Posts from "../Posts/Posts";


const Bookmarked = () => {
  const currentUserId = useSelector(selectUser)?.id;
 

  return (
    <div className="bookmarked">
      <h2>Your Bookmarked Posts</h2>
      <Posts id={currentUserId} />
    </div>
  );
};

export default Bookmarked;
