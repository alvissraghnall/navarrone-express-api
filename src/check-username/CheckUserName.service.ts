import { User as UserEntity } from "../entity/User";
import { getCustomRepository } from 'typeorm';
import CheckUserNameRepository from "./CheckUserName.repository";

export default class CheckUserNameService {
  
  private checkUserNameRepository: CheckUserNameRepository;
  
  constructor() {
    this.checkUserNameRepository = getCustomRepository(CheckUserNameRepository);
  }
  
  check = async (uname: string): Promise<boolean> => {
    const isUsed = this.checkUserNameRepository.findByUserName(uname);
    return !!isUsed;
  }
}