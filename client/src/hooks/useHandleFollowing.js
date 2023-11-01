import { useDispatch, useSelector } from "react-redux";

import {
    selectUser,
    setFollowings,
} from "../features/userSlice";

import axios from 'axios'


const useHandleFollowing = (id) => {
    const currentUser = useSelector(selectUser);
    const dispatch = useDispatch();
    

    const followingHandling = async (id) => {
        const url = getBaseUrl+"/api/v1/user/" + id + "/";
       
    
        if (!currentUser.followings.includes(id)) {
          await axios(url + "follow", {
            method: "PUT",
            withCredentials: true,
          }).then(() => dispatch(setFollowings([...currentUser.followings, id])));
        } else {
          const followingsArray = currentUser.followings;
    
          let newFollowings = followingsArray.filter(
            (followingId) => followingId !== id
          );
    
          await axios(url + "unfollow", {
            method: "PUT",
            withCredentials: true,
          }).then(() => dispatch(setFollowings(newFollowings)));
        }
      };

      return {
        followingHandling
      } 
}

export default useHandleFollowing