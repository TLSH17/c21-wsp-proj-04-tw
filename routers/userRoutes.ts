import express from "express";
import type { Request, Response, NextFunction } from "express";
import { Useraccount } from "../models";
// import { isLoggedInAPI } from "../guards";
import { dbUser } from "../server";

export const userRoutes = express.Router();
export const newUserRoutes = express.Router();

// method: POST, path pattern: /login & /newUser
userRoutes.post("/login", login);
newUserRoutes.post("/newUser", newUser);

// userRoutes.get("/users/info", isLoggedInAPI, getUserInfo);

async function login(req: Request, res: Response, next: NextFunction) {
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
  console.log("OK now!");
  // next();
}

async function newUser(req: Request, res: Response, next: NextFunction) {
  const { username, password, gender, interested_in_gender, date_of_birth, description } = req.body;
  console.log(username, password, gender, interested_in_gender, date_of_birth, description);

  // const form = req.form!;
  // const content = form.fields.content as string | undefined;

  const newUser = `INSERT INTO users (username,password,gender,interested_in_gender,date_of_birth,description) Values ($1,$2,$3,$4,$5,$6)`;
  await dbUser.query(newUser, [username, password, gender, interested_in_gender, date_of_birth, description]);

  res.json({ success: true });
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
