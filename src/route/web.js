import express from "express";
import req from "express/lib/request";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", (req, res) => {
    res.send("Hello World!");
  });
  return app.use("/", router);
};

module.exports = initWebRoutes;
