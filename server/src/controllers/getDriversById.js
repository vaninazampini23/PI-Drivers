const axios = require("axios");
const { Driver, Team } = require("../db");
const formatDataToApi = require("./helpes/formatDataToApi");

module.exports = async (req, res) => {
  try {
    const { idDriver } = req.params;
    const { data } = await axios.get("http://localhost:5000/drivers");
    let selectedDriver = data.filter(
      (driver) => driver.id === Number(idDriver)
    );
    if (!selectedDriver.length) {
      selectedDriver = await Driver.findByPk(Number(idDriver), {
        include: Team,
      });
      if (selectedDriver === null)
        return res.status(404).json({ error: "Driver not found" });
      return res.status(200).json(formatDataToApi(selectedDriver.dataValues));
    }
    return res.status(200).json(selectedDriver[0]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};