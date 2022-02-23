import { Router } from "express";
import pool from "../db";


const router = Router();

router.post("/", async (req, res) => {
  try {
    const { userName } = req.body;
    const users = await pool.query(
      "SELECT user_display_name FROM users WHERE user_display_name ILIKE $1",
      [userName]
    );

    if(users.rows.length != 0) {
      console.log({msg: "Username already taken by another user."});
      return res.json({msg: "Username already taken by another user."});
    }

    return res.json({msg: "Username available"});

  } catch (err) {
    const _err = <Error>err;
    console.error(_err.message);
    res.status(500).send("Something went wrong from our end. We promise to fix it soon.");
  }
})

export default router;
