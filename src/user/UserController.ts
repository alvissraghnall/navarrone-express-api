import type { Request, Response } from "express";
import { Router } from "express";
import DashboardController from "./dashboard/DashboardController";
import DepositsService from "./deposits/DepositsService";
import ProfileService from "./profile/ProfileService";
import WithdrawalsService from "./withdrawals/WithdrawalsService";

export default class UserController {

    readonly router: Router;
    private dashboardController: DashboardController;
    private depositsService: DepositsService;
    private withdrawalsService: WithdrawalsService;
    private profileService: ProfileService;

    constructor() {
        this.router = Router();
        this.dashboardController = new DashboardController();
        this.depositsService = new DepositsService();
        this.withdrawalsService = new WithdrawalsService();
        this.profileService = new ProfileService();
        this.routes();
    }

    private routes(): void {
        this.router.get("/dashboard", this.dashboardController.router);
        this.router.get("/deposits", this.depositsService.sendTxns);
        this.router.get("/withdrawals", this.withdrawalsService.sendWithdrawals);
        this.router.get("/profile", this.profileService.userDetails);
    }

}