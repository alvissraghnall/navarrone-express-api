import { User as UserEntity } from "../entity/User";
import CheckUserNameService from "./CheckUserName.service";
import { Router, Request, Response } from "express";

interface Query {
  userName: string;
}

export default class CheckUserNameController {
  public router: Router;
  private checkUserNameService: CheckUserNameService;

  constructor() {
    this.router = Router();
    this.checkUserNameService = new CheckUserNameService();
    this.routeHandler();
  }

  private checkUName = async (req: Request, res: Response): Promise < Response > => {
    const { userName } = req.query as unknown as Query;
    const exists = await this.checkUserNameService.check(userName);
    console.log(exists);
    if (exists) return res.send("Username already in use. Please select another.");
    return res.send("Looks Good!");
  }


  private routeHandler(): void {
    this.router.post("/", this.checkUName);
  }
}