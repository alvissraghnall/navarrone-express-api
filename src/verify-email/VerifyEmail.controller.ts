import { User as UserEntity } from "../entity/User";
import VerifyEmailService from "./VerifyEmail.service";
import { Router, Request, Response } from "express";

export default class VerifyEmailController {
  public router: Router;
  private verifyEmailService: VerifyEmailService;

  constructor() {
    this.router = Router();
    this.verifyEmailService = new VerifyEmailService();
    this.routeHandler();
  }

  
  private verify = async (req: Request, res: Response) => {
    
  }

  private routeHandler(): void {
    this.router.post("/", this);
  }
}