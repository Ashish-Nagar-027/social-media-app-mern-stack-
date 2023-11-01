import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import {
  selectProfileUser,
  selectProfileUserFollowers,
  selectProfileUserfollowings,
} from "../../features/proFileUserSlice";
import "./userConnections.scss";
import HandleFollowBtn from "../../components/following Button/HandleFollowBtn";
import LoadingData from "../../components/LoadingData";
import useHandleConnections from "../../hooks/useHandleConnections";

const UserConnections = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { fetching, showFollowers } = useHandleConnections();

  const profileUser = useSelector(selectProfileUser);
  const profileUserFollowings = useSelector(selectProfileUserfollowings);
  const profileUserFollowers = useSelector(selectProfileUserFollowers);
  const connections =
    showFollowers === "followers"
      ? profileUserFollowers
      : profileUserFollowings;

  return (
    <div className="connections">
      <h2>
        <MdArrowBack className="back-icon" onClick={() => navigate(-1)} />{" "}
        {profileUser?.name}
      </h2>
      <hr />
      <div className="main-div">
        <div className="connections-header">
          <div
            className={`connection-type ${
              showFollowers !== "followers" ? "connection-active-link" : ""
            } `}
          >
            <Link to={`/profile/${params.id}/connections/followings`}>
              Followings (
              {profileUserFollowings?.length ||
                profileUser?.followings?.length ||
                0}{" "}
              )
            </Link>
          </div>

          <div
            className={`connection-type ${
              showFollowers === "followers" ? "connection-active-link" : ""
            } `}
          >
            <Link to={`/profile/${params.id}/connections/followers`}>
              Followers(
              {profileUserFollowers?.length ||
                profileUser?.followers?.length ||
                0}
              )
            </Link>
          </div>
        </div>

        <div className="connections-div">
          {fetching ? (
            <LoadingData />
          ) : connections?.length > 0 ? (
            connections?.map((user) => {
              return (
                <div className="user" key={user._id}>
                  <div className="userInfo">
                    <Link className="userInfo" to={`/profile/${user._id}`}>
                      {user.profilePic?.url ? (
                        <img
                          className="profile-img"
                          src={user.profilePic.url}
                          alt={user.name}
                        />
                      ) : (
                        <CgProfile size={30} />
                      )}
                      <span>{user.name}</span>
                    </Link>
                  </div>
                  <HandleFollowBtn profileUserId={user._id} />
                </div>
              );
            })
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "centers",
                height: "70vh",
                border: "1px solid gray",
                marginTop: "1rem",
              }}
            >
              <h2
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                User has No {showFollowers}
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserConnections;
