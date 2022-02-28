import { User as UserEntity } from "../entity/User";
import VerifyEmailService from "./VerifyEmail.service";
import { Router, Request, Response } from "express";
import { randomBytes } from "crypto";
import { createTransport } from "nodemailer";
  

export default class VerifyEmailController {
  public router: Router;
  private verifyEmailService: VerifyEmailService;

  constructor() {
    this.router = Router();
    this.verifyEmailService = new VerifyEmailService();
    this.routeHandler();
  }

  
  private verify = async (req: Request, res: Response) => {
    const { queryString } = req.params;
    const isVerified = await this.verifyEmailService.verify(queryString);
    // first, check if user with query string provided exists.
    //  // if user does not exist, throw error.
    // // else, update table to reflect change in isVerified column to true. 
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
    this.router.post("/", this.verify);
  }
}