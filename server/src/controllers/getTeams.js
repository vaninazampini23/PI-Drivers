const axios = require("axios");
const { Team } = require("../db");
module.exports = async (req, res) => {
  try {
    const { data } = await axios.get("http://localhost:5000/drivers");
    const onlyTeams = data
      .map((driver) => {
        return driver.teams?.split(/,\s*/);
      })
      .flat();
    
      const uniqueTeams = [...new Set(onlyTeams)].filter((team) => team);
   
    const focTeams = uniqueTeams.map((team) => ({
      where: {
        nombre: team,
      },
      defaults: {
        nombre: team,
      },
    }));

    for (let i = 0; i < focTeams.length; i++) {
      const [team, created] = await Team.findOrCreate(focTeams[i]);
    }

    return res.status(200).json(uniqueTeams);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};