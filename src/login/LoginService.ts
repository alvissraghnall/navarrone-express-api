import { User as UserEntity } from "../entity/User";
import { getRepository, Repository } from 'typeorm';
// import LoginRepository from "./LoginRepository";
import { VerificationToken } from "../entity/VerificationToken";
//import RegisterRepository from "../register/RegisterRepository";

export default class LoginService {

  private readonly userRepository: Repository<UserEntity>;
  private readonly verificationTokenRepository: Repository<VerificationToken>;
  //private readonly registerRepository: RegisterRepository;

  constructor() {
    this.userRepository = getRepository(UserEntity);
    this.verificationTokenRepository = getRepository(VerificationToken)
  }

  retrievePwdAndId = async (email: string) => {
    //console.log(await this.loginRepository.findByEmail(email));
    
    const values = await this.findByEmail(email);

    if(values) {
      const {password, id } = values;
    
      return { password, id }
    }
    return { f: false, p: false }
  }

  getId = async (hash: string) => {
    const uid = await this.userRepository
      .findOne({
        select: ["id"],
        where: { password: hash }
      });
    return uid;
  }

  findByEmail = async (email: string) => {
    const values = await this.userRepository
      .findOne({
        select: ["id", "password"],
        where: { email }
      });
    return values;
  }

  checkUserConfirmation = async (id: string) => {
    const verifiedAt = await this.verificationTokenRepository
      .findOne({
        where: { user: id },
        select: ["verifiedAt"]
      });
    return verifiedAt;
  }
}