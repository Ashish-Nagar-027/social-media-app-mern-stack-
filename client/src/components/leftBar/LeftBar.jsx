import React from "react";
import "./leftbar.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const LeftBar = () => {
  const currentUser = useSelector(selectUser);

  return (
    <div className="leftbar">
      <div className="user-div">
        <img
          className="user-background-img"
          alt="background"
          src="https://images.pexels.com/photos/15953937/pexels-photo-15953937.jpeg?cs=srgb&dl=pexels-jaime-reimer-15953937.jpg&fm=jpg&_gl=1*srqdvs*_ga*MTk5NDIxNjk4Ni4xNjc1NjU4Mzkw*_ga_8JE65Q40S6*MTY4MDQ5MjAzMi41LjEuMTY4MDQ5MzQ1Ny4wLjAuMA.."
        />
        <div className="user">
          <img
            alt="profile"
            src="https://images.pexels.com/photos/15597897/pexels-photo-15597897.jpeg?cs=srgb&dl=pexels-b%E1%BA%A3o-vi%E1%BB%87t-15597897.jpg&fm=jpg&w=640&h=960&_gl=1*qa7fxa*_ga*MTk5NDIxNjk4Ni4xNjc1NjU4Mzkw*_ga_8JE65Q40S6*MTY4MDQ1MDk3Mi40LjEuMTY4MDQ1MDk4My4wLjAuMA.."
          />
          <span>{currentUser.name}</span>
        </div>
        <div className="user-info">
          <p>followers : {currentUser.followers.length}</p>
          <p>follwings : {currentUser.followings.length}</p>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
