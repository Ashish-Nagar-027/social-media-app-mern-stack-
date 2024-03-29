import React from "react";
import "./leftbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setEditProfile } from "../../features/userSlice";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { MdOutlineBookmarks } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { LeftbarSkeleton } from "../Skeletons/Skeletons.jsx";
import { showSideBar, toggleSideBar } from "../../features/showSideBarSlice.js";

const LeftBar = () => {
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const showSideBarState = useSelector(showSideBar);

  return (
    <>
      <div className={showSideBarState ? "leftbar show-left-bar" : "leftbar"}>
        <div
          className="close-icon"
          onClick={() => showSideBarState && dispatch(toggleSideBar())}
        >
          <div className="line-1 line"></div>
          <div className="line-2 line"></div>
        </div>

        <div className="user-div">
          {currentUser?.coverPic?.url ? (
            <img
              src={currentUser.coverPic.url}
              alt=""
              className="cover user-background-img"
            />
          ) : (
            <div className="cover bg-blank-img user-background-img"></div>
          )}
          <div className="user">
            {currentUser?.profilePic?.url ? (
              <img
                src={currentUser?.profilePic?.url}
                alt=""
                className="profilePic"
              />
            ) : (
              <CgProfile size={90} className="profilePic profile-blank-img" />
            )}
            <p>{currentUser?.name || <Skeleton width={"5rem"} />}</p>
          </div>
          <div className="user-info">
            {!currentUser && <LeftbarSkeleton />}
            <p>
              <Link
                to={`/profile/${currentUser?._id}/connections/followers`}
                onClick={() => showSideBarState && dispatch(toggleSideBar())}
              >
                Followers : {currentUser?.followers?.length}
              </Link>
            </p>
            <p>
              <Link
                to={`/profile/${currentUser?._id}/connections/followings`}
                onClick={() => showSideBarState && dispatch(toggleSideBar())}
              >
                followings : {currentUser?.followings?.length}
              </Link>
            </p>
          </div>

          <nav className="navigations">
            <Link
              className="left-nav-link"
              to="/"
              onClick={() => showSideBarState && dispatch(toggleSideBar())}
            >
              <div className="icon">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e"
                >
                  <g>
                    <path d="M12 9c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm0 6c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm0-13.304L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM19 19.5c0 .276-.224.5-.5.5h-13c-.276 0-.5-.224-.5-.5V8.429l7-4.375 7 4.375V19.5z"></path>
                  </g>
                </svg>
              </div>
              <span>Home</span>
            </Link>
            <Link
              className="left-nav-link"
              onClick={() => showSideBarState && dispatch(toggleSideBar())}
              to={`/profile/${currentUser?._id}`}
            >
              <CgProfile className="icon react-icon" size={20} />
              <span>Profile</span>
            </Link>
            <Link
              className="left-nav-link"
              to="/bookmarks"
              onClick={() => showSideBarState && dispatch(toggleSideBar())}
            >
              <MdOutlineBookmarks className="icon react-icon" size={20} />

              <span>Bookmark</span>
            </Link>
            <Link
              className="left-nav-link"
              to="/messages"
              onClick={() => showSideBarState && dispatch(toggleSideBar())}
            >
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-mail"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#000000"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                  <path d="M3 7l9 6l9 -6" />
                </svg>
              </div>
              <span>Messages</span>
            </Link>
          </nav>
          <div
            className="user-logout"
            onClick={() => {
              dispatch(setEditProfile());
              showSideBarState && dispatch(toggleSideBar());
            }}
          >
            {currentUser?.profilePic?.url ? (
              <img alt="profile" src={currentUser.profilePic.url} />
            ) : (
              <CgProfile size={30} />
            )}
            <span>{currentUser?.name}</span>
            <div>
              <svg
                xmlns="httpvscode-file://vscode-app/c:/Users/ag/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-line-dotted"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#000000"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 12v.01" />
                <path d="M8 12v.01" />
                <path d="M12 12v.01" />
                <path d="M16 12v.01" />
                <path d="M20 12v.01" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftBar;
