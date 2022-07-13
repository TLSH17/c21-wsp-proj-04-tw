import express from "express";
import pg from "pg"
import { Request, Response } from "express";
//import { logger } from "../logger";
import path from "path";
//import { Product } from "../models";
import { dbUser } from "../server"
import { userInfo } from "os";
import { Useraccount } from "../models";


export const profileRoutes = express.Router();


profileRoutes.get("/profiles", getProfile);
profileRoutes.post("/filter", filter);
profileRoutes.get("/", getMyProfile);
profileRoutes.get("/friendlsit", getfriendList);
profileRoutes.post("/edit", editMyProfile);


// see my profile
//the getMyProfile route must be "/" such that right after login route we can assign a variable to catch req.session
async function getMyProfile(req: Request, res: Response) {
  try {
    const user = req.session["user"]
    console.log(user);
    const result = (await dbUser.query('select * from users where id = $1', [user?.id])).rows
    res.json(result)
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "internal server error" });
  }
}

//edit and change my profile
//need further develop
async function editMyProfile(req: Request, res: Response) {
  try {
    const { id, username, gender } = req.body
    const result = (await dbUser.query('update users set username = $1, gender = $2 where id = $3', [username, gender, id]))
    console.log(result)
    res.json({ success: true })


  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "internal server error" });
  }
}


//filter profiles
//only can filter by gender now, need fix
async function filter(req: Request, res: Response) {
  try {
    const { gender } = req.body
    console.log(gender)
    let page = parseInt(req.query.page as string, 10);


    if (isNaN(page)) {
      page = 1;
    }
    const totalPageNum = (await dbUser.query('select * from users where gender = $1', [`${gender}`])).rows.length
    if (page > totalPageNum) {
      page = 1;
    }
    if (page === 0) {
      page = totalPageNum;
    }

    //Provide info
    const userInfo = (await dbUser.query('select * from users where gender = $1', [`${gender}`])).rows[page - 1]
    console.log(userInfo)

    const result = (await dbUser.query('select * from users where gender = $1', [`${gender}`])).rows[page - 1].id

    //Provide hobby
    const hobby_id = (await dbUser.query(`select hobby_id from user_hobby where user_id = '${result}'`)).rows;
    let hobbyArr: object[] = []
    for (let i of hobby_id) {
      let a = (await dbUser.query(`select * from hobby where id = ${i.hobby_id}`)).rows[0];
      //console.log(a)
      hobbyArr.push(a)
    }
    console.log(hobbyArr)


    //Provide image


    //const result = (await dbUser.query(`select id from users where username = '${page}'`)).rows[0].id;
    const image_arr = (await dbUser.query(`select file_name from user_photo where user_id = '${result}'`)).rows;
    console.log(image_arr)

    res.json({ current_page: page, total_page: totalPageNum, image: image_arr, user_info: userInfo, hobby: hobbyArr })


  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "internal server error" });
  }
}

//dbUser.connect()

async function getProfile(req: Request, res: Response) {

  //const { username} = req.body;
  //console.log(username)

  try {

    let page = parseInt(req.query.page as string, 10);


    if (isNaN(page)) {
      page = 1;
    }
    const totalPageNum = (await dbUser.query('select * from users')).rows.length
    if (page > totalPageNum) {
      page = 1;
    }
    if (page === 0) {
      page = totalPageNum;
    }



    //Provide info
    const userInfo = (await dbUser.query('select * from users')).rows[page - 1]
    console.log(userInfo)

    const result = (await dbUser.query('select * from users')).rows[page - 1].id

    //Provide hobby
    const hobby_id = (await dbUser.query(`select hobby_id from user_hobby where user_id = '${result}'`)).rows;
    let hobbyArr: object[] = []
    for (let i of hobby_id) {
      let a = (await dbUser.query(`select * from hobby where id = ${i.hobby_id}`)).rows[0];
      //console.log(a)
      hobbyArr.push(a)
    }
    console.log(hobbyArr)


    //Provide image


    //const result = (await dbUser.query(`select id from users where username = '${page}'`)).rows[0].id;
    const image_arr = (await dbUser.query(`select file_name from user_photo where user_id = '${result}'`)).rows;
    console.log(image_arr)

    res.json({ current_page: page, total_page: totalPageNum, image: image_arr, user_info: userInfo, hobby: hobbyArr })
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

  // const friendphoto = (
  //   await dbUser.query(/*sql*/`SELECT filename FROM user_photo
  //   WHERE id IN (SELECT user_id_received FROM friendship_level
  //       WHERE user_id_given = $1 AND friendship_level >0 );`, [user.id])).rows;


  res.json({ friendlist });
}