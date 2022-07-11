import express from 'express'
import path from 'path';
import expressSession from 'express-session';
import { isLoggedInStatic } from "./guards";
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
import { userRoutes } from "./routers/userRoutes";
import { newUserRoutes } from "./routers/userRoutes";
import { profileRoutes } from "./routers/profileRoutes";

export const dbUser = new pg.Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
});

dbUser.connect();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Session
app.use(
    expressSession({
        secret: 'XXXXX',
        resave: true,
        saveUninitialized: true,
    }),
)

///////////

app.use((req, res, next) => {
    console.log(`req path: ${req.path}, method: ${req.method}`);
    next();
});



// Route Handlers

app.use(userRoutes);
app.use(newUserRoutes);
app.use(profileRoutes);
//app.use(newUserRoutes);

const PORT = 8080

app.use(express.static(path.join(__dirname, 'public')))
app.use(isLoggedInStatic, express.static(path.join(__dirname, "private"))); // for all users


app.use((req, res) => {
    res.sendFile(path.resolve("./public/404.html"));
});

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`)
})
