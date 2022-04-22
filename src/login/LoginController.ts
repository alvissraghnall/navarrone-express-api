import { Router, Request, Response } from "express";
import LoginService from "./LoginService";
import { scrypt } from "crypto";
import validation from "../middleware/validation";
import { signToken } from "../util/jwt";
import type { Payload } from "../types/General";
import { loginCheck } from "./login-validator";
import { errors } from "../register/RegisterValidator";

export default class LoginController {
  inputErrorMessage: string = "Invalid email, or password entered. Please verify, and try again.";
  unVerifiedErrorMessage: string = "You are yet to verify your email address. Please do so, before attempting another login.";
  private readonly triedLoginTooOftenMessage: string = "You have attempted login way too frequently, hence your account has been blocked temporarily.";
  
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

  private loginUser = async (req: Request, res: Response): Promise<Response> => {
    const user = req.body;
    const { password, id } = await this.loginService.retrievePwdAndId(user.email);
    if(password && id) {
      const userAcct = await this.loginService.getUser(id);
      let triedLoginTimes = await this.loginService.checkLockedUser(userAcct!);
      
      if(!triedLoginTimes || typeof triedLoginTimes === "undefined") {
        triedLoginTimes = await this.loginService.createLoginTries(userAcct!);
      }
      console.log(triedLoginTimes);
      await this.loginService.increaseLoginTries(userAcct!);
      if (triedLoginTimes!.times >= 5) {
        return res.status(403).json({
          message: this.triedLoginTooOftenMessage
        })
      }
      const validPwd = await this.verifyPassword(user.password, password);
      if(!validPwd) {
        return res.status(401).send(this.inputErrorMessage);
      }
      // verify user confirmation
      // if(!id) {
      //   return res.status(400).send(this.inputErrorMessage);
      // }
      // const acct = await this.loginService.getUser(id);
      // console.log(acct);
      
      const userToken = userAcct ? await this.loginService.checkUserConfirmation(userAcct) : undefined;
      // console.log(verifiedAt, "c");
      
      if (!userToken?.verifiedAt) {
        return res.status(401).send(this.unVerifiedErrorMessage);
      }
      // const _id = await this.loginService.getId(password);
      const payload: Payload = {
        id: id as unknown as string
      }
      const token = await signToken(payload);
      console.log(token);
      
      return res
        .status(200)
        .setHeader("authorization", `Bearer ${token}`)
        .json({message: "Login successful"});
    }
    return res.status(400).send(this.inputErrorMessage);
  }

  private routes() {
    this.router.post("/", loginCheck, errors, this.loginUser)
  }
}