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
module.exports = {
  handleLogin: handleLogin,
};
