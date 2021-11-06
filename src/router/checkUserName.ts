import { Router } from "express";
import pool from "../db";


const router = Router();

router.post("/", async (req, res) => {
  try {
    const { userName } = req.query;
    const users = await pool.query(
      "SELECT * FROM users WHERE user_display_name ILIKE $1",
      [``]
    )

  } catch (err) {
    const _err = <Error>err;
    console.error(_err.message);
    res.status(500).send("Something went wrong from our end. We promise to fix it soon.");
  }
})

export default router;
