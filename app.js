var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let users = [];

io.on("connection", (socket) => {
  console.log("A User is connected");

  socket.on("setUserName", (data) => {
    if (users.indexOf(data) == -1) {
      users.push(data);
      socket.emit("userSet", { userName: data });
    } else {
      socket.emit(
        "userExist",
        data + " username is taken! Try some other username."
      );
    }
  });

  socket.on("msg", (data) => {
    io.sockets.emit("newmsg", data);
  });
});
http.listen(3000, () => {
  console.log("server running on 3000");
});
