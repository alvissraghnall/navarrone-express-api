import RegisterRepository from "./RegisterRepository";
import { User as UserEntity } from "../entity/User";
import { getCustomRepository, getConnection } from "typeorm";


export default class RegisterService {
  private registerRepository: RegisterRepository;
  
  
  constructor(){
    this.registerRepository = getConnection().getCustomRepository(RegisterRepository);
  }
  
  public checkEmail = async (email: string) => {
    const email = await this.registerRepository.findByEmail(email);
    return !!email;
  }
  
  public create = async (user: UserEntity) => {
    const newUser = await this.registerRepository.save(user);
    return newUser;
  }
}