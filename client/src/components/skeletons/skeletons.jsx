import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CgProfile } from "react-icons/cg";

const PStyle = { maxWidth: "50%", margin: "10px" };
const hrStyle = { margin: "1rem", maxWidth: "70%" };

export const LeftbarSkeleton = () => {
  return (
    <div className="leftbar" style={{}}>
      <hr style={hrStyle} />
      <p style={PStyle}>
        <Skeleton />
      </p>
      <p style={PStyle}>
        <Skeleton />
      </p>
      <hr style={hrStyle} />
      <p style={PStyle}>
        <Skeleton />
      </p>
      <p style={PStyle}>
        <Skeleton />
      </p>
      <p style={PStyle}>
        <Skeleton />
      </p>
      <p style={PStyle}>
        <Skeleton />
      </p>
    </div>
  );
};

export const RightbarSkeleton = ({ items }) => {
  return (
    <>
      {Array(items)
        .fill(0)
        .map((item, i) => {
          return (
            <div className="user" key={i}>
              <div className="userInfo">
                <p className="userInfo">
                  <CgProfile size={35} />
                  {<Skeleton width={"8rem"} height={"1.8rem"} />}
                </p>
              </div>
              <div className="buttons">
                <Skeleton width={"4rem"} height={"1.8rem"} />
              </div>
            </div>
          );
        })}
    </>
  );
};

export const PostSkeleton = ({ items }) => {
  return (
    <>
      {Array(items)
        .fill(0)
        .map((item, i) => {
          return (
            <div className="post" key={i}>
              <div className="container">
                <div className="user">
                  <div className="userInfo">
                    <Skeleton width={"2rem"} height={"2rem"} circle />
                    <div className="details">
                      <span>{<Skeleton width={"5rem"} />}</span>
                    </div>
                  </div>
                  <div className="post-more-btn">
                    <Skeleton width={"2rem"} />
                  </div>
                </div>
                <div className="content">
                  <p>
                    <Skeleton height={"2rem"} />
                  </p>
                  <p>
                    <Skeleton height={"5rem"} />
                  </p>
                </div>

                {<Skeleton height={"2rem"} />}
              </div>
            </div>
          );
        })}
    </>
  );
};
