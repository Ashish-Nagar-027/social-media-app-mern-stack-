import React from "react";
import "./home.scss";
import Posts from "../../components/Posts/Posts";
import { editCurrentUser, selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import EditUserInfo from "../../components/Edit-current -user/EditUserInfo";

const Home = () => {
  const currentUser = useSelector(selectUser);
  const editUserInfo = useSelector(editCurrentUser);

  return (
    <div className="home">
      {editUserInfo && <EditUserInfo />}
      <Posts id={currentUser?._id} />
    </div>
  );
};

export default Home;
