import {
  Repository,
  EntityRepository
} from "typeorm";
import { User as UserEntity } from "../entity/User";

@EntityRepository(UserEntity)
export default class CheckUserNameRepository extends Repository < UserEntity > {

  public findByUserName(userName: string) {
    return this.findOne({ 
      where: { userName },
      select: ["userName"]
    });
  }
}