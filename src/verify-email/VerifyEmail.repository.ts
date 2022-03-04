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

  async updateIsVerified(queryString: string) {
    return await this.update({
      uniqueString: queryString
    }, {
      isVerified: true,
    })
  }

  public async deleteQueryStr(uniqueString: string) {
    return await this.update({
      uniqueString
    }, {
      uniqueString: undefined
    })
  }
}