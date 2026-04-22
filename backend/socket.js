export const initSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("send_message", (msg) => {
      io.emit("receive_message", msg);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
