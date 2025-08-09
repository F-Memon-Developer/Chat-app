import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { formatTime } from "../utils/formatTime";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  

  const isOwner = message.senderId === currentUser.uid;

  const formatDate = (timestamp) => {
    if (!timestamp || !timestamp.seconds) return "";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString();
  };

  return (
    <div className={`message ${isOwner ? "owner" : ""}`}>
      <div className="messageInfo">
        <img
          src={
            isOwner
              ? currentUser.photoURL
              : data.user?.photoURL ||
              "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
          }
          alt=""
        />
      </div>
      <div className="messageContent">
        {message.text && <p>{message.text}</p>}
        {message.img && <img src={message.img} alt="sent image" />}
        <div className="messageMeta">
          <span className="time">{formatTime(message.date)}</span>
          {/* <span className="date">{formatDate(message.date)}</span> */}
        </div>
      </div>
    </div>
  );
};

export default Message;
