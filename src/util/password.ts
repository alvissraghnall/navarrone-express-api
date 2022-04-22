import { scrypt } from "crypto";

export async function verifyPassword(pwd: string, hash: string) {
    return new Promise < boolean > ((resolve, reject) => {
      const [salt, key] = hash.split(":");
      scrypt(pwd, salt, 64, (err, derivedKey) => {
        err ? reject(err) : resolve(key === derivedKey.toString('hex'));
      })
    }).catch(err => {
        const error = <Error>err;
        console.error(error.message);
    });
}