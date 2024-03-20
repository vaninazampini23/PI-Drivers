const { Router } = require("express");

const getDrivers = require("../controllers/getDrivers");
const getDriverById = require("../controllers/getDriversById");
const createDrivers = require("../controllers/createDrivers");
const getTeams = require("../controllers/getTeams");

const router = Router();

router.get("/drivers/:idDriver", getDriverById);
router.get("/drivers",getDrivers);
router.post("/drivers",createDrivers);
router.get("/teams",getTeams);

module.exports = router;
