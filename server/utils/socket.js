const socketIo = require("socket.io");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (server, app) => {
  let currentUser, token;

  app.use(async (req, res, next) => {
    token = req.cookies.token;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      currentUser = await User.findById(decoded.id);
    }

    next();
  });

  const io = socketIo(server, {
    cors: {
      origin: "*",
    },
  });

  app.use((req, res, next) => {
    req.io = socketIo;
    next();
  });

  io.use((socket, next) => {
    socket.handshake.token = token;
    socket.handshake.user = currentUser;
    next();
  }).on("connection", (socket) => {
    console.log({ token: socket.handshake.token, user: socket.handshake.user });
  });
};
