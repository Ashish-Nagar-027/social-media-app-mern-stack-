import React, { memo } from "react";
import useHandleFollowing from "../../hooks/useHandleFollowing";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const HandleFollowBtn = ({ profileUserId }) => {
  const currentUser = useSelector(selectUser);

  const { followingHandling } = useHandleFollowing();

  return (
    <button onClick={() => followingHandling(profileUserId)}>
      {profileUserId
        ? currentUser?.followings?.includes(profileUserId)
          ? "Unfollow"
          : "Follow"
        : "follow"}
    </button>
  );
};

export default memo(HandleFollowBtn);
