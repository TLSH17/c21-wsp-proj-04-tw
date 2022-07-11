import express from "express";
import type { Request, Response, NextFunction } from "express";
import { Useraccount } from "../models";
// import { isLoggedInAPI } from "../guards";
import { dbUser } from "../server";
import { formidableMiddleware } from "../formidable";
import { hashPassword, checkPassword } from "..//hash";

export const userRoutes = express.Router();
export const newUserRoutes = express.Router();

// method: POST, path pattern: /login & /newUser
userRoutes.post("/login", login);
userRoutes.post("/hash", processHashPassword);

newUserRoutes.post("/newUser", formidableMiddleware, newUser);

// userRoutes.get("/users/info", isLoggedInAPI, getUserInfo);
async function processHashPassword (req: Request, res: Response) {
  const {username} = req.body;
  console.log(username)
  const result = (await dbUser.query(`SELECT * FROM users WHERE users.username = $1`, [username])).rows[0].password;
  console.log(result)
  const a = await hashPassword(result)
  console.log(a)
  await dbUser.query(`Update users set password = $1 where username = $2`, [a, username])
  res.json({success:true})
}

async function login(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body;
  console.log(username, password);
  if (!username || !password) {
    res.status(400).json({ success: false, message: "invalid username/password" });
    return;
  }

  // const user = (
  //   await dbUser.query<Useraccount>(
  //     /*sql */ `
  // SELECT * FROM users
  // WHERE username = $1 AND password = $2`,
  //     [username, password]
  //   )
  // ).rows[0];

  // if (!user) {
  // res.status(400).json({ success: false, message: "invalid username/password" });
  // console.log("Wrong!")
  //   return;
  // }
  // hashing login
  const users = (await dbUser.query(`SELECT * FROM users WHERE users.username = $1`, [username])).rows;
  const user = users[0];

  if (!user) {
    return res.status(400).json({ sucess: false, message: "wrong account name" });
  };

  const match = await checkPassword(password, user.password);

  if (match) {
    if (req.session) {
      req.session['user'] = {
        id: user.id
      };
    }
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "invalid username/password" });
    console.log("Wrong!")
  }

  //req.session["user"] = { id: user.id, username: user.username };
  //console.log(req.session["user"])
  //res.json({ success: true });
  //console.log("OK now!");
  // next();
}

async function newUser(req: Request, res: Response, next: NextFunction) {
  // const { username, password, nickName, gender, interested_in_gender, date_of_birth, description, nationality, email, interestedType, height, zodiac_signs } = req.body;

  const form = req.form!;
  const username = form.fields.username as String;
  const password = form.fields.password as string;
  const nickName = form.fields.nickName as String;
  const gender = form.fields.gender as String;
  const interested_in_gender = form.fields.interested_in_gender as String;
  const date_of_birth = form.fields.date_of_birth;
  const description = form.fields.description as String;
  const nationality = form.fields.nationality as String;
  const email = form.fields.email as String;
  const interestedType = form.fields.interestedType as String;
  const height = form.fields.height as String;
  const zodiac_signs = form.fields.zodiac_signs as String;
  const image = form.files.image;

  //hashing
  let hashedPassword = await hashPassword(password);

  const currentUserName = (await dbUser.query('Select username from users')).rows;
  const checkUserExist = currentUserName.findIndex(x => x.username == username);

  if (checkUserExist !== -1) {
    console.log("Already exists!!!!");
    return res.status(400).json({ success: false, message: "Already exists!!!!" });
  } else {
    next();
  }

  // console.log(checkUserExist);

  await dbUser.query(/*sql */`INSERT INTO users (username, password, nick_name, gender, interested_in_gender, date_of_birth, description, nationality, email, interested_in_type, height, zodiac_signs) Values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING id`,
    [username, hashedPassword, nickName, gender, interested_in_gender, date_of_birth, description, nationality, email, interestedType, height, zodiac_signs], function (err, result) {

      let newlyCreatedUserid = result.rows[0].id;
      dbUser.query(/*sql */`INSERT INTO user_photo (user_id, file_name) Values ($1, $2)`,
        [newlyCreatedUserid, image]);


    }
  );
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
