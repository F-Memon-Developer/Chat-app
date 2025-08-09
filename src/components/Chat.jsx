import React, { useContext } from 'react';
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../context/ChatContext';

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user?.displayName || "Select a chat"}</span>
        <div className="chatIcons">
          <img src={Cam} alt="video" />
          <img src={Add} alt="add" />
          <img src={More} alt="more" />
        </div>
      </div>
      
      {data.chatId ? (
        <>
          <Messages />
          <Input />
        </>
      ) : (
        <div className="noChatSelected">👈 Select a user to start chatting</div>
      )}
    </div>
  );
};

export default Chat;
