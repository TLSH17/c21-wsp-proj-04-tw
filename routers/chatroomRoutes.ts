import express from "express";
import type { Request, Response, NextFunction } from "express";
//import httpStatusCodes from "http-status-codes";
//import { logger } from "../utils/logger";
import { dbUser, io } from "../server";
import { Chatroom } from "../models";
//import { Socket } from "socket.io";

export const chatroomRoutes = express.Router();

chatroomRoutes.get("/", getUserAllChatroom);
chatroomRoutes.get("/get/:cid", getUserMessage);
chatroomRoutes.post("/message/:cid", sendMessage);

//load messages
async function getUserMessage(req: Request, res: Response, next: NextFunction) {
  const chatroomId = parseInt(req.params.cid, 10);
  console.log("Someone has joined", chatroomId)
  const result = (await dbUser.query('SELECT * FROM message where chatroom_id = $1', [chatroomId])).rows
  //console.log(result)
  res.json(result)
}


//load rooms
async function getUserAllChatroom(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.session["user"];
    const chatroomArr = (
      await dbUser.query(
        /*sql*/ `SELECT * FROM chatroom WHERE user_id_left = $1 OR user_id_right = $2`,
        [user.id, user.id]
      )
    ).rows;
    //console.log(chatroomArr)
    
    for(let i of chatroomArr) {
    let targetUserId = i.user_id_left === user.id ? i.user_id_right : i.user_id_left;
    //console.log("targetUserId", targetUserId)
    const name = (await dbUser.query('SELECT username FROM users where id = $1', [targetUserId])).rows[0].username;
    //console.log("name", name)
    const image = (await (await dbUser.query('SELECT file_name FROM user_photo where user_id = $1', [targetUserId])).rows[0].file_name);
    //console.log("image", image)
    i.name = name;
    i.image = image;

    }

    res.json({chatroomArr, user});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
}



//send messages
async function sendMessage(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.session["user"];
    const { content, sentTime } = req.body;
    const chatroomId = parseInt(req.params.cid, 10);
    console.log(content)
    console.log(sentTime)
    console.log("someone has joined", chatroomId)
    if (isNaN(chatroomId)) {
      res.status(400).json({ message: "invalid user id" });
      return;
    }

    const chatroom = (await dbUser.query<Chatroom>(
        /*sql */ `SELECT * FROM chatroom
        WHERE id = $1 AND (user_id_left = $2 OR user_id_right = $3)`,
        [chatroomId, user.id, user.id]
      )
    ).rows[0];
    if (!chatroom) {
      res.status(400).json({ message: "invalid chatroom" });
      return;
    }

    await dbUser.query(
      /*sql */ `INSERT INTO message (content, chatroom_id, sender, time_started) VALUES ($1, $2, $3, $4);`,
      [content, chatroomId, user.id, sentTime]
    );

    const time = (await dbUser.query(
      /*sql */ `SELECT time_started from message where content = $1 and chatroom_id = $2 and sender= $3 and time_started = $4;`,
      [content, chatroomId, user.id, sentTime]
    )).rows[0];

    const targetUserId = chatroom.user_id_left === user.id ? chatroom.user_id_right : chatroom.user_id_left;

    
   
   //target and myself
    io.to(`room-${targetUserId}`).emit("message", { chatroom_id: chatroomId, content, time });
    //io.to(`room-${user.id}`).emit("message", { chatroom_id: chatroomId, content });
  

    
    res.json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
}
