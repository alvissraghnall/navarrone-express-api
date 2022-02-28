import { User as UserEntity } from "../entity/User";
import { getCustomRepository } from 'typeorm';
import VerifyEmailRepository from "./VerifyEmail.repository";

export default class VerifyEmailService {

  private verifyEmailRepository: VerifyEmailRepository;

  constructor() {
    this.verifyEmailRepository = getCustomRepository(VerifyEmailRepository);
  }

  verify = async (queryStr: string) => {
    const isvfied = await this.verifyEmailRepository.findByUniqueString(queryStr);
    return isvfied;
  }
}