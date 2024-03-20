const { Driver, Team } = require("../../db");
const { Op } = require("sequelize");
const formatDataToApi = require('./formatDataToApi')

const getDriversFromDB= async (substring) => {
  const result = await Driver.findAll({
    where: {
      apellido: {
        [Op.iLike]: `%${substring}%`,
      },
    },
    include: Team,
  });
  return result.map((driver) => formatDataToApi(driver.dataValues));
};

const getAllDriversFromDB= async () => {
  const result = await Driver.findAll({
    include: Team,
  });
  return result.map((driver) => formatDataToApi(driver.dataValues));
};

module.exports = {getDriversFromDB,getAllDriversFromDB}