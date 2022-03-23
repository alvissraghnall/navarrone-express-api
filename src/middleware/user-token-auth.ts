import { Request, Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { NoTokenFoundError, ServerError } from "../util/errors";
import { verifyToken } from "../util/jwt";


export default class TokenAuth {
    private static BEARER: string = "Bearer";

    constructor(private readonly req: Request, private res: Response) {

    }


    private async getTokenFromHeader(): Promise<Response | void> {

        try {
            const token = this.req.headers["authorization"]?.replace(TokenAuth.BEARER, "").trim();
            if(!token) throw new NoTokenFoundError();
            const payload = await verifyToken(token);

        } catch (e) {
            const err = <Error> e;
            if(err instanceof NoTokenFoundError) {
                return this
                    .res
                    .status(403)
                    .send(err.message);
            } else if(err instanceof TokenExpiredError) {
                return this
                    .res
                    .status(403)
                    .send(err.message);
            } else if (err instanceof JsonWebTokenError) {
                return this.res
                    .status(500)
                    .send(new ServerError().message);
            }
        }
    }
}