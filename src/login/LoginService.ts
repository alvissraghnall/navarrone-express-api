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
    //console.log(await this.loginRepository.findByEmail(email));
    
    const values = await this.loginRepository.findByEmail(email);

    if(values) {
      const {password, isVerified } = values;
    
      return { password, isVerified }
    }
    return { f: false, p: false }
  }

  getId = async (hash: string) => {
    const uid = await this.loginRepository.getUserId(hash);
    return uid;
  }
}