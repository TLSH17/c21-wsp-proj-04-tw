import express from "express";
import pg from "pg"
import { Request, Response } from "express";
//import { logger } from "../logger";
import path from "path";
//import { Product } from "../models";
import { dbUser } from "../server"
import { formidableMiddleware } from "../formidable";
import formidable from "formidable";
import { Useraccount } from "../models";


export const profileRoutes = express.Router();


profileRoutes.get("/profiles", getProfile);
// profileRoutes.post("/filter", formidableMiddleware, filter);
profileRoutes.get("/", getMyProfile);
profileRoutes.get("/friendlsit", getfriendList);
profileRoutes.post("/edit", formidableMiddleware, editMyProfile);


// see my profile
//the getMyProfile route must be "/" such that right after login route we can assign a variable to catch req.session
async function getMyProfile(req: Request, res: Response) {
  try {
    const user = req.session["user"]
    const result = (await dbUser.query('select users.id as id, users.username as username, user_photo.file_name as file_name FROM users, user_photo WHERE users.id = user_photo.user_id AND users.id = $1;'
      , [user?.id])).rows;
    const resultInfo = (await dbUser.query('select * from users where id = $1', [user.id])).rows[0]

    // //Provide "MY" image
    // const myimage = (await dbUser.query(`
    // SELECT file_name FROM user_photo WHERE user_id IN (SELECT id FROM users WHERE id = $1`, [user.id]));

    // const result = (await dbUser.query('select * from users where'))
    res.json({ result, resultInfo });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "internal server error" });
  }
}

//edit and change my profile
//need further develop
async function editMyProfile(req: Request, res: Response) {
  try {
    const form = req.form!;
    const id = parseInt(req.session["user"].id)
    const stringId = form.fields.id as String;
    //const id = parseInt(stringId)
    //const password = form.fields.password as string;
    const nickName = form.fields.nick_name as String;
    const gender = form.fields.gender as String;
    const interested_in_gender = form.fields.interested_in_gender as String;
    const date_of_birth = form.fields.date_of_birth;
    const description = form.fields.description as String;
    const nationality = form.fields.nationality as String;
    const email = form.fields.email as String;
    const interestedType = form.fields.interestedType as String;
    //const strHeight = (form.fields.height) as String;
    //const height = parseInt(strHeight)

    const zodiac_signs = form.fields.zodiac_signs as String;
    const image = (form.files.image as formidable.File)?.["newFilename"];
    console.log(typeof id)
    console.log(gender)

    await dbUser.query(`UPDATE users SET nick_name = $1, gender = $2, interested_in_gender = $3, date_of_birth = $4, description = $5, nationality = $6, email = $7, interested_in_type = $8, zodiac_signs = $9 WHERE id = $10`, [nickName, gender, interested_in_gender, date_of_birth, description, nationality, email, interestedType, zodiac_signs, id])

    await dbUser.query(/*sql */`INSERT INTO user_photo (user_id, file_name) Values ($1, $2)`,
      [id, image]);
    //const { id, username, gender } = req.body
    //const result = (await dbUser.query('update users set username = $1, gender = $2 where id = $3', [username, gender, id]))
    //console.log(result)
    res.json({ success: true, message: "Account successfully created" });


  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "internal server error" });
  }
}

//filter profiles
//only can filter by gender now, need fix
// async function filter(req: Request, res: Response) {
//   try {
//     const form = req.form!;
//     const age = form.fields.age as String;
//     const hobby = form.fields.hobby as String;
//     age
//     console.log(age)
//     console.log(hobby)


//let page = parseInt(req.query.page as string, 10);
//
//
//if (isNaN(page)) {
//  page = 1;
//}
//const totalPageNum = (await dbUser.query('select * from users where gender = $1', [`${gender}`])).rows.length
//if (page > totalPageNum) {
//  page = 1;
//}
//if (page === 0) {
//  page = totalPageNum;
//}
//
////Provide info
//const userInfo = (await dbUser.query('select * from users where gender = $1', [`${gender}`])).rows[page - 1]
//console.log(userInfo)
//
//const result = (await dbUser.query('select * from users where gender = $1', [`${gender}`])).rows[page - 1].id
//
////Provide hobby
//const hobby_id = (await dbUser.query(`select hobby_id from user_hobby where user_id = '${result}'`)).rows;
//let hobbyArr: object[] = []
//for (let i of hobby_id) {
//  let a = (await dbUser.query(`select * from hobby where id = ${i.hobby_id}`)).rows[0];
//  //console.log(a)
//  hobbyArr.push(a)
//}
//console.log(hobbyArr)
//
//
////Provide image
//
//
////const result = (await dbUser.query(`select id from users where username = '${page}'`)).rows[0].id;
//const image_arr = (await dbUser.query(`select file_name from user_photo where user_id = '${result}'`)).rows;
//console.log(image_arr)
//
//res.json({ current_page: page, total_page: totalPageNum, image: image_arr, user_info: userInfo, hobby: hobbyArr })
//     res.json(true)


//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ message: "internal server error" });
//   }
// }

//dbUser.connect()

async function getProfile(req: Request, res: Response) {
  const user = req.session["user"]
  const userid = user.id;

  try {
    const user = req.session["user"]
    const userid = user.id;


    let page = parseInt(req.query.page as string, 10);


    // Not friend yet userID
    const notFriendYetID = await (await dbUser.query(`Select user_id_received from friendship_level where friendship_level != 0 and user_id_given = ${userid};`)).rows;


    let notFriendArr = ""

    for (let goodID of notFriendYetID) {
      // console.log(goodID.user_id_received);
      notFriendArr += " AND id != " + goodID.user_id_received + " ";
    }




    if (isNaN(page)) {
      page = 1;
    }
    const totalPageNum = (await dbUser.query(`select * from users WHERE id != '${userid}' ${notFriendArr}`)).rows.length
    if (page > totalPageNum) {
      page = 1;
    }
    if (page === 0) {
      page = totalPageNum;
    }


    //Provide info
    const userInfo = (await dbUser.query(`select * from users WHERE id != '${userid}' ${notFriendArr}`)).rows[page - 1]
    console.log(userInfo)

    const result = (await dbUser.query(`select * from users WHERE id != '${userid}' ${notFriendArr}`)).rows[page - 1].id

    //Provide hobby
    const hobby_id = (await dbUser.query(`select hobby_id from user_hobby where user_id = '${result}'`)).rows;
    let hobbyArr: object[] = []
    for (let i of hobby_id) {
      let a = (await dbUser.query(`select * from hobby where id = ${i.hobby_id}`)).rows[0];
      hobbyArr.push(a)
    }
    // console.log(hobbyArr)

    //Provide image


    //checkfriendlist
    const friendlist = (
      await dbUser.query(/*sql*/`SELECT username from users
      WHERE id IN (SELECT user_id_received FROM friendship_level
          WHERE user_id_given = $1 AND friendship_level >0 );`, [user.id])).rows;



    //const result = (await dbUser.query(`select id from users where username = '${page}'`)).rows[0].id;
    const image_arr = (await dbUser.query(`select file_name from user_photo where user_id = '${result}' AND user_id != '${userid}'`)).rows;
    console.log(image_arr)

    res.json({ current_page: page, total_page: totalPageNum, image: image_arr, user_info: userInfo, hobby: hobbyArr, friendlist: friendlist })
    //res.json({success: true})
  } catch (err) {

    res.status(500).json({ success: false, message: "internal server error" });
  }
}

async function getfriendList(req: Request, res: Response) {
  const user = req.session["user"]
  console.log("getfriendList!!!")
  const friendlist = (
    await dbUser.query(/*sql*/`SELECT username from users
    WHERE id IN (SELECT user_id_received FROM friendship_level
        WHERE user_id_given = $1 AND friendship_level >0 );`, [user.id])).rows;

  const friendphoto = (
    await dbUser.query(/*sql*/`SELECT file_name FROM user_photo
    WHERE user_id IN (SELECT user_id_received FROM friendship_level
        WHERE user_id_given = $1 AND friendship_level >0 );`, [user.id])).rows;
  res.json({ friendlist, friendphoto });

}

