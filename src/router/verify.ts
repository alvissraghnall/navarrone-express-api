import { Router } from 'express';
import auth from "../middleware/auth";

const router = Router();

router.post("/", auth, async (req, res) => {
  
});

export default router;
