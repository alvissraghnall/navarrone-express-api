import { JwtPayload, verify } from "jsonwebtoken";
import type {Request, Response, NextFunction} from 'express';
import { readFileSync } from 'fs';


const [dir, excess] = __dirname.split("/src");

const PUBLIC_KEY = readFileSync(dir + "/priv.key.pub", "utf8");


export default async function (req: Request, res: Response, next: NextFunction) {
    try {
        const jwtToken = req.header("token");

        if(!jwtToken){
            return res.status(403).json("Not authorized");
        }

        const payload = verify(jwtToken, PUBLIC_KEY);

        req.user = payload;
        return next();
    } catch (err) {
        const _err = <Error>err;
        console.error(_err.message);
        return res.status(403).send("Not Authorized!");
    }
}
