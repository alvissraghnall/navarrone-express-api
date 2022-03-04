import { User as UserEntity } from "../entity/User";
import VerifyEmailService from "./VerifyEmail.service";
import { Router, Request, Response } from "express";
import { randomBytes } from "crypto";
import { createTransport } from "nodemailer";
  

export default class VerifyEmailController {
  public router: Router;
  private verifyEmailService: VerifyEmailService;
  private wrongUniqueString: string = "The string you entered is incorrect. Verify, and try again.";
  private noUniqueString: string = "No unique string provided. Provide one, and try again.";

  constructor() {
    this.router = Router();
    this.verifyEmailService = new VerifyEmailService();
    this.routeHandler();
  }

  
  private verify = async (req: Request, res: Response) => {
    const { queryString } = req.params;
    if(!queryString) return res.status(400).send(this.noUniqueString);
    const exists = await this.verifyEmailService.verify(queryString);
    // first, check if user with query string provided exists.
    if(!exists) return res.status(401).send(this.wrongUniqueString);
    //  // if user does not exist, throw error.
    const updateIsVerified = await this.verifyEmailService.update(queryString);
    console.log(updateIsVerified);
    
    // // else, update table to reflect change in isVerified column to true. 
    const deleteQueryString = await this.verifyEmailService.delete(queryString);
    console.log(deleteQueryString);
    
    return res.sendStatus(200);
    // // // (???) delete queryString . unsure at the moment about this part.
  }
  
  public static randomString (): string {
    return randomBytes(8).toString("hex");
  }
  
  public static sendEmail(email: string, uniqueStr?: string) {
    const Transport = createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPWD
      }
    });
  
    let sender = process.env.EMAILSENDER;
    let mailOptions = {
      from: sender,
      to: email,
      subject: "Email Verification",
      html: `Please click <a href=${process.env.URL}/verify/${uniqueStr}> here </a> to verify your Email address. Thanks!`
    }
    
    Transport.sendMail(mailOptions, (err, response) => {
      err ? console.error(err as Error) : console.log("Message sent!")
    })
  }

  private routeHandler(): void {
    this.router.post("/:queryString", this.verify);
  }
}