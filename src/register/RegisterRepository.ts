import {
  Repository,
  EntityRepository
} from "typeorm";
import { User as UserEntity } from "../entity/User";

@EntityRepository(UserEntity)
export default class RegisterRepository extends Repository < UserEntity > {

}