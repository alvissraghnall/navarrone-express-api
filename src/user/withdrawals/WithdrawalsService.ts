import type { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import Transaction from "../../entity/Transaction";

export default class WithdrawalsService {
    private transactionsRepository: Repository<Transaction>;

    constructor() {
        this.transactionsRepository = getRepository(Transaction);
    }

    private getWithdrawals = async(id: string): Promise<Transaction[]> => {
        const userTxns = await this.transactionsRepository.find({
            where: [{
                user: id
            }, {
                kind: "withdrawal"
            }]
        });
        return userTxns;
    }

    sendWithdrawals = async (req: Request, res: Response) => {
        // console.log(res.locals);
        
        const id = res.locals.payload.id;
        const txns = this.getWithdrawals(id);

        return res.status(200)
            .json(txns);
    }
}