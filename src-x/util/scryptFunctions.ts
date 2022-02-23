import { scrypt, randomBytes } from 'crypto';

export async function hash(password: string) {
    return new Promise<string>((resolve, reject) => {
        const salt = randomBytes(32).toString("hex");

        scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(salt + ":" + derivedKey.toString('hex'));
        })
    }).catch(err => {
        const error = <Error>err;
        console.error(error.message);
        return error.message;
    })
}

export async function verify(password: string, hash: string) {
    return new Promise<boolean>((resolve, reject) => {
        const [salt, key] = hash.split(":");

        scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(key === derivedKey.toString('hex'));
        })
    }).catch(err => {
        const error = <Error>err;
        return error.message;
    });
}
