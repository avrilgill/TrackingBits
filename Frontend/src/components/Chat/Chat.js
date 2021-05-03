import React, { useState, useEffect,useContext } from "react";
import io from "socket.io-client";
import { UserMessages } from "./UserMessages";
import queryString from "query-string";
import "./Chat.css";
import jwt_decode from "jwt-decode";
import UserContext from "../../provider/authprovider";

let socket;

export const Chat = ({ location }) => {
  const [room, setStateRoom] = useState("");
  const [name, setStateName] = useState("");
  const [users, setStateUsers] = useState("");
  const [message, setStateMessage] = useState("");
  const [messages, setStateMessages] = useState([]);
  const { user } = useContext(UserContext);
  const [email, setEmail] = useState(jwt_decode(user)["email"]);
  const URL = "http://localhost:5000/";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    
    socket = io(URL);

    setStateRoom(room);
    setStateName(name);

    socket.emit("newConnection", { name, room,email }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [URL, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setStateMessages((msgs) => [...msgs, message]);
    });

    socket.on("onlineUserDetails", ({ users }) => {
      setStateUsers(users);
    });
  }, []);

  const sendActionController = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("newMessageAction", message, () => setStateMessage(""));
    }
  };

  return (
    <>
      <div className="grid-container">
        <div className="room-info">
          <h6>Chatroom Name: {room}</h6>
          <h6><a href="/">CLOSE CHAT APPLICATION</a></h6>
        </div>

        <div
          className="chat-messages"
          style={{ height: "300px", width: "100%", overflow: "scroll" }}
        >
          {messages.map((message, index) => (
            <div key={index}>
              <UserMessages message={message} name={name} />
            </div>
          ))}
        </div>

        <div className="users-online">
          {users ? (
            <div>
              <h6>Online Members</h6>
              <h6>
                {users.map(({ name,email }) => (
                  <div key={name}>&#8226;{name}({email})</div>
                ))}
              </h6>
            </div>
          ) : null}
        </div>

        <div className="send-message">
          <form>
            <input
              type="text"
              maxLength="20"
              placeholder="Message"
              value={message}
              onChange={(e) => setStateMessage(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" ? sendActionController(e) : null
              }
            />
            <button onClick={(e) => sendActionController(e)}>SEND</button>
            <p style={{ fontSize: "15px" }}>Max length is 20 characters</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
