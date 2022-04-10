import RegisterRepository from "./RegisterRepository";
import { User as UserEntity } from "../entity/User";
import { getCustomRepository, getConnection, getManager, Repository } from "typeorm";
import { randomUUID } from "crypto";
import { v4 } from "uuid";
import { VerificationToken } from "../entity/VerificationToken";

export default class RegisterService {
  private registerRepository: RegisterRepository;
  protected manager;
  private verificationTokenRepository: Repository<VerificationToken>;
  
  constructor(){
    this.registerRepository = getConnection().getCustomRepository(RegisterRepository);
    this.manager = getManager();
    this.verificationTokenRepository = getConnection().getRepository(VerificationToken);
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
    await this.generateAndSaveToken(newUser);
    return newUser;
  }

  private generateAndSaveToken (user: UserEntity) {
    // const t2 = v4();
    const userToken = {
      token: randomUUID(),
      expiresAt: new Date(Date.now() + (1000 * 3600 * 24)),
      user: user
    }
    this.verificationTokenRepository.save(this.manager.create(VerificationToken, userToken));
  }
}