import express, { Request, Response } from "express";
import RouteHandler from "./router/RouteHandler";
import {createConnection} from "typeorm";


class Server {
  private app: express.Application;
  private router: RouteHandler;
  
  constructor(){
    this.app = express();
    this.configuration();
    this.router = new RouteHandler();
    this.routes();
  }
  
  private configuration(): void {
    this.app.set("port", process.env.PORT || 3000);
  }
  
  public async routes() {
    await createConnection()
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Hi!");
    });
    this.app.use("/api", this.router.router);
  }
  
  public start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log(`Server currently listening on port ${this.app.get("port")}`);
    })
  }
}

const server = new Server();
server.start();