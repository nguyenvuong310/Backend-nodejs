import express from "express";
import req from "express/lib/request";
import homeController from "../controllers/homeController";
import UserController from "../controllers/UserController";
import DoctorController from "../controllers/DoctorController";
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
  router.get("/api/get-all-users", UserController.handleGetAllUsers);
  router.post("/api/create-new-user", UserController.handleCreateNewUser);
  router.put("/api/edit-user", UserController.handleEditUser);
  router.delete("/api/del-user", UserController.handleDelUser); //restAPI
  router.get("/api/allcode", UserController.getAllCode);

  router.get("/api/top-doctor", DoctorController.getTopDoctor);
  router.get("/api/get-all-doctor", DoctorController.getAllDoctor);
  router.post("/api/post-infor-doctor", DoctorController.postInforDoctor);
  router.get("/api/get-detail-infor-doctor", DoctorController.getInforDoctor);
  router.post("/api/bulk-create-schedule", DoctorController.bulkCreateSchedule);
  router.get("/api/get-schedule-by-day", DoctorController.getScheduleByDay);
  return app.use("/", router);
};

module.exports = initWebRoutes;
