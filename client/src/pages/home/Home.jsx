import React from "react";
import "./home.scss";
import Posts from "../../components/Posts/Posts";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";

const Home = () => {
  const currentUser = useSelector(selectUser);
 

  return (
    <div className="home">
      <Posts id={currentUser?._id} />
    </div>
  );
};

export default Home;
