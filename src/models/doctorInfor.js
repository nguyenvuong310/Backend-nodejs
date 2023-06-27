"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class doctorInfor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      doctorInfor.belongsTo(models.User, { foreignKey: "doctorId" });
      doctorInfor.belongsTo(models.allCode, {
        foreignKey: "priceId",
        targetKey: "keyMap",
        as: "priceData",
      });
      doctorInfor.belongsTo(models.allCode, {
        foreignKey: "provinceId",
        targetKey: "keyMap",
        as: "provinceData",
      });
      doctorInfor.belongsTo(models.allCode, {
        foreignKey: "paymentId",
        targetKey: "keyMap",
        as: "paymentData",
      });
    }
  }
  doctorInfor.init(
    {
      doctorId: DataTypes.INTEGER,
      priceId: DataTypes.STRING,
      provinceId: DataTypes.STRING,
      paymentId: DataTypes.STRING,
      addressClinic: DataTypes.STRING,
      nameClinic: DataTypes.STRING,
      note: DataTypes.STRING,
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "doctorInfor",
      // freezeTableName: true,
    }
  );
  return doctorInfor;
};
