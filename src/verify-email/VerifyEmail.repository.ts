import {
  Repository,
  EntityRepository
} from "typeorm";
import { VerificationToken } from "../entity/VerificationToken";

@EntityRepository(VerificationToken)
export default class VerifyEmailRepository extends Repository < VerificationToken > {

  public findByToken(token: string): Promise<VerificationToken | undefined> {
    return this.findOne({ token });
  }

  async updateVerifiedAt(token: string) {
    return await this.update({
      token
    }, {
      verifiedAt: new Date(),
    })
  }

  deleteToken = (token: VerificationToken) => {
    return this.remove(token);
  }
}