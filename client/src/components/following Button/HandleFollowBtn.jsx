import React, { memo } from "react";
import useHandleFollowing from "../../hooks/useHandleFollowing";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const HandleFollowBtn = ({ profileUserId }) => {
  const currentUser = useSelector(selectUser);

  const { followingHandling } = useHandleFollowing();

  const disableBtnStyle = {
    // backgroundColor: currentUser?._id === profileUserId && "gray",
    // PointerEvent: currentUser?._id === profileUserId && "none",
    // cursor: currentUser?._id === profileUserId && "not-allowed",
    display: currentUser?._id === profileUserId && "none",
  };

  return (
    <button
      onClick={() => followingHandling(profileUserId)}
      style={disableBtnStyle}
    >
      {profileUserId
        ? currentUser?.followings?.includes(profileUserId)
          ? "Unfollow"
          : "Follow"
        : "follow"}
    </button>
  );
};

export default memo(HandleFollowBtn);
