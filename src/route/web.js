import express from "express";
import req from "express/lib/request";
import homeController from "../controllers/homeController";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  return app.use("/", router);
};

module.exports = initWebRoutes;
