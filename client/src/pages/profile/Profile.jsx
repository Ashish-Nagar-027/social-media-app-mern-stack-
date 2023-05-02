import React, { useEffect, useState } from "react";
import { MdFacebook, MdEmail } from "react-icons/md";
import { FaTwitter, FaLinkedin } from "react-icons/fa";
import "./profile.scss";
import Posts from "../../components/Posts/Posts";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const userId = useParams();
  const [profileUser, setProfileUser] = useState(null);

  useEffect(() => {
    const fetchDataFunction = async () => {
      const fetchData = await axios.get(
        `http://localhost:3001/api/v1/user/${userId.id}`
      );

      setProfileUser(fetchData.data);
    };

    fetchDataFunction();
  }, [userId]);

  return (
    <>
      <div className="profile">
        <div className="images">
          <img
            src="https://images.pexels.com/photos/15953937/pexels-photo-15953937.jpeg?cs=srgb&dl=pexels-jaime-reimer-15953937.jpg&fm=jpg&_gl=1*srqdvs*_ga*MTk5NDIxNjk4Ni4xNjc1NjU4Mzkw*_ga_8JE65Q40S6*MTY4MDQ5MjAzMi41LjEuMTY4MDQ5MzQ1Ny4wLjAuMA"
            alt=""
            className="cover"
          />

          <img
            src="https://images.pexels.com/photos/15656117/pexels-photo-15656117.jpeg?cs=srgb&dl=pexels-aliakbar-nosrati-15656117.jpg&fm=jpg&w=640&h=760&_gl=1*rixznq*_ga*MTk5NDIxNjk4Ni4xNjc1NjU4Mzkw*_ga_8JE65Q40S6*MTY4MDkyNzY2NC42LjEuMTY4MDkyNzc1My4wLjAuMA.."
            alt=""
            className="profilePic"
          />
        </div>
        <div className="profileContainer">
          <div className="userInfo">
            <div className="left">
              <a href="wwww.google.com">
                <MdFacebook fontSize={25} />
              </a>
              <a href="wwww.google.com">
                <FaLinkedin fontSize={24} />
              </a>
              <a href="wwww.google.com">
                <FaTwitter fontSize={24} />
              </a>
            </div>
            <div className="center">
              <span>{profileUser?.name}</span>
              <button>follow</button>
            </div>
            <div className="right">
              <MdEmail fontSize={24} />
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 10 }}>
        <Posts id={userId.id} />
      </div>
    </>
  );
};

export default Profile;
