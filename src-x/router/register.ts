import { Router } from "express";
import pool from "../db";
import jwtGenerator from "../util/jwtGenerator";
import { hash, verify } from '../util/scryptFunctions';
import validation from "../middleware/validation";
import checkEmail from "../util/checkEmail";

// import { ValidationError } from "express-validator";

const router = Router();

router.post("/auth", validation, async (req, res) => {
    try {
        const { name, userName, phoneNumber, country, email, password } = req.body;

        const users = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        if (users.rows.length !== 0) {
            return res.status(401).send("User already exists. Please login, or use a different email address.");
        }

        const hashedPassword = await hash(password);

        const newUser = await pool.query("INSERT INTO users (user_name, user_display_name, user_phone_number, user_email, user_password, user_country) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [
            name, userName, phoneNumber, email, hashedPassword, country
        ]);

        res.status(201).send("User registration successful.");
    } catch (err) {
        const _err = <Error>err;
        console.error(_err.message);
        res.status(500).send("Something went wrong from our end. We promise to fix it soon.");
    }
});



export default router;
