import { body, validationResult } from "express-validator";
import type { NextFunction, Request, Response } from "express";


export let loginCheck = [
    body("email").exists({ checkNull: true, checkFalsy: true })
        .isEmail().trim(),

    body("password").exists({ checkNull: true, checkFalsy: true })
        .isLength({ min: 8 })
        .withMessage("Password must have at least 8 characters")
        .trim()
];
