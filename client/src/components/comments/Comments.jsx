import React, { useState } from "react";
import "./comments.scss";

const Comments = () => {
  const comments = [
    {
      id: 1,
      name: "John Doe",
      userId: 1,
      profilePic:
        "https://images.pexels.com/photos/15597897/pexels-photo-15597897.jpeg?cs=srgb&dl=pexels-b%E1%BA%A3o-vi%E1%BB%87t-15597897.jpg&fm=jpg&w=640&h=960&_gl=1*qa7fxa*_ga*MTk5NDIxNjk4Ni4xNjc1NjU4Mzkw*_ga_8JE65Q40S6*MTY4MDQ1MDk3Mi40LjEuMTY4MDQ1MDk4My4wLjAuMA..",
      desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, laboriosam.",
      img: "https://images.pexels.com/photos/15656117/pexels-photo-15656117.jpeg?cs=srgb&dl=pexels-aliakbar-nosrati-15656117.jpg&fm=jpg&w=640&h=760&_gl=1*rixznq*_ga*MTk5NDIxNjk4Ni4xNjc1NjU4Mzkw*_ga_8JE65Q40S6*MTY4MDkyNzY2NC42LjEuMTY4MDkyNzc1My4wLjAuMA..",
    },
    {
      id: 2,
      name: "John Doe",
      userId: 1,
      profilePic:
        "https://images.pexels.com/photos/15597897/pexels-photo-15597897.jpeg?cs=srgb&dl=pexels-b%E1%BA%A3o-vi%E1%BB%87t-15597897.jpg&fm=jpg&w=640&h=960&_gl=1*qa7fxa*_ga*MTk5NDIxNjk4Ni4xNjc1NjU4Mzkw*_ga_8JE65Q40S6*MTY4MDQ1MDk3Mi40LjEuMTY4MDQ1MDk4My4wLjAuMA..",
      desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, laboriosam.",
      img: "https://images.pexels.com/photos/15656117/pexels-photo-15656117.jpeg?cs=srgb&dl=pexels-aliakbar-nosrati-15656117.jpg&fm=jpg&w=640&h=760&_gl=1*rixznq*_ga*MTk5NDIxNjk4Ni4xNjc1NjU4Mzkw*_ga_8JE65Q40S6*MTY4MDkyNzY2NC42LjEuMTY4MDkyNzc1My4wLjAuMA..",
    },
    {
      id: 3,
      name: "John Doe",
      userId: 1,
      profilePic:
        "https://images.pexels.com/photos/15597897/pexels-photo-15597897.jpeg?cs=srgb&dl=pexels-b%E1%BA%A3o-vi%E1%BB%87t-15597897.jpg&fm=jpg&w=640&h=960&_gl=1*qa7fxa*_ga*MTk5NDIxNjk4Ni4xNjc1NjU4Mzkw*_ga_8JE65Q40S6*MTY4MDQ1MDk3Mi40LjEuMTY4MDQ1MDk4My4wLjAuMA..",
      desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, laboriosam.",
    },
  ];

  return (
    <div className="comments">
      {comments.map((comment) => (
        <div className="comment">
          <img alt="" src={comment.profilePic} />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">1 hour ago</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
