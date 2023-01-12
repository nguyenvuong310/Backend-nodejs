import bcrypt from "bcryptjs";
import db from "../models";
const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBrcypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBrcypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
        phoneNumber: data.phoneNumber,
      });
      resolve("ok create succeed");
    } catch (error) {
      reject(e);
    }
  });

  //   console.log("data from service");
  //   console.log(data);
  //   console.log(hashPasswordFromBrcypt);
};
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
};
