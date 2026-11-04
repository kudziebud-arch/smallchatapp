const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const path = require("path");

const PORT = 5000;

// Serve HTML file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Socket connection
io.on("connection", (socket) => {

    console.log("A user connected");

    socket.on("send name", (username) => {
        io.emit("send name", username);
    });

    socket.on("send message", (chat) => {
        io.emit("send message", chat);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });

});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});