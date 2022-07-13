import express from 'express'
import path from 'path';
import expressSession from 'express-session';
import { isLoggedInStatic, isLoggedInAPI } from "./guards";
import http from "http";
import { Server as SocketIO } from "socket.io";
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
import { userRoutes, newUserRoutes, showUser } from "./routers/userRoutes";
// import { newUserRoutes } from "./routers/userRoutes";
import { profileRoutes } from "./routers/profileRoutes";
import { chatroomRoutes } from "./routers/chatroomRoutes";

export const dbUser = new pg.Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

dbUser.connect();

const app = express();
const server = new http.Server(app);
export const io = new SocketIO(server);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



//Session
const sessionMiddleware = expressSession({
  secret: "WSPPROJECT",
  resave: true,
  saveUninitialized: true,
});
app.use(sessionMiddleware);

io.use((socket, next) => {
  let req = socket.request as express.Request;
  let res = req.res as express.Response;
  sessionMiddleware(req, res, next as express.NextFunction);
});

io.on("connection", function (socket) {
  console.log(`${socket.id} is connected !!!`);
  const req = socket.request as express.Request;
  if (req.session["user"]) {
    const userId = req.session["user"].id;
    socket.join(`room-${userId}`);
  }
  socket.on('message', (msg: string) => {
    console.log('message: ' + msg);



  });
  //sendMessage(msg)
});

///////////

app.use((req, res, next) => {
  console.log(`req path: ${req.path}, method: ${req.method}`);
  next();
});



// Route Handlers

app.use(userRoutes);
app.use(newUserRoutes);
app.use(showUser);
app.use("/member", isLoggedInAPI, profileRoutes);
app.use("/api/chatroom", isLoggedInAPI, chatroomRoutes);
//app.use(newUserRoutes);

const PORT = 8080

app.use(express.static(path.join(__dirname, 'public')))
app.use(isLoggedInStatic, express.static(path.join(__dirname, "private"))); // for all users
app.use("/image", express.static(path.join(__dirname, "private/image"))); // for upload pic


app.use((req, res) => {
  res.sendFile(path.resolve("./public/404.html"));
});

server.listen(PORT, () => {
  console.log(`listening to PORT: ${PORT}`);
});

