import { body, validationResult } from "express-validator";
import type { NextFunction, Request, Response } from "express";


export let ChangePasswordChecks = [
    body("oldPassword")
        .exists({ checkNull: true, checkFalsy: true })
        .isLength({min: 8 }).withMessage("Old Password must have at least 8 characters"),

    body("newPassword")
    .exists({ checkNull: true, checkFalsy: true })
    .isLength({min: 8 }).withMessage("New Password must have at least 8 characters"),

    body("confirmNewPassword")
    .exists({ checkNull: true, checkFalsy: true })
    .isLength({min: 8 }).withMessage("Confirm New Password must have at least 8 characters")
    .trim()
    .custom(async (confirmNewPassword, {req}) => {
        const { newPassword } = req.body;
        if(newPassword !== confirmNewPassword) {
            throw new Error("Passwords must match!");
            
        }
    })
]

export function showErrors (req: Request, res: Response, next: NextFunction) {
    let errorValidation = validationResult(req);
    if(!errorValidation.isEmpty()) {
        return res.status(400)
            .json({
                errors: errorValidation
            });
    }
    next();
}