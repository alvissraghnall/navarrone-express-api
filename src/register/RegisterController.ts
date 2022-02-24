import { Router, Request, Response} from "express";
import RegisterService from "./RegisterService";
import { User as UserEntity } from "../entity/User";
import { randomBytes, scrypt } from "crypto";
import { User as UserAble } from "../types/User.type";


export default class RegisterController {
  public router: Router;
  private registerService: RegisterService;
  
  constructor(){
    this.router = Router();
    this.registerService = new RegisterService();
    this.routes();
  }
  
  private async handleBody({ body }: Request): Promise<UserAble>  {
    const user = body;
    user.email = user.email.toLowerCase();
    user.password = await this.hashPassword(user.password);
    
    return user as UserAble;
  }
  
  
  private hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const salt = randomBytes(16).toString("hex");
      scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        resolve(salt + ":" + derivedKey.toString("hex"));
      });
    });
  }
  
  private registerUser = async (req: Request, res: Response) => {
    const user = await this.handleBody(req) as UserEntity;
    //console.log(req.body, req["body"], user);
    const newUser = await this.registerService.create(user);
    res.json(newUser);
  }
  
  private routes(){
    this.router.post("/", this.registerUser)
  }
}

