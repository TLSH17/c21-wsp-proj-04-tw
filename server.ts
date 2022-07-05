import express from 'express'
import { Request, Response } from 'express'
import path from 'path';
import expressSession from 'express-session'


const app = express()

//Session
app.use(
    expressSession({
        secret: 'XXXXX', //內容無咩所謂
        resave: true,
        saveUninitialized: true,
    }),
)

declare module 'express-session' {
    interface SessionData {
        name?: string
    }
}
///////////

app.use((req, res, next) => {
    console.log(`req path: ${req.path}, method: ${req.method}`);
    next();
});


// app.get('/', function (req: Request, res: Response, next) {
//     res.end('Hello World')
//     next();
// })

const PORT = 8080

app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')))


app.use((req, res) => {
    res.sendFile(path.resolve("./public/404.html"));
});

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`)
})
