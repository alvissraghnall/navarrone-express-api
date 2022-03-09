import { Router, Request, Response } from "express";
import PasswordService from "./PasswordService";



export default class ChangePasswordController {
    public router: Router;
    private passwordService: PasswordService;

    constructor() {
        this.router = Router();
        this.passwordService = new PasswordService();
        this.routes();
    }

    change = (req: Request, res: Response) => {
        
    }

    forgot = (req: Request, res: Response) => {
        
    }

    routes(): void {
        this.router.post("/change", this.change);
        this.router.post("/forgot", this.forgot);

    }
}