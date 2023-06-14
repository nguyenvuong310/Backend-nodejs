import db from "../models";
import _ from "lodash";
require("dotenv").config();
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
let getTopDoctorService = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctor = await db.User.findAll({
        limit: limit,
        where: { roleId: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.allCode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.allCode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        data: doctor,
        errCode: 0,
        errMessage: "fetch top doctor succeed",
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getAllDoctors = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password", "image"],
        },
      });
      resolve({
        errCode: 0,
        data: doctors,
      });
    } catch (error) {
      reject(e);
    }
  });
};
let postInforDoctorService = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !inputData.doctorId ||
        !inputData.contentHTML ||
        !inputData.contentMarkdown ||
        !inputData.actions
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        if (inputData.actions === "CREATE") {
          await db.markdown.create({
            intro: inputData.intro,
            contentHTML: inputData.contentHTML,
            contentMarkdown: inputData.contentMarkdown,
            doctorId: inputData.doctorId,
            // specialtyId: inputData.specialtyId,
            // clinicId: inputData.clinicId,
          });
        } else {
          let doctorMarkdown = await db.markdown.findOne({
            where: { doctorId: inputData.doctorId },
          });
          if (doctorMarkdown) {
            doctorMarkdown.intro = inputData.intro;
            doctorMarkdown.contentHTML = inputData.contentHTML;
            doctorMarkdown.contentMarkdown = inputData.contentMarkdown;
            doctorMarkdown.doctorId = inputData.doctorId;
            doctorMarkdown.updateAt = new Date();
          }
          await doctorMarkdown.save();
        }
      }

      resolve({
        errCode: 0,
        errMessage: "Save succeed",
      });
    } catch (error) {
      reject(e);
    }
  });
};
let getInforDoctorService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "missing parameter",
        });
      } else {
        let data = await db.User.findOne({
          where: { id: inputId },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.markdown,
              attributes: ["contentMarkdown", "contentHTML", "intro"],
            },
          ],
          raw: true,
          nest: true,
        });
        if (data && data.image) {
          data.image = new Buffer.from(data.image, "base64").toString("binary");
        }
        resolve({
          errCode: 0,
          data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let bulkCreateScheduleService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataCopy = [];
      if (data && data.arrSchedule && data.arrSchedule.length > 0) {
        dataCopy = data.arrSchedule;
        dataCopy = dataCopy.map((item) => {
          item.maxNumber = MAX_NUMBER_SCHEDULE;
          return item;
        });
        let exists = await db.schedule.findAll({
          where: { doctorId: data.doctorId, date: data.formatedDate },
          attributes: ["timeType", "date", "doctorId", "maxNumber"],
          raw: true,
        });
        if (exists && exists.length > 0) {
          exists = exists.map((item) => {
            item.date = new Date(item.date).getTime();
            return item;
          });
        }
        let toCreate = _.differenceWith(dataCopy, exists, (a, b) => {
          return a.timeType === b.timeType && a.date === b.date;
        });
        if (toCreate && toCreate.length > 0) {
          await db.schedule.bulkCreate(toCreate);
        }

        resolve({
          errCode: 0,
          errMessage: "succeed!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getTopDoctorService: getTopDoctorService,
  getAllDoctors: getAllDoctors,
  postInforDoctorService: postInforDoctorService,
  getInforDoctorService: getInforDoctorService,
  bulkCreateScheduleService: bulkCreateScheduleService,
};
