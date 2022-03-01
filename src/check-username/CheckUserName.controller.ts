import { User as UserEntity } from "../entity/User";
import CheckUserNameService from "./CheckUserName.service";
import { Router, Request, Response} from "express";

interface Query {
  userName: string;
}


//ROUTE ->>
// http://localhost:8888/check-userName?userName=

export default class CheckUserNameController {
  public router: Router;
  private checkUserNameService: CheckUserNameService;
  private noValueProvided: string = "No value provided to check against. Please enter a value and try again";
  
  constructor() {
    this.router = Router();
    this.checkUserNameService = new CheckUserNameService();
    this.routeHandler();
  }
  
  private checkUName = async (req: Request, res: Response): Promise<Response> => {
    const { userName } = req.query as unknown as Query;
    if(!userName) return res.status(401).send(this.noValueProvided);
    const exists = await this.checkUserNameService.check(userName);
    console.log(exists);
    if(exists) return res.send("Username already in use. Please select another.");
    return res.send("Looks Good!");
  }


  private routeHandler(): void {
    this.router.post("/", this.checkUName);
  }
}