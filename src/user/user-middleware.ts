import type { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { NoTokenFoundError, ServerError } from "../util/errors";
import { verifyToken } from "../util/jwt";

export default async function (req:Request, res: Response, next: NextFunction) {
    try {
        
        const BEARER = "Bearer";
        const tokenFromHeader = req.headers["authorization"];
        if(!tokenFromHeader) {
            throw new NoTokenFoundError();
        }
        const token = tokenFromHeader.replace(BEARER, "").trim();;
        
        const payload = await verifyToken(token);
        res.locals.payload = payload;
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
        } else if ( err instanceof JsonWebTokenError) {
            return res.status(400)
                .json({ message: "Invalid JWT provided"});
        } else {
            return res.status(500)
                .send(new ServerError().message);
        }
    }
}