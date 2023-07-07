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
let getAllDoctor = async (req, res) => {
  try {
    let doctors = await Doctorservice.getAllDoctors();
    return res.status(200).json(doctors);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let postInforDoctor = async (req, res) => {
  try {
    let inforDoctor = await Doctorservice.postInforDoctorService(req.body);
    return res.status(200).json(inforDoctor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getInforDoctor = async (req, res) => {
  try {
    let inforDoctor = await Doctorservice.getInforDoctorService(req.query.id);
    return res.status(200).json(inforDoctor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let bulkCreateSchedule = async (req, res) => {
  try {
    let infor = await Doctorservice.bulkCreateScheduleService(req.body);
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getScheduleByDay = async (req, res) => {
  try {
    let infor = await Doctorservice.getScheduleByDayService(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getExtraInforDoctor = async (req, res) => {
  try {
    let infor = await Doctorservice.getExtraInforDoctorService(
      req.query.doctorId
    );
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getProfileDoctor = async (req, res) => {
  try {
    let infor = await Doctorservice.getProfileDoctorService(req.query.doctorId);
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  getTopDoctor: getTopDoctor,
  getAllDoctor: getAllDoctor,
  postInforDoctor: postInforDoctor,
  getInforDoctor: getInforDoctor,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDay: getScheduleByDay,
  getExtraInforDoctor,
  getProfileDoctor,
};
