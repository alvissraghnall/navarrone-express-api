import { Router, Request, Response } from "express";
import ChangePasswordService from "./ChangePassword.service";



export default class ChangePasswordController {
    public router: Router;
    private changePasswordService: ChangePasswordService;

    constructor() {
        this.router = Router();
        this.changePasswordService = new ChangePasswordService();
        this.routes();
    }

    change = (req: Request, res: Response) => {
        
    }

    routes(): void {
        this.router.post("", this.change)
    }
}