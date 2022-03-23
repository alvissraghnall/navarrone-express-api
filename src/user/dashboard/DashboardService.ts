import DashboardRepository from "./DashboardRepository";
import type { Request, Response } from "express";

export default class DashboardService {

    private dashboardRepository: DashboardRepository;

    constructor() {
        this.dashboardRepository = new DashboardRepository();
    }

    private async getUserTransactions(userId: string) {
        const txns = await this.dashboardRepository.getAllUserTransactions(userId);
        return txns;
    }

}