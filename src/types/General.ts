import RegisterRepository from "../register/RegisterRepository";

export interface LoginRepo extends RegisterRepository {
  
  findByEmail: (email: string) => any;
}

export type Payload = {
  id: string,
}