import Doctorservice from "../services/Doctorservice";

let getTopDoctor = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let doctor = await Doctorservice.getTopDoctorService(+limit);
    return res.status(200).json(doctor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server!!",
    });
  }
};
module.exports = {
  getTopDoctor: getTopDoctor,
};
