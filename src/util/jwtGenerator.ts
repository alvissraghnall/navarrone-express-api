import jwt from "jsonwebtoken";
import { config } from 'dotenv';
import { readFileSync } from 'fs'

config();

const [dir, excess] = __dirname.split("/src")

const PRIVATE_KEY = readFileSync(dir + "/private.key", "utf8");


export default function jwtGenerator(user_id: string) {
    const payload = {
      user_id
    }

    return jwt.sign(payload, PRIVATE_KEY, {
        algorithm: "RS256",
        expiresIn: "3h",

    });
}
