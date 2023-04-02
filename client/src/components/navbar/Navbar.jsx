import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import {
  MdOutlineMessage,
  MdGroup,
  MdNotificationsNone,
  MdOutlineSearch,
} from "react-icons/md";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="left-nav">
        <Link to="/">
          <span>BeingSocial</span>
        </Link>
        <div className="search-input">
          <input type="text" placeholder="Search" />
          <MdOutlineSearch fontSize={24} />
        </div>
      </div>
      <div className="right-nav">
        <MdOutlineMessage fontSize={24} />
        <MdGroup fontSize={24} />
        <MdNotificationsNone fontSize={24} />
        <div className="user">
          <img
            alt="profile"
            src="https://images.pexels.com/photos/15597897/pexels-photo-15597897.jpeg?cs=srgb&dl=pexels-b%E1%BA%A3o-vi%E1%BB%87t-15597897.jpg&fm=jpg&w=640&h=960&_gl=1*qa7fxa*_ga*MTk5NDIxNjk4Ni4xNjc1NjU4Mzkw*_ga_8JE65Q40S6*MTY4MDQ1MDk3Mi40LjEuMTY4MDQ1MDk4My4wLjAuMA.."
          />
          <span>John Doe</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
