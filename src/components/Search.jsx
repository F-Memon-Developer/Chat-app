import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Search = () => {
  const [allUsers, setAllUsers] = useState([]); // sab users
  const [searchTerm, setSearchTerm] = useState(""); // search bar ka input
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  // Pehli baar load pe sab users fetch karo
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);

        const usersList = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().uid !== currentUser.uid) {
            usersList.push(doc.data());
          }
        });

        setAllUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
        setErr(true);
      }
    };

    fetchUsers();
  }, [currentUser.uid]);

  const handleSelect = async (user) => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), {
          users: [currentUser.uid, user.uid],
          messages: [],
        });
      }

      await setDoc(
        doc(db, "userChats", currentUser.uid),
        {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        },
        { merge: true }
      );

      await setDoc(
        doc(db, "userChats", user.uid),
        {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        },
        { merge: true }
      );

      dispatch({
        type: "CHANGE_USER",
        payload: user,
      });
    } catch (err) {
      console.error("Error creating chat:", err);
      setErr(true);
    }
  };

  // Filtered list
  const filteredUsers = allUsers.filter((user) =>
    user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      </div>

      {err && <span>Error fetching users!</span>}

      {filteredUsers.map((user) => (
        <div
          className="userChat"
          key={user.uid}
          onClick={() => handleSelect(user)}
        >
          <img
            src={
              user.photoURL ||
              "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            }
            alt=""
          />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Search;
