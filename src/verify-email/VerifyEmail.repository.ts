import {
  Repository,
  EntityRepository
} from "typeorm";
import { User as UserEntity } from "../entity/User";

@EntityRepository(UserEntity)
export default class VerifyEmailRepository extends Repository < UserEntity > {

  public findByUniqueString(uniqueString: string): Promise<UserEntity | undefined> {
    return this.findOne({ uniqueString });
  }
}