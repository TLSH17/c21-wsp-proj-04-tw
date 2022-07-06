// Create interface to define

export interface Useraccount {
    username: string;
    password: string;
    id: any;
}

declare module 'express-session' {
    export interface SessionData {
        user: { [key: string]: any };
    }
}