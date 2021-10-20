import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import db from "./firebase";
import "./SidebarChat.css";

const SidebarChat = ({ addNewChat, roomName, id }) => {
  const [seed, setSeed] = useState();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, []);
  console.log(messages);
  const CreateChat = () => {
    const RoomName = prompt("Pleasse Enter Room name:");
    if (RoomName) {
      // Push all data into databse

      db.collection("rooms").add({
        RoomName: RoomName,
      });
    }
  };
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 500));
  }, []);

  return !addNewChat ? (
    <Link className="nav_link" to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar
          src={`https://avatars.dicebear.com/api/open-peeps/${seed}.svg`}
        />
        <div className="sidebarChat_info">
          <h2>{roomName}</h2>
          <p>{messages[0]?.text}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={CreateChat} className="sidebarChat addnewchat">
      <h2>add new chat</h2>
    </div>
  );
};

export default SidebarChat;
