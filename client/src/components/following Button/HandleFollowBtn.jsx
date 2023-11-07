import React, { memo } from "react";
import useHandleFollowing from "../../hooks/useHandleFollowing";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const HandleFollowBtn = ({ profileUserId }) => {
  const currentUser = useSelector(selectUser);

  const { followingHandling, followRequest } = useHandleFollowing();

  const disableBtnStyle = {
    backgroundColor:
      (currentUser?._id === profileUserId || followRequest) && "gray",
    PointerEvent:
      (currentUser?._id === profileUserId || followRequest) && "none",
    cursor:
      (currentUser?._id === profileUserId || followRequest) && "not-allowed",
  };

  return (
    <button
      onClick={() => followingHandling(profileUserId)}
      style={disableBtnStyle}
      disabled={currentUser?._id === profileUserId}
    >
      {profileUserId
        ? currentUser?.followings?.includes(profileUserId)
          ? followRequest
            ? "Unfollowing"
            : "Unfollow"
          : followRequest
          ? "Following"
          : "Follow"
        : "follow"}
    </button>
  );
};

export default memo(HandleFollowBtn);
