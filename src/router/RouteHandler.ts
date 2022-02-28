import { Router } from "express";
import RegisterController from '../register/RegisterController';
import LoginController from "../login/LoginController";
import CheckUserNameController from "../check-username/CheckUserName.controller";
import VerifyEmailController from "../verify-email/VerifyEmail.controller";
import CheckEmailController from "../check-email/CheckEmail.controller";



export default class RouteHandler {
  public router: Router;
  private loginController: LoginController;
  private registerController: RegisterController;
  private checkUserNameController: CheckUserNameController;
  private verifyEmailController: VerifyEmailController;
  private checkEmailController: CheckEmailController;
  
  constructor(){
    this.router = Router();
    this.loginController = new LoginController();
    this.registerController = new RegisterController();
    this.checkUserNameController = new CheckUserNameController();
    this.checkEmailController = new CheckEmailController();
    this.verifyEmailController = new VerifyEmailController();
    this.handles();
  }
  
  public handles() {
    this.router.use("/register", this.registerController.router);
    this.router.use("/login", this.loginController.router);
    this.router.use("/check-username", this.checkUserNameController.router);    
    this.router.use("/check-email", this.checkEmailController.router);

    this.router.use("/:queryString", this.verifyEmailController.router);
    this.router.get("/", async (req, res) => {
      return res.send("God.");
    });
  }
}