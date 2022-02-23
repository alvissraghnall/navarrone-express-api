import { Router } from 'express';
import auth from "../middleware/auth";
// import type { Request, Response } from "express"

const router = Router();

router.post("/", auth, async (req, res) => {
  try {
    res.json(true);
    // res.json({ head: req.header("token") , ck: req.cookies });

  } catch (err){
    const _err = <Error>err;
    console.error(_err);
    res.status(500).send("Server error. We promise to fix it soon.");
  }
});

export default router;
