import React, { useEffect } from "react";
import "./UserMessages.scss";
import { MdArrowBack } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";

const UserMessages = () => {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params.id);

  const socket = io.connect("http://localhost:3000");

  useEffect(() => {
    console.log("connect to room " + params.id);
    // return () => {}
    socket.emit("join_room", params.id);
  }, []);

  return (
    <div className="messages-container">
      <div className="user-msg-top">
        <h2>
          <MdArrowBack className="back-icon" onClick={() => navigate(-1)} />{" "}
          {"Elon musk"}
        </h2>
      </div>
      <div className="messages_here">
        <ul>
          <li>
            <div className="message_wrapper">Lorem ipsum dolor sit amet.</div>
          </li>
          <li className="its_me">
            <div className="message_wrapper">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
              nesciunt.
            </div>
          </li>
          <li className="its_me">
            <div className="message_wrapper">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              porro, dolorum exercitationem perferendis cupiditate quaerat
              beatae voluptatibus provident quidem tempore iste eligendi.
              Sapiente nobis, ipsam vero impedit nemo maiores nulla?
            </div>
          </li>
          <li>
            <div className="message_wrapper">Lorem ipsum dolor sit amet.</div>
          </li>
          <li>
            <div className="message_wrapper">Lorem, ipsum.</div>
          </li>
          <li className="its_me">
            <div className="message_wrapper">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error,
              fuga. Nemo assumenda molestias eos. Natus reiciendis qui minima
              eius voluptatibus officia tenetur, vel neque nesciunt quos,
              molestiae modi accusamus explicabo!
            </div>
          </li>
          <li>
            <div className="message_wrapper">Lorem ipsum dolor sit amet.</div>
          </li>
          <li className="its_me">
            <div className="message_wrapper">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
              nesciunt.
            </div>
          </li>
          <li className="its_me">
            <div className="message_wrapper">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              porro, dolorum exercitationem perferendis cupiditate quaerat
              beatae voluptatibus provident quidem tempore iste eligendi.
              Sapiente nobis, ipsam vero impedit nemo maiores nulla?
            </div>
          </li>
          <li>
            <div className="message_wrapper">Lorem ipsum dolor sit amet.</div>
          </li>
          <li>
            <div className="message_wrapper">Lorem, ipsum.</div>
          </li>
          <li className="its_me">
            <div className="message_wrapper">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error,
              fuga. Nemo assumenda molestias eos. Natus reiciendis qui minima
              eius voluptatibus officia tenetur, vel neque nesciunt quos,
              molestiae modi accusamus explicabo!
            </div>
          </li>
        </ul>
      </div>
      <div className="msg_input">
        <div className="svg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-mood-smile-beam"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#00abfb"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 21a9 9 0 1 1 0 -18a9 9 0 0 1 0 18z" />
            <path d="M10 10c-.5 -1 -2.5 -1 -3 0" />
            <path d="M17 10c-.5 -1 -2.5 -1 -3 0" />
            <path d="M14.5 15a3.5 3.5 0 0 1 -5 0" />
          </svg>
        </div>
        <input type="text" placeholder="Start typing here" />
        <div className="svg send_svg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-send"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#00abfb"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 14l11 -11" />
            <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default UserMessages;
