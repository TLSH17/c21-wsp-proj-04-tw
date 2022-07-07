import express from "express";
import pg from "pg"
import { Request, Response } from "express";
//import { logger } from "../logger";
import path from "path";
//import { Product } from "../models";
import {dbUser} from "../server"
import { userInfo } from "os";


export const profileRoutes = express.Router();


profileRoutes.get("/profiles", getProfile);



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
      const userInfo = (await dbUser.query('select * from users')).rows[page-1]
      console.log(userInfo)

      const result = (await dbUser.query('select * from users')).rows[page-1].id

      //Provide hobby
      const hobby_id = (await dbUser.query(`select hobby_id from user_hobby where user_id = '${result}'`)).rows;
      let hobbyArr: object[]  = []
      for(let i of hobby_id) {
      let a = (await dbUser.query(`select * from hobby where id = ${i.hobby_id}`)).rows[0];
      //console.log(a)
      hobbyArr.push(a)
    }
      console.log(hobbyArr)


      //Provide image
      
      
    //const result = (await dbUser.query(`select id from users where username = '${page}'`)).rows[0].id;
    const image_arr = (await dbUser.query(`select file_name from user_photo where user_id = '${result}'`)).rows;
    console.log(image_arr)

    res.json({ current_page: page, total_page: totalPageNum, image: image_arr, user_info: userInfo, hobby: hobbyArr})
    //res.json({success: true})
    } catch (err) {
        
        res.status(500).json({ success: false, message: "internal server error" });
      }
}
