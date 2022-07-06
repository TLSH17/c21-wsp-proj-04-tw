import type { Request, Response, NextFunction } from "express";

export const isLoggedInStatic = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session["user"]) {
        console.log("isLoggedInMiddleware - fail");
        res.redirect("/");
        return;
    }
    next();
};


