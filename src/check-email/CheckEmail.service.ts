import { Repository, getConnection } from "typeorm";
import { User as UserEntity } from "../entity/User";

export default class CheckEmailService {
    private repository: Repository<UserEntity>

    constructor() {
        this.repository = getConnection().getRepository(UserEntity);
    }
    
    check = async (email: string): Promise<UserEntity | undefined> => {
        const isUsed = await this.repository.findOne({ 
            select: ["email"],
            where: { email }
         })
        console.log("isUsed is: ", isUsed);
        return isUsed;
    }
}