import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import Transaction from "../entity/Transaction";


export default class CreateTxns implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await factory(Transaction)().createMany(10);
    }
}