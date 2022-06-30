const router = require("express").Router();
const user = require("../controllers/user.controllers");
const pages = require("../controllers/pages.controllers");


 
//Rutas de inicio
router.get("/",pages.home);
router.post("/registro",user.saveDataForm);
router.post("/login",user.login);
router.post("/contacto",user.contacto);
router.post("/ingresos",user.ingresos);
router.post("/finanzas",user.finanzas);


module.exports = router;