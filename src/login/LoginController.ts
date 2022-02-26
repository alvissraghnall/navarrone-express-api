import { Router, Request, Response } from "express";
import LoginService from "./LoginService";
import { scrypt } from "crypto";
import validation from "../middleware/validation";

export default class LoginController {
  inputErrorMessage: string = "Invalid email, or password entered. Please verify, and try again.";
  unVerifiedErrorMessage: string = "You are yet to verify your email address. Please do so, before attempting another login.";
  
  public router: Router;
  private readonly loginService: LoginService;

  constructor() {
    this.router = Router();
    this.loginService = new LoginService();
    this.routes();
  }
  
  private verifyPassword(pwd: string, hash: string) {
    return new Promise < boolean > ((resolve, reject) => {
      const [salt, key] = hash.split(":");
      scrypt(pwd, salt, 64, (err, derivedKey) => {
        err ? reject(err) : resolve(key === derivedKey.toString('hex'));
      })
    }).catch(err => {
        const error = <Error>err;
        return error.message;
    });
  }

  private async loginUser(req: Request, res: Response): Promise<Response> {
    const user = req.body;
    const { password, isVerified } = await this.loginService.retrievePwd(user.email);
    if(password) {
      const validPwd = await this.verifyPassword(user.password, password);
      if(!validPwd) {
        return res.status(401).send(this.inputErrorMessage);
      }
      if(!isVerified) {
        return res.status(403).send(this.unVerifiedErrorMessage);
      }
      return res.status(200).send("Login successful");
    }
    return res.status(401).send(this.inputErrorMessage);
  }

  private routes() {
    this.router.post("/", validation, this.loginUser)
  }
}