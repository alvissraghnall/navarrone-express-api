import { Router, Request, Response } from "express";
import ForgotPasswordService from "./ForgotPassword.service";

export default class ForgotPasswordController {
    public router: Router;
    forgotPasswordService: ForgotPasswordService

    constructor() {
        this.router = Router();
        this.forgotPasswordService = new ForgotPasswordService();
        this.routes();
    }

    
    resetPassword(req: Request, res: Response) {
    //    throw new Error("Method not implemented.");
        const { body } = req;
    }

    routes(): void {
        this.router.post("", this.resetPassword);
    }

}
