import { User as UserEntity } from "../entity/User";
import { getRepository, Repository } from 'typeorm';
// import LoginRepository from "./LoginRepository";
import { VerificationToken } from "../entity/VerificationToken";
import LoginTries from "../entity/LoginTries";
//import RegisterRepository from "../register/RegisterRepository";

export default class LoginService {

  private readonly userRepository: Repository<UserEntity>;
  private readonly verificationTokenRepository: Repository<VerificationToken>;
  //private readonly registerRepository: RegisterRepository;
  private readonly loginTriesRepository: Repository<LoginTries>;

  constructor() {
    this.userRepository = getRepository(UserEntity);
    this.verificationTokenRepository = getRepository(VerificationToken)
    this.loginTriesRepository = getRepository(LoginTries);
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

  getUser = async (id: string) => {
    const user = await this.userRepository
      .findOne({
        where: { id }
      });
    return user;
  }

  findByEmail = async (email: string) => {
    const values = await this.userRepository
      .findOne({
        select: ["id", "password"],
        where: { email }
      });
    return values;
  }

  checkUserConfirmation = async (user: UserEntity) => {
    const token = await this.verificationTokenRepository
      .findOne({
        where: { user }
      });
    return token;
  }

  checkLockedUser = async (id:number) => {
    const userTriedTimes = await this.loginTriesRepository.findOne({
      where: { user: id },
      select: ["times"]
    });
    return userTriedTimes;
  }

  increaseLoginTries = async (id: number) => {
    /// !!!!WUTTTTT!!!!
    const updateUserTriedLoginTries = await this.loginTriesRepository.increment({
      user: id
    }, "times", "++");
  }
}