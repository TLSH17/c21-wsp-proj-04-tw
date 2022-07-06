import express from "express";
import type { Request, Response } from "express";
import { Useraccount } from "../models";
// import { isLoggedInAPI } from "../guards";
import { dbUser } from "../server";

export const userRoutes = express.Router();

// method: POST, path pattern: /login
userRoutes.post("/login", login);
// userRoutes.get("/users/info", isLoggedInAPI, getUserInfo);

async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  console.log(username, password);
  if (!username || !password) {
    res.status(400).json({ success: false, message: "invalid username/password" });
    return;
  }

  const user = (
    await dbUser.query<Useraccount>(
      /*sql */ `
  SELECT * FROM users
  WHERE username = $1 AND password = $2`,
      [username, password]
    )
  ).rows[0];

  // console.log(user);

  if (!user) {
    res.status(400).json({ success: false, message: "invalid username/password" });
    console.log("Wrong!")
    return;
  }

  req.session["user"] = { id: user.id, username: user.username };
  res.json({ success: true });
  console.log("OK now!")
}

// async function getUserInfo(req: Request, res: Response) {
//   try {
//     const user = req.session["user"];
//     const { id, ...others } = user;
//     res.json({ success: true, user: others });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ success: false, message: "internal server error" });
//   }
// }
