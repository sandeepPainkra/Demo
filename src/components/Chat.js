import Search from "@mui/icons-material/Search";
import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Chat.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import MicIcon from "@mui/icons-material/Mic";
import { useParams } from "react-router";
import db, { auth } from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";

const Chat = () => {
  const [{ user }, dispatch] = useStateValue();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [seed, setSeed] = useState();
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState();

  console.log(messages);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().RoomName);
        });
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [roomId]);

  const SendMessage = (e) => {
    e.preventDefault();
    setInput("");

    // add messaage data into data base

    db.collection("rooms").doc(roomId).collection("messages").add({
      text: input,
      userName: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 500));
  }, [roomId]);

  return (
    <div className="chat">
      <div className="chatHeader">
        <div className="chatHeader_left">
          <Avatar
            onClick={firebase.auth().signOut()}
            src={`https://avatars.dicebear.com/api/open-peeps/${seed}.svg`}
          />
          <div className="chatHeader_info">
            <h2>{roomName}</h2>
            <p>{new Date(messages[0]?.timestamp?.toDate()).toUTCString()}</p>
          </div>
        </div>
        <div className="chatHeader_right">
          <IconButton>
            <Search />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      {/* Chat body starts here */}

      <div className="chat_body">
        {messages.map((data) => {
          return (
            <p
              className={`chat_message ${
                user.displayName === data.userName && "chat_receiver"
              }`}
            >
              {user.displayName === data.userName ? null : (
                <span className="chat_name">{data.userName}</span>
              )}

              {data.text}
              <span className="chat_timestamp">
                {new Date(data?.timestamp?.toDate()).toUTCString()}
              </span>
            </p>
          );
        })}
      </div>

      {/* chat footer here */}

      <div className="chat__footer">
        <EmojiEmotionsIcon />
        <form>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            type="text"
            placeholder="Enter some text here.."
          />
          <button onClick={SendMessage} type="submit">
            Send message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
