import { scrypt } from "crypto";
import type { Response, Request } from "express";
import { getRepository, Repository } from "typeorm";
import { User } from "../../entity/User";

export default class ChangePassword {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = getRepository(User);
    }

    controller = (req: Request, res: Response) => {
        const { 
            oldPassword, 
            newPassword,
            confirmNewPassword 
        } = req.body;
    }

    private async verifyPassword(pwd: string, hash: string) {
        return new Promise < boolean > ((resolve, reject) => {
          const [salt, key] = hash.split(":");
          scrypt(pwd, salt, 64, (err, derivedKey) => {
            err ? reject(err) : resolve(key === derivedKey.toString('hex'));
          })
        }).catch(err => {
            const error = <Error>err;
            return error.message;
        });
    }

    // private checkOldPwdValidity() {
    //     return this.verifyPassword(oldPassword, )
    // }
}