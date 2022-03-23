import type { Request, Response } from "express";
import { Router } from "express";
import DashboardController from "./dashboard/DashboardController";

export default class UserController {

    readonly router: Router;
    private dashboardController: DashboardController;

    constructor() {
        this.router = Router();
        this.dashboardController = new DashboardController();
        this.routes();
    }

    private routes(): void {
        this.router.post("/dashboard", this.dashboardController.router);
    }

}