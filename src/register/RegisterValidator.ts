import type { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export function errors (req: Request, res: Response, next: NextFunction) {
    let errorValidation = validationResult(req)        ;
    if(!errorValidation.isEmpty()) {
        return res.status(400)
            .json({
                errors: errorValidation
            });
    }
    next();
}

export let checks = [
    body("name").exists({ checkNull: true, checkFalsy: true })
        .isLength({ min: 3 }).withMessage("Name must have at least 3 characters")
        .trim(),
        
    body("userName").exists({ checkNull: true, checkFalsy: true })
        .isAlphanumeric().withMessage("Username should be alphanumeric")
        .isLength( { min: 3 } ).withMessage("Username should have at least 3 characters")
        .trim(),
    body("phoneNumber").exists({ checkNull: true, checkFalsy: true })
        .trim()
        .isLength({ min: 4 }).withMessage("Please enter a valid phone number"),

    body("email").exists({ checkNull: true, checkFalsy: true })
        .isEmail().trim(),

    body("password").exists({ checkNull: true, checkFalsy: true })
        .trim().isLength({min: 8})
        .withMessage("Password must have at least 8 characters"),


    body("country").exists({ checkNull: true, checkFalsy: true })
        .trim().isLength({ min: 4 }).withMessage("Please enter a valid country."),

    body("confirmPassword").exists({ checkNull: true, checkFalsy: true })
        .trim()
        .isLength({min: 8})
        .withMessage("Password must have at least 8 characters")
        .custom(async (confirmPassword, {req}) => {
            const { password } = req.body;
            if (password !== confirmPassword) {
                throw new Error("Passwords must match!");
            }
            return true;
        })
]
