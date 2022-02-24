import { Router, Request, Response} from "express";
import RegisterService from "./RegisterService";
import { User as UserEntity } from "../entity/User";


export default class RegisterController {
  public router: Router;
  private registerService: RegisterService;
  
  constructor(){
    this.router = Router();
    this.registerService = new RegisterService();
    this.routes();
  }
  
  private registerUser = (req: Request, res: Response) => {
    const user = req["body"] as UserEntity;
    console.log(user);
  }
  
  private routes(){
    this.router.post("/", this.registerUser)
  }
}