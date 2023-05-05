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
module.exports = {
  getTopDoctorService: getTopDoctorService,
};
