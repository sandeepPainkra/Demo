import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MessageIcon from "@mui/icons-material/Message";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import SidebarChat from "./SidebarChat";
import { useStateValue } from "./StateProvider";
import db from "./firebase";

const Sidebar = () => {
  const [room, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  console.log(user.photoURL);
  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user.photoURL} fontSize="small" />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon fontSize="small" />
          </IconButton>
          <IconButton>
            <MessageIcon fontSize="small" />
          </IconButton>
          <IconButton>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar_searchContainer">
          <SearchIcon />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>
      {/* sidebar chat starts here */}

      <div className="sidebar_chat">
        <SidebarChat addNewChat />
        {room.map((data, index) => {
          return (
            <SidebarChat
              roomName={data.data.RoomName}
              id={data.id}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
