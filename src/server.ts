import express, { Request, Response } from "express";

class Server {
  private app: express.Application;
  
  constructor(){
    this.app = express();
    this.configuration();
    this.routes();
  }
  
  public configuration(): void {
    this.app.set("port", process.env.PORT || 3000);
  }
  
  public routes(): void {
    
  }
}

const server = new Server();
server.start();