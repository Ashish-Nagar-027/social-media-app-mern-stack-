import React from "react";
import loadingImg from "../assets/loading.png";

const LoadingData = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src={loadingImg} alt="loading" />
    </div>
  );
};

export default LoadingData;
