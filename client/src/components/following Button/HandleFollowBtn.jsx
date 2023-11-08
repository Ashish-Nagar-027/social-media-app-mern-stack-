import React, { memo } from "react";
import useHandleFollowing from "../../hooks/useHandleFollowing";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const HandleFollowBtn = ({ profileUserId }) => {
  const currentUser = useSelector(selectUser);

  const { followingHandling, followRequest } = useHandleFollowing();

  const disableBtnStyle = {
    opacity: (currentUser?._id === profileUserId || followRequest) && 0.6,
    PointerEvent:
      (currentUser?._id === profileUserId || followRequest) && "none",
    cursor: currentUser?._id === profileUserId && "not-allowed",
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
