// import {
//   Repository,
//   EntityRepository
// } from "typeorm";
// import { User as UserEntity } from "../entity/User";
// import { VerificationToken } from "../entity/VerificationToken";
// import RegisterRepository from "../register/RegisterRepository";
// import { LoginRepo } from "../types/General";


// @EntityRepository(VerificationToken)
// export default class LoginRepository extends Repository<VerificationToken> {
//   public findByEmail(email: string) {
//     return this.findOne({
//       select: ["password", "isVerified"],
//       where: { email }
//     })
//   }

//   public getUserId(hash: string): Promise<undefined | UserEntity> {
//     return this.findOne({
//       select: ["id"],
//       where: { password: hash }
//     })
//   }
// }