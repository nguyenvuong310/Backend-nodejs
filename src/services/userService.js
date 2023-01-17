import db from "../models";
import bcrypt from "bcryptjs";
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      email = email.toString();
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          where: { email: email },
          attributes: ["email", "password", "roleId"],
          raw: true,
        });
        if (user) {
          let check = bcrypt.compareSync(password, user.password);
          if (check) {
            delete user.password;
            userData.errCode = 0;
            userData.errMessage = "ok";
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "user not found!!";
        }
      } else {
        userData.errCode = 1;
        userData.errMessage =
          "Your's email isn't exist in system. Pls try other email! ";
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};
let checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: email },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
};
