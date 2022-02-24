import { Router, Request, Response } from "express";

export default class LoginController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private loginUser(req: Request, res: Response) {
    //console.log(Object.hasOwnProperty("x"));
  }

  private routes() {
    this.router.post("/", this.loginUser)
  }
}