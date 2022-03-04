import { User as UserEntity } from "../entity/User";
import { getCustomRepository } from 'typeorm';
import VerifyEmailRepository from "./VerifyEmail.repository";

export default class VerifyEmailService {

  private verifyEmailRepository: VerifyEmailRepository;

  constructor() {
    this.verifyEmailRepository = getCustomRepository(VerifyEmailRepository);
  }

  verify = async (queryStr: string) => {
    const exists = await this.verifyEmailRepository.findByUniqueString(queryStr);
    return exists;
  }

  update = async (queryStr: string) => {
    const updateIsVerified = await this.verifyEmailRepository.updateIsVerified(queryStr);
    return updateIsVerified;
  }

  delete = async (queryStr: string) => {
    const deleteQueryString = await this.verifyEmailRepository.deleteQueryStr(queryStr);
    return deleteQueryString;
  } 
}