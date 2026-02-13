import { Request, Response, NextFunction } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
    // console.log(`%c${req.method}%c : ${req.originalUrl}`, "color: green; background-color: white", "color: white");
    console.log(`${req.method} : ${req.originalUrl}`);
    next()
}