import React, { memo } from "react";
import useHandleFollowing from "../../hooks/useHandleFollowing";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const HandleFollowBtn = ({ profileUserId }) => {
  const currentUser = useSelector(selectUser);
  const isCurrentUser = currentUser?._id === profileUserId;

  const { followingHandling, followRequest } = useHandleFollowing();

  const disableBtnStyle = {
    opacity: isCurrentUser || followRequest ? 0.6 : 1,
    pointerEvents: isCurrentUser || followRequest ? "none" : "auto",
    cursor: isCurrentUser ? "not-allowed" : "pointer",
  };

  return (
    <button
      onClick={() => followingHandling(profileUserId)}
      style={disableBtnStyle}
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
