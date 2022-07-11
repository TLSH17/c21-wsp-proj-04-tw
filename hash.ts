import * as bcrypt from "bcryptjs";

const SALT_ROUND = 3;

export async function hashPassword(plainPassword: string){
    const hash = await bcrypt.hash(plainPassword,SALT_ROUND);
    return hash;
}

export async function checkPassword(plainPassword: string,hashPassword:string){
    const match = await bcrypt.compare(plainPassword,hashPassword);
    return match;
}

// async function main(){

//     let saved = await hashPassword("tecky")

//     let match = await checkPassword("tecasdfasdky",saved)
//     console.log("ok???", match);
// }

// main()