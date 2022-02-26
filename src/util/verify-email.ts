import { randomBytes } from "crypto";
import { createTransport } from "nodemailer";

export const randomString = (): string => {
  return randomBytes(8).toString("hex");
}

export let sendEmail = (email: string, uniqueStr?: string) => {
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