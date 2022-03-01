import { User as UserEntity } from "../entity/User";
import CheckEmailService from "./CheckEmail.service";
import { Router, Request, Response } from "express";

interface Query {
  email: string;
}

//ROUTE ->>
// http://localhost:8888/check-email?email=

export default class CheckEmailController {
  public router: Router;
  private checkEmailService: CheckEmailService;

  constructor() {
    this.router = Router();
    this.checkEmailService = new CheckEmailService();
    this.routeHandler();
  }

  private checkEmail = async (req: Request, res: Response): Promise < Response > => {
    const { email } = req.query as unknown as Query;
    if(!email) return res.status(401).send("No email provided");
    const exists = await this.checkEmailService.check(email);
    console.log(exists);
    if (exists) return res.status(401).send("Email already in use. Please select another.");
    return res.status(200).send("Looks Good!");
  }


  private routeHandler(): void {
    this.router.post("/", this.checkEmail);
  }
}