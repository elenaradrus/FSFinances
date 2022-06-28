const router = require("express").Router();
const user = require("../controllers/user.controllers");
const pages = require("../controllers/pages.controllers");


 
//Rutas de inicio
router.get("/",pages.home);
router.post("/registro",user.saveDataForm);


module.exports = router;