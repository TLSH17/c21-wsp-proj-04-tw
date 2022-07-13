import express from "express";
import type { Request, Response, NextFunction } from "express";
// import { Useraccount } from "../models";
// import { isLoggedInAPI } from "../guards";
import { dbUser } from "../server";
import { formidableMiddleware } from "../formidable";
import { hashPassword, checkPassword } from "../hash";
import formidable from "formidable";

export const userRoutes = express.Router();
export const newUserRoutes = express.Router();
export const showUser = express.Router();

// method: POST, path pattern: /login & /newUser
userRoutes.post("/login", login);

//userRoutes.post("/hash", processHashPassword);
newUserRoutes.post("/newUser", formidableMiddleware, newUser);

//loadother profiles & like
showUser.post("/member/likeProfile", likeProfile);

//loadother profiles & dislik
showUser.post("/member/dislikeProfile", dislikeProfile);



async function login(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body;
  console.log(username, password);
  if (!username || !password) {
    res.status(400).json({ success: false, message: "invalid username/password" });
    return;
  }

  // hashing login
  const users = (await dbUser.query(`SELECT * FROM users WHERE users.username = $1`, [username])).rows;
  const user = users[0];

  if (!user) {
    return res.status(400).json({ success: false, message: "wrong account name" });
  };

  const match = await checkPassword(password, user.password);

  if (match) {
    // if (req.session) {
    req.session['user'] = {
      id: user.id,
      name: user.name,
    };
    // console.log(req.session["user"]);
    // }
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "invalid username/password" });
    console.log("Wrong!")
  }

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
  const image = (form.files.image as formidable.File)?.["newFilename"];


  //hashing
  let hashedPassword = await hashPassword(password);

  const currentUserName = (await dbUser.query('Select username from users')).rows;
  const checkUserExist = currentUserName.findIndex(x => x.username == username);

  if (checkUserExist !== -1) {
    console.log("Already exists!!!!");
    return res.status(400).json({ success: false, message: "Already exists!!!!" });
  }


  // console.log(checkUserExist);

  await dbUser.query(/*sql */`INSERT INTO users (username, password, nick_name, gender, interested_in_gender, date_of_birth, description, nationality, email, interested_in_type, height, zodiac_signs) Values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING id`,
    [username, hashedPassword, nickName, gender, interested_in_gender, date_of_birth, description, nationality, email, interestedType, height, zodiac_signs], function () {

      // let newlyCreatedUserid = result.rows[0].id;
      // dbUser.query(/*sql */`INSERT INTO user_photo (user_id, file_name) Values ($1, $2)`,
      //   [newlyCreatedUserid, image]);
    });

  res.json({ success: true, message: "Account successfully created" });
  return;
}


async function likeProfile(req: Request, res: Response, next: NextFunction) {
  const { like, targetid } = req.body;

  const my_self = req.session["user"]
  const my_id = my_self.id;


  console.log("myid is : " + my_id)
  console.log("targetid is : " + targetid)

  // console.log("like by : " + my_id)
  // console.log("like to : " + currentProfileresult)
  const checkfriendisOnlist = await dbUser.query(`Select * from friendship_level WHERE user_id_given = $1 AND user_id_received = $2`,
    [my_id, targetid]);

  // console.log(checkfriendisOnlist.rows[0]);
  if (!checkfriendisOnlist.rows[0]) {
    await dbUser.query(/*sql*/`INSERT INTO friendship_level (user_id_given, user_id_received, friendship_level) Values ($1,$2,$3)`,
      [my_id, targetid, 1]);
    // res.status(200).json({...})
    // res.json({ success: true, message: "input friendship_level" });
    // return;
  } else {
    const newfriendshipLevel = checkfriendisOnlist.rows[0].friendship_level + 1;
    await dbUser.query(/*sql*/`UPDATE friendship_level SET friendship_level =$1 WHERE user_id_given =$2 AND user_id_received =$3`, [newfriendshipLevel, my_id, targetid]);
  }

}

async function dislikeProfile(req: Request, res: Response, next: NextFunction) {
  const { disLike, targetid } = req.body;
  // const like = req.body.like
  // console.log("display!" + username, password);


  const my_self = req.session["user"]
  const my_id = my_self.id;

  console.log("myid is : " + my_id)
  console.log("targetid is : " + targetid)


  // console.log("dislike to : " + currentProfileresult)

  await dbUser.query(/*sql*/`INSERT INTO friendship_level (user_id_given, user_id_received, friendship_level) Values ($1,$2,$3)`,
    [my_id, targetid, -1]);
  // res.status(200).json({...})
  // res.json({ success: true, message: "input friendship_level" });
  return;
}

// DELETE /api/auth/logout
userRoutes.delete('/logout', async (req, res) => {
  console.log("hihi")
  if (req.session) {
    console.log("===================session", req.session)
    await req.session.destroy(err => {
      if (err) {
        res.clearCookie('connect.sid',{
          path: '/'
        });
      } else {
        res.send('Logout successful')
      }
    });
  } else {
    res.end()
  }
})





























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
