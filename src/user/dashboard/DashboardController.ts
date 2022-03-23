import { Request, Response, Router } from "express";


export default class DashboardController {

    router: Router;

    constructor () {
        this.router = Router();
        this.routes();
    }

    private userDetails = (req: Request, res: Response) => {

    }

    public routes(): void {
        this.router.post("/", this.userDetails);
    }
}