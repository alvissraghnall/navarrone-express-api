import { JwtPayload, sign, TokenExpiredError, verify } from "jsonwebtoken";
import { join } from "path";
import { readFile } from "fs";
import { Payload } from "../types/General";
import { resolve } from "path/posix";

const file = (path: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        readFile(path, "utf-8", (err, data) => {
            if(err) {reject(err); return; }
            resolve(data);
        })
    })
}


// use @types/uuid
export const signToken = async (payload: Payload) => {
    const privateKey = await file(join(__dirname + "../../../private.pem"));
    // console.log(privateKey);
    
    return sign(payload, privateKey, {
        expiresIn: "2h",
        algorithm: "RS256"
    });
}

export const verifyToken = async (token: string): Promise<string | JwtPayload | undefined> => {
    const publicKey = await file(join(__dirname + "../../../public.pem"));

    return new Promise((resolve, reject) => {
        verify(token, publicKey, {
            algorithms: ["RS256"]
        }, (err, payload) => {
            if(err) {
                const error = <Error> err;
                reject(error);
            }
            resolve(payload);
        })
    })

}

// signToken({id: "bh"});