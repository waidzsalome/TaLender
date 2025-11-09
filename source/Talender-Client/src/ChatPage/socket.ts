import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  transports: ["websocket"],
});
socket.on("connect", () => {
  console.log("✅ Connected to socket server:", socket.id);
});

socket.on("disconnect", () => {
  console.log("❌ Disconnected from server");
});
socket.on("newMessage", (msg) => {
  console.log("💬 New message received:", msg);
});

socket.on("connect_error", (err) => {
  console.error("⚠️ Connection error:", err);
});

export default socket;
