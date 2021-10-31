import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import register from "./router/register";
import login from "./router/login";
import validate from './middleware/validation';
import dashboard from './router/dashboard';

config();
const port = process.env.PORT || 4477;

let app = express();

// req: Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>
// res: Response<any, Record<string, any>, number>

app.use(cors());
app.use(express.json());

app.use("/api/register", validate, register);
app.use("/api/login", validate, login);
app.use("/api/dashboard", dashboard);


app.listen(port, ()=> {
    console.log(`app listening on port ${port}`);
})
