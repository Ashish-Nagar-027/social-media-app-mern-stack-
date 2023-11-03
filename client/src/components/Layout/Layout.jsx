import React from "react";
import "./layout.scss";
import { Outlet } from "react-router-dom";
import RightBar from "../rightBar/RightBar";
import LeftBar from "../leftBar/LeftBar";
import Navbar from "../navbar/Navbar";
import { useSelector } from "react-redux";
import { editCurrentUser } from "../../features/userSlice";
import EditUserInfo from "../Edit-current -user/EditUserInfo";

const Layout = () => {
  const editUserInfo = useSelector(editCurrentUser);

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          padding: "1rem",
          backgroundColor: " #f5f7f8",
        }}
      >
        <LeftBar />
        <div className="centerBar">
          <Outlet />
        </div>
        <RightBar />
      </div>
      {editUserInfo && <EditUserInfo />}
    </>
  );
};

export default Layout;
