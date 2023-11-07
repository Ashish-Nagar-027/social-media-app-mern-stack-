import { useDispatch, useSelector } from "react-redux";

import {
    selectUser,
    setFollowings,
} from "../features/userSlice";

import axios from 'axios'
import { getBaseUrl } from "../utility/utility";
import { toast } from "sonner";


const useHandleFollowing = (id) => {
    const currentUser = useSelector(selectUser);
    const dispatch = useDispatch();
    

    const followingHandling = async (id) => {
        const url = getBaseUrl+"/api/v1/user/" + id + "/";
       
    
        if (!currentUser.followings.includes(id)) {
          await axios(url + "follow", {
            method: "PUT",
            withCredentials: true,
          }).then((d) => {
          dispatch(setFollowings([...currentUser.followings, id]))
           toast.success(d.data, {
         className: "my-classname",
         duration: 3000,
       })
        });
        } else {
          const followingsArray = currentUser.followings;
    
          let newFollowings = followingsArray.filter(
            (followingId) => followingId !== id
          );
    
          await axios(url + "unfollow", {
            method: "PUT",
            withCredentials: true,
          }).then((d) => {
            dispatch(setFollowings(newFollowings))
           
             toast.success(d.data, {
         className: "my-classname",
         duration: 3000,
       });
          })
        }
      };

      return {
        followingHandling
      } 
}

export default useHandleFollowing