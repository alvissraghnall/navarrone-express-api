import { randomBytes } from "crypto";
import { createTransport } from "nodemailer";

export const randomString = (): string => {
  return randomBytes(8).toString("hex");
}

export let sendEmail = (email: string, name: string, uniqueStr?: string) => {
  const ProdTransport = createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAILPWD
    }
  });

  const DevTransport = createTransport(
    {
      host: "localhost",
      port: 1025,
      secure: false,
      tls: {
        rejectUnauthorized: false
      }
    }
  )
  
  let sender = process.env.EMAILSENDER;
  let mailOptions = {
    from: sender,
    to: email,
    subject: "Email Verification for " + name,
    html: `Please click <a href=${process.env.URL}/verify/${uniqueStr}> here </a> to verify your Email address. Thanks!`
  }
  
  process.env.NODE_ENV === "prod" ? ProdTransport.sendMail(mailOptions, (err, response) => {
    err ? console.error(err as Error) : console.log("Message sent!")
  }) : DevTransport.sendMail(mailOptions, (err, response) => {
    err ? console.error(err as Error) : console.log("Message sent!")
  });
}