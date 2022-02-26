
import type { Request, Response, NextFunction } from 'express';

export default function (req: Request, res: Response, next: NextFunction): Response | void {
    const { name, userName, phoneNumber, country, email, password } = req.body;
    function validEmail(userEmail: string) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
    if (req.baseUrl === "/api/register") {
        console.log(!email.length);
        if (![email, name, password, userName, phoneNumber, country].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        }
    }
    else if (req.baseUrl === "/api/login") {
       
        if (![email, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        }

    }
    return next();
}

