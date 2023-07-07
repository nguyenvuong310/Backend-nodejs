import userService from "../services/userService";
let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing Inputs parameter!!",
    });
  }
  let user = await userService.handleUserLogin(email, password);

  return res.status(200).json({
    errCode: user.errCode,
    message: user.errMessage,
    user,
  });
};

let handleGetAllUsers = async (req, res) => {
  let id = req.query.id; //ALL, id
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing Input paraameter",
      users: [],
    });
  }
  let users = await userService.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    users,
  });
};

let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  return res.status(200).json({ message });
};

let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUserData(data);
  return res.status(200).json(message);
};
let handleDelUser = async (req, res) => {
  if (!req.body.id) {
    return res
      .status(200)
      .json({ errCode: 1, errMessage: "Missing required parameter!" });
  }
  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json({ message });
};
let getAllCode = async (req, res) => {
  try {
    let data = await userService.getAllCodeService(req.query.type);
    return res.status(200).json({
      data,
    });
  } catch (error) {
    console.log("get all code ", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "error from server",
    });
  }
};
let bookAppointment = async (req, res) => {
  try {
    let data = await userService.bookAppointmentService(req.body);
    return res.status(200).json({
      data,
    });
  } catch (error) {
    console.log("book appoiment error ", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "error from server",
    });
  }
};
module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDelUser: handleDelUser,
  getAllCode: getAllCode,
  bookAppointment,
};
