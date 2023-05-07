import db from "../models";
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
        !inputData.contentMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        await db.markdown.create({
          intro: inputData.intro,
          contentHTML: inputData.contentHTML,
          contentMarkdown: inputData.contentMarkdown,
          doctorId: inputData.doctorId,
          // specialtyId: inputData.specialtyId,
          // clinicId: inputData.clinicId,
        });
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
module.exports = {
  getTopDoctorService: getTopDoctorService,
  getAllDoctors: getAllDoctors,
  postInforDoctorService: postInforDoctorService,
};
