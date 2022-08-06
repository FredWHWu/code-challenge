import express from "express";
import path from "path";
import routes from "./routes";

class App {
  public server;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
    this.server.use(
      express.static(path.resolve(__dirname, "../../client/build"))
    );
    this.server.use("/static", express.static("public"));
  }
}

export default new App().server;
