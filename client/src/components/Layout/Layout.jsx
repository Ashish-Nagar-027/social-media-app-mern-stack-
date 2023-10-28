import React from "react";
import "./layout.scss";
import { Outlet } from "react-router-dom";
import RightBar from "../rightBar/RightBar";
import LeftBar from "../leftBar/LeftBar";
import Navbar from "../navbar/Navbar";

const Layout = () => {
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
    </>
  );
};

export default Layout;
