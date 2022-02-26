import { User as UserEntity } from "../entity/User";
import { getCustomRepository } from 'typeorm';
import LoginRepository from "./LoginRepository";
//import RegisterRepository from "../register/RegisterRepository";

export default class LoginService {

  private readonly loginRepository: LoginRepository;
  //private readonly registerRepository: RegisterRepository;

  constructor() {
    this.loginRepository = getCustomRepository(LoginRepository);
    
  }

  retrievePwd = async (email: string) => {
    const { password, isVerified } = await this.loginRepository.findByEmail(email);
    return { password, isVerified }
  }
}