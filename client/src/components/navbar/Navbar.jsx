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
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const currentUser = useSelector(selectUser);

  return (
    <>
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
            {currentUser?.profilePic?.url ? (
              <img alt="profile" src={currentUser.profilePic.url} />
            ) : (
              <CgProfile size={30} />
            )}
            <span>{currentUser?.name}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
