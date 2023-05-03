import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import {
  MdOutlineMessage,
  MdGroup,
  MdNotificationsNone,
  MdOutlineSearch,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const Navbar = () => {
  const currentUser = useSelector(selectUser);

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
        <MdOutlineMessage fontSize={24} className="icon" />
        <MdGroup fontSize={24} className="icon" />
        <MdNotificationsNone fontSize={24} className="icon" />
        <div className="user">
          <img
            alt="profile"
            src="https://images.pexels.com/photos/15597897/pexels-photo-15597897.jpeg?cs=srgb&dl=pexels-b%E1%BA%A3o-vi%E1%BB%87t-15597897.jpg&fm=jpg&w=640&h=960&_gl=1*qa7fxa*_ga*MTk5NDIxNjk4Ni4xNjc1NjU4Mzkw*_ga_8JE65Q40S6*MTY4MDQ1MDk3Mi40LjEuMTY4MDQ1MDk4My4wLjAuMA.."
          />
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
