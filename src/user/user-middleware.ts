import type { NextFunction, Request, Response } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import { NoTokenFoundError, ServerError } from "../util/errors";
import { verifyToken } from "../util/jwt";

export default async function (req:Request, res: Response, next: NextFunction) {
    try {
        
        const BEARER = "Bearer";
        const token = req.headers["authorization"];
        if(!token) {
            throw new NoTokenFoundError();
        }
        const payload = await verifyToken(token);
        res.locals = {payload};
        return next();

    } catch (e) {
        const err = e as Error;
        if (err instanceof NoTokenFoundError) {
            return res.status(401)
                .json({
                    message: err.message
                });
        } else if(err instanceof TokenExpiredError) {
            return res.status(401)
                .json({
                    message: err.message
                });
        } else {
            return res.status(500)
                .send(new ServerError().message);
        }
    }
}