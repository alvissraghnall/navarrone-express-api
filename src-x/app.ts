import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import register from "./router/register";
import login from "./router/login";
import validate from './middleware/validation';
import dashboard from './router/dashboard';
import checkUserName from "./router/checkUserName";
import verify from "./router/verify";
import cookieParser from "cookie-parser";
import csurf from "csurf";

config();
const port = process.env.PORT || 4477;

let app = express();

// req: Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>
// res: Response<any, Record<string, any>, number>

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/register", validate, register);
app.use("/api/login", validate, login);
app.use("/api/dashboard", dashboard);
app.use("/api/check-username", checkUserName);
app.use("/api/verify", verify);


app.listen(port, ()=> {
    console.log(`app listening on port ${port}`);
})
