import {
  Repository,
  EntityRepository
} from "typeorm";
import { User as UserEntity } from "../entity/User";

@EntityRepository(UserEntity)
export default class LoginRepository extends Repository < UserEntity > {

}