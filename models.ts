// Create interface to define\\


export interface Useraccount {
    username: string;
    password: string;
    id: number;
    nickname: string;
    email: string;
}


declare module 'express-session' {
    export interface SessionData {
        user: { [key: string]: any };
        newUser: { [key: string]: any };
        form: { [key: string]: any };
    }
}