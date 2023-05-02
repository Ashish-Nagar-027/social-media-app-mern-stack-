import React, { useEffect, useState } from "react";

import "./rightbar.scss";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const RightBar = () => {
  const [suggestUsers, setSuggestUsers] = useState(null);

  useEffect(() => {
    const getSuggestUserFunction = async () => {
      const fetchSuggestUser = await axios.get(
        "api/v1/user/644f4996ec5a858319a9d0e1/suggestusers"
      );

      setSuggestUsers(fetchSuggestUser.data);
    };
    getSuggestUserFunction();
  }, [setSuggestUsers]);

  const defaultProfilePic =
    "https://images.pexels.com/photos/15597897/pexels-photo-15597897.jpeg?cs=srgb&dl=pexels-b%E1%BA%A3o-vi%E1%BB%87t-15597897.jpg&fm=jpg&w=640&h=960&_gl=1*qa7fxa*_ga*MTk5NDIxNjk4Ni4xNjc1NjU4Mzkw*_ga_8JE65Q40S6*MTY4MDQ1MDk3Mi40LjEuMTY4MDQ1MDk4My4wLjAuMA..";

  return (
    <div className="rightbar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          {suggestUsers ? (
            suggestUsers.map((user) => {
              return (
                <div className="user" key={user._id}>
                  <div className="userInfo">
                    <Link className="userInfo" to={`/profile/${user._id}`}>
                      <img alt="profile" src={defaultProfilePic} />
                      <span>{user.name}</span>
                    </Link>
                  </div>
                  <div className="buttons">
                    <button>follow</button>
                    <button>dismiss</button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>fetching Suggestions ...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
