import { useState, useEffect } from "react";
import socket from "../utils/socket";

export default function Chat() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit("send_message", msg);
    setMsg("");
  };

  return (
    <div>
      <h2>💬 Chat</h2>

      {chat.map((c, i) => (
        <p key={i}>{c}</p>
      ))}

      <input value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
