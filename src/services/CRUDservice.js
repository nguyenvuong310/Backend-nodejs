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
let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = db.User.findAll({
        raw: true,
      });
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

let getUserInforById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve([]);
      }
    } catch (error) {
      reject(error);
    }
  });
};
let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        // find row has id = data.id
        where: { id: data.id },
      });
      if (user) {
        // if found user
        // gan fisrtname, lastName, address cũ bằng cái mới
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();
        resolve();
      }
    } catch (error) {
      console.log(error);
    }
  });
};

let deleteUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
      });
      if (user) {
        user.destroy();
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInforById: getUserInforById,
  updateUserData: updateUserData,
  deleteUserById: deleteUserById,
};
