import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import {
  MdOutlineMessage,
  MdGroup,
  MdNotificationsNone,
  MdOutlineSearch,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setEditProfile } from "../../features/userSlice";
import { CgProfile } from "react-icons/cg";
import { toggleSideBar } from "../../features/showSideBarSlice";
import { toast } from "sonner";

const Navbar = () => {
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const [inputSearch, setInputSearch] = useState("");

  const handleInputSearch = (e) => {
    e.preventDefault();
    toast.error("This Feature Is Not Available Yet", {
      className: "my-classname",
      description: "search user feature will be availble soon",
      duration: 2000,
    });
    setInputSearch("");
  };

  return (
    <>
      <div className="navbar">
        <div className="left-nav">
          <Link to="/">
            <span>BeingSocial</span>
          </Link>
          <div className="search-input">
            <form onSubmit={handleInputSearch}>
              <input
                type="text"
                placeholder="Search"
                value={inputSearch}
                onChange={(e) => setInputSearch(e.target.value)}
              />
              <MdOutlineSearch fontSize={24} onClick={handleInputSearch} />
            </form>
          </div>
        </div>
        <div className="right-nav">
          <Link to={"/messages"}>
            <MdOutlineMessage fontSize={24} className="icon" />
          </Link>
          <Link to={`/profile/${currentUser?._id}/connections/followings`}>
            <MdGroup fontSize={24} className="icon" />
          </Link>
          <MdNotificationsNone
            fontSize={24}
            className="icon"
            onClick={() =>
              toast.error("This Feature Is Not Available Yet", {
                className: "my-classname",
                description: "search user feature will be availble soon",
                duration: 2000,
              })
            }
          />
          <div className="user" onClick={() => dispatch(setEditProfile())}>
            {currentUser?.profilePic?.url ? (
              <img alt="profile" src={currentUser.profilePic.url} />
            ) : (
              <CgProfile size={30} />
            )}
            <span>{currentUser?.name}</span>
          </div>
          <div className="hamburger" onClick={() => dispatch(toggleSideBar())}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
