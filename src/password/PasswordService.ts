import { Repository, getConnection } from "typeorm";
import { User as UserEntity } from "../entity/User";


export default class ChangePasswordService {
    private repository: Repository<UserEntity>
    
    constructor() {
        this.repository = getConnection().getRepository(UserEntity);
    }

    change = async (oldPassword: string) => {

    }

    reset = async (id: string) => {
        
    }
}