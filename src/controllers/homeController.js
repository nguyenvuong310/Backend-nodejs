import req from "express/lib/request";
import db from "../models/index";
import CRUDservice from "../services/CRUDservice";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    // console.log("------------------------");
    // console.log(data);
    // console.log("------------------------");
    return res.render("homePage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};
let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};
let postCRUD = async (req, res) => {
  let message = await CRUDservice.createNewUser(req.body);
  console.log(message);
  return res.send("server met");
};
let readCRUD = async (req, res) => {
  let data = await CRUDservice.getAllUser();
  // console.log("--------------------");
  // console.log(data);
  // console.log("--------------------");
  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};

let editCRUD = async (req, res) => {
  let userId = req.query.id;
  // check Useid is found ??
  if (userId) {
    let userData = await CRUDservice.getUserInforById(userId);

    return res.render("editCRUD.ejs", {
      valueUserData: userData,
    });
  } else {
    return res.send("User not found!");
  }
};

let putCRUD = async (req, res) => {
  let data = req.body;
  await CRUDservice.updateUserData(data);
  return res.send("update done!");
};
module.exports = {
  getHomePage: getHomePage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  readCRUD: readCRUD,
  editCRUD: editCRUD,
  putCRUD: putCRUD,
};
