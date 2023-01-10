import db from "../models/index";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    console.log("------------------------");
    console.log(data);
    console.log("------------------------");
    return res.render("homePage.ejs");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getHomePage: getHomePage,
};
