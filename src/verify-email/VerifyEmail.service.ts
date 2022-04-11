import { User as UserEntity } from "../entity/User";
import { getCustomRepository, getRepository, Repository } from 'typeorm';
import VerifyEmailRepository from "./VerifyEmail.repository";
import { VerificationToken } from "../entity/VerificationToken";

export default class VerifyEmailService {

  private verifyEmailRepository: VerifyEmailRepository;
  private userRepository: Repository<UserEntity>

  constructor() {
    this.verifyEmailRepository = getCustomRepository(VerifyEmailRepository);
    this.userRepository = getRepository(UserEntity);
  }

  checkExistence = async (token: string) => {
    const exists = await this.verifyEmailRepository.findByToken(token);
    return exists;
  }

  updateVerifiedAt = async (token: string) => {
    const updateIsVerified = await this.verifyEmailRepository.updateVerifiedAt(token);
    return updateIsVerified;
  }

  // verifyValidity = async (token: string) => {
  //   const verifier = await this.checkExistence(token);
  //   const tokenExpiry = verifier?.expiresAt;
  //   if()
  // }

  delete = async (verificationToken: VerificationToken) => {
    const deletedToken = await this.verifyEmailRepository.deleteToken(verificationToken);

    return deletedToken;
  } 

  deleteUser = async (user: UserEntity) => {
    
    const deletedUser = await this.userRepository.remove(user);
    
    return deletedUser;
  }
}