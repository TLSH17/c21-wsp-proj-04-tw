// Create interface to define\\


export interface Useraccount {
    username: string;
    password: string;
    id: number;
    nickname: string;
    gender: string;
    interested_in_gender: string;
    date_of_birth: string;
    description: string;
    nationality: string;
    email: string;
    interestedType: string;
    height: string;
    zodiac_signs: string;
}


declare module 'express-session' {
    export interface SessionData {
        user: { [key: string]: any };
        newUser: { [key: string]: any };
        form: { [key: string]: any };
    }
}