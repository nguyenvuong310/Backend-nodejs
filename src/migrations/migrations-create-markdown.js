"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("markdowns", {
      // contentHTML: DataTypes.TEXT("long"),
      // contentMarkdown: DataTypes.TEXT("long"),
      // doctorId: DataTypes.INTEGER,
      // specialtyId: DataTypes.STRING,
      // intro: DataTypes.TEXT("long"),
      // clinicId: DataTypes.INTEGER,
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      intro: {
        type: Sequelize.TEXT("long"),
      },
      contentHTML: {
        type: Sequelize.TEXT("long"),
      },
      contentMarkdown: {
        type: Sequelize.TEXT("long"),
      },
      doctorId: {
        type: Sequelize.INTEGER,
      },
      specialtyId: {
        type: Sequelize.INTEGER,
      },
      clinicId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("markdowns");
  },
};
