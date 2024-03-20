const axios = require("axios");
require("dotenv").config();
const { getDriversFromDB, getAllDriversFromDB } = require("./helpes/getDriversFromDB");

module.exports = async (req, res) => {
    let name = null;
    let dataToSend = {};
    if (req.query) ({ name } = req.query);
    try {
      const { data } = await axios.get("http://localhost:5000/drivers");
      if (name) {
        dataToSend = data.filter((driver) =>
          driver.driverRef.toLowerCase().includes(name.toLowerCase())
        );
        const driversFromDB = await getDriversFromDB(name);
        if (driversFromDB !== undefined) {
          for(let i=0;i<driversFromDB.length;i++){
            driversFromDB[i].fromdatabase=true;
          }
          dataToSend = dataToSend.concat(driversFromDB);
        }
        dataToSend = dataToSend.slice(0, 15);
        if (dataToSend.length === 0) throw new Error("No driver found");
      } else {
        dataToSend = data; 
        const driversFromDB = await getAllDriversFromDB();
        if (driversFromDB !== undefined) {
          for(let i=0;i<driversFromDB.length;i++){
            driversFromDB[i].fromdatabase=true;
          }
          dataToSend = dataToSend.concat(driversFromDB);
        }
  
    }
      for (let i = 0; i < dataToSend.length; i++) {
        if (!dataToSend[i].image.hasOwnProperty("url") || dataToSend[i].image.url.length<2) {
          dataToSend[i].image.url = process.env.DEFAULT_DRIVER_IMAGE;
        }
      }
      return res.status(200).json(dataToSend);
    } catch (error) {
      if(error.message==="No driver found")
        return res.status(404).json({error: error.message})
  
      return res.status(500).json({ error: error.message });
    }
  };