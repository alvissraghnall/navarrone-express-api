import RegisterRepository from "./RegisterRepository";
import { User as UserEntity } from "../entity/User";
import { getCustomRepository, getConnection, getManager } from "typeorm";
import { randomUUID } from "crypto";


export default class RegisterService {
  private registerRepository: RegisterRepository;
  protected manager;
  
  constructor(){
    this.registerRepository = getConnection().getCustomRepository(RegisterRepository);
    this.manager = getManager();
  }
  
  // just realized this is boilerplate (??) as i also
  // implement this in `check-email` route.
  // perhaps a merger ??
  public checkEmail = async (email: string) => {
    try {
      
      const data = await this.registerRepository.findByEmail(email);
      return !!data;
    } catch (err: unknown) {
      const e = <Error>err;
      console.error(e);
      return true;
    }
    
  }
  
  public create = async (user: UserEntity) => {
    const newUser = await this.registerRepository.save(this.manager.create(UserEntity, user));
    return newUser;
  }

  private token () {
    const token = randomUUID();
  }
}