import { useDispatch, useSelector } from "react-redux";

import {
    selectUser,
    setFollowings,
} from "../features/userSlice";

import axios from 'axios'
import { getBaseUrl } from "../utility/utility";
import { toast } from "sonner";
import { useState } from "react";


const useHandleFollowing = (id) => {
    const currentUser = useSelector(selectUser);
    const dispatch = useDispatch();
    const [followRequest, setFollowRequest] = useState(false)
    

    const followingHandling = async (id) => {
      
      if(id == currentUser?._id){
         toast.error("You Can Not Follow Yourselt", {
        className: "my-classname",
        description: "The User You Are Trying To Follow Is YourSelf.",
        duration: 3000,
      });
        return
      }

      setFollowRequest(true)
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
      setFollowRequest(false)
      };

      return {
        followingHandling,
        followRequest
      } 
}

export default useHandleFollowing