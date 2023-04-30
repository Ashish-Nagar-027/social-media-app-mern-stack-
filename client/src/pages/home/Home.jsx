import React, { useEffect, useState } from "react";
import "./home.scss";
import Posts from "../../components/Posts/Posts";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";

const Home = () => {
  const [timeLinePosts, setTimeLinePosts] = useState(null);
  const currentUser = useSelector(selectUser);

  useEffect(() => {
    const fetchDataFunction = async () => {
      const fetchData = await fetch("/api/v1/post/timeline", {
        method: "GET",
        credentials: "include",
      });

      const jsonData = await fetchData.json();
      console.log(jsonData);

      setTimeLinePosts(jsonData);
    };
    if (currentUser) {
      fetchDataFunction();
    }
  }, [currentUser]);

  console.log(timeLinePosts);

  return (
    <div className="home">
      <Posts
        timeLinePosts={timeLinePosts}
        setTimeLinePosts={setTimeLinePosts}
      />
    </div>
  );
};

export default Home;
