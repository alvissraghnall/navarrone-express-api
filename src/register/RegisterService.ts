import RegisterRepository from "./RegisterRepository";
import { User } from "../entity/User";
import { getCustomRepository, getConnection } from "typeorm";


export default class RegisterService {
  private registerRepository: RegisterRepository;
  
  
  constructor(){
    this.registerRepository = getConnection().getCustomRepository(RegisterRepository);
  }
  
  public create = (user: User) => {
    return "Happy :x";
  }
}