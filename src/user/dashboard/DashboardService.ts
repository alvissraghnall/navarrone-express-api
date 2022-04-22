import DashboardRepository from "./DashboardRepository";
import type { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import Transaction from "../../entity/Transaction";

export default class DashboardService {

    private dashboardRepository: DashboardRepository;
    private readonly transactionRepository: Repository<Transaction>;


    constructor() {
        this.dashboardRepository = new DashboardRepository();
        this.transactionRepository = getRepository(Transaction);
    }

    private async getUserTransactions(userId: string) {
        const txns = await this.transactionRepository.find({
            where: { user: userId }
        });
        return txns;
    }

}