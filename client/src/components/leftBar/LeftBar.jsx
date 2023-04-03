import React from "react";
import "./leftbar.scss";

const LeftBar = () => {
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
          <span>John Doe</span>
        </div>
        <div className="user-info">
          <p>followers : 100</p>
          <p>follwings : 100</p>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
