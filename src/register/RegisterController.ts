import { Router, Request, Response} from "express";
import RegisterService from "./RegisterService";

export default class RegisterController {
  public router: Router;
  private registerService: RegisterService;
  
  constructor(){
    this.router = Router();
    this.registerService = new RegisterService();
    this.routes();
  }
  
  private registerUser = (req: Request, res: Response) => {
    console.log("God works.");
    const create = this.registerService.create();
    console.log(this);
    res.send(create);
  }
  
  private routes(){
    this.router.post("/", this.registerUser)
  }
}