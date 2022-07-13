import formidable from "formidable";
import fs from "fs";
import type { Request, Response, NextFunction } from "express";
import type { Fields, Files } from "formidable";

declare global {
    namespace Express {
        interface Request {
            form?: {
                fields: Fields;
                // files: any;
                files: Files;
            };
        }
    }
}


const uploadDir = "private/image";
fs.mkdirSync(uploadDir, { recursive: true });

const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFiles: 1,
    maxFileSize: 200 * 1024 ** 2, // the default limit is 200KB
    filter: (part) => part.mimetype?.startsWith("image/") || false,


    // (part) => part.mimetype?.startsWith("image/") || false
});

export const formidableMiddleware = (req: Request, res: Response, next: NextFunction) => {
    form.parse(req, (err, fields, files) => {
        console.log({ err, fields, files });
        if (err) {
            console.error(err);
            res.status(400).json({ success: false, message: "failed to upload file" });
            return;
        }
        // let test = files.image;
        // console.log("check content test", test)
        req.form = { fields, files };
        next();
    });

    // form.on('fileBegin', (formName, file) => {
    //     // accessible here 
    //     // formName the name in the form (<input name="thisname" type="file">) or http filename for octetstream
    //     // file.originalFilename http filename or null if there was a parsing error
    //     // file.newFilename generated hexoid or what options.filename returned
    //     // file.filepath default pathnme as per options.uploadDir and options.filename
    //     // file.filepath = CUSTOM_PATH // to change the final path
    //     let newFilename = file.newFilename;
    //     let newform = formName;
    //     console.log("check check 123: ", file.newFilename)
    //     console.log("chekc check form name:", formName)
    //     // let filenewname = file.newFilename;
    //     // return newFilename;

    // });

};
