import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { ChatContext } from "../context/ChatContext";

const Chats = () => {
  const [chats, setChats] = useState({});
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => unsub();
    };

    currentUser?.uid && getChats();
  }, [currentUser?.uid]);

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <div className="chats">
 {Object.entries(chats)
  .filter(([_, chatData]) => chatData && chatData.userInfo) // Yeh line zaroor lagao
  .sort((a, b) => b[1]?.date?.seconds - a[1]?.date?.seconds)
  .map(([chatId, chatData]) => (
    <div
      className="userChat"
      key={chatId}
      onClick={() => handleSelect(chatData.userInfo)}
    >
      <img
        src={
          chatData.userInfo.photoURL ||
          "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
        }
        alt=""
      />
      <div className="userChatInfo">
        <span>{chatData.userInfo.displayName}</span>
        <p>
          {chatData?.lastMessage?.text
            ? chatData.lastMessage.text
            : "Say hi 👋"}
        </p>
      </div>
    </div>
  ))}

    </div>
  );
};

export default Chats;
