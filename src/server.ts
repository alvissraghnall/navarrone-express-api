import express, { Request, Response } from "express";
import RouteHandler from "./router/RouteHandler";
import {createConnection} from "typeorm";
import cors from "cors";


class Server {
  private app: express.Application;
  private router: RouteHandler;
  
  constructor(){
    this.app = express();
    this.configuration();
    this.router = new RouteHandler();
  }
  
  private configuration(): void {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(cors());
    this.app.use(express.json());
  }
  
  public async routes () {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Hi!");
    });
    this.app.use("/api", this.router.router);
  }
  
  public start(): void {
    this.routes();
    this.app.listen(this.app.get("port"), () => {
      console.log(`Server currently listening on port ${this.app.get("port")}`);
    })
  }
}

createConnection({
  type: "postgres",
  host: process.env.DBHOST!,
  port: parseInt(process.env.DBPORT!),
  username: process.env.DBUSER!,
  password: process.env.DBPWD!,
  database: process.env.DBNAME!,
  entities: [
  __dirname + "/entity/*.ts"
  ],
  synchronize: true,
  logging: true
}).then(async conn => {
  const server = new Server();
  server.start();
})
.catch(error => console.log("TypeORM connection error: ", error));
  

