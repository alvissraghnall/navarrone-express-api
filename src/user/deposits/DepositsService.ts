import type { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import Transaction from "../../entity/Transaction";

export default class DepositsService {
    private transactionsRepository: Repository<Transaction>;

    constructor() {
        this.transactionsRepository = getRepository(Transaction);
    }

    private getTxns = async(id: string): Promise<Transaction[]> => {
        const userTxns = await this.transactionsRepository.find({
            where: [{
                user: id
            }, {
                kind: "deposit"
            }]
        });
        return userTxns;
    }

    sendTxns = async (req: Request, res: Response) => {
        const id = res.locals.payload.id;
        const txns = this.getTxns(id);

        return res.status(200)
            .json(txns);
    }
}