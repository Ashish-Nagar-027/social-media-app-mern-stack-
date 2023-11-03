import React, { memo } from "react";
import "./home.scss";
import Posts from "../../components/Posts/Posts";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const Home = () => {
  const currentUser = useSelector(selectUser);

  return (
    <div className="home">
      <Posts id={currentUser?._id} />
    </div>
  );
};

export default memo(Home);
