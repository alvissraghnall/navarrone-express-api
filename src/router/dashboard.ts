import { Router } from 'express';
import pool from '../db';
import auth from "../middleware/auth";
const router = Router();

console.log(new Date(1633827055 * 1000), new Date(1633837855 * 1000));

router.get("/", auth, async (req, res) => {
    try {
        console.log(req.user);
        const user = await pool.query("SELECT user_display_name FROM users WHERE user_id = $1", [req.user ? req.user.user_id : null]);

        res.json(user.rows[0]);
    } catch (err) {
        const _err = <Error>err;
        console.error(_err.message);
        res.status(500).send("Something went wrong from our end. We promise to fix it soon.");
    }
});

export default router;

