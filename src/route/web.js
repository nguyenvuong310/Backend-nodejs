import express from "express";
import req from "express/lib/request";
import homeController from "../controllers/homeController";
import UserController from "../controllers/UserController";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.readCRUD);
  router.get("/edit-crud", homeController.editCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/del-crud", homeController.delCRUD);
  router.post("/api/login", UserController.handleLogin);
  return app.use("/", router);
};

module.exports = initWebRoutes;
