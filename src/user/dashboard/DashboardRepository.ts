import {
    Repository,
    EntityRepository
} from "typeorm";
import Transaction from "../../entity/Transaction";
import { User } from "../../entity/User";
  
@EntityRepository(User)
export default class DashboardRepository extends Repository<User> {

    public getAllUserTransactions = (userId: string) => {
        return this.findOne({
            select: ["transactions"],
            where: { id: userId }
        })
    }
}