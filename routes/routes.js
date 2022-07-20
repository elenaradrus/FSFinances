const router = require("express").Router();
const user = require("../controllers/user.controllers");
const pages = require("../controllers/pages.controllers");

const changePassword = require("../controllers/password.controllers");


 
//Rutas de inicio
router.get("/",pages.home);
router.post("/sign-up",user.saveDataForm);
router.post("/login",user.login);
router.post("/contact",user.contact);

//router.get("/aaa", changePassword.prueba)


router.post("/add-income",user.userIncome);
router.post("/incomes",user.monthSummary);
router.post("/add-spending",user.insertSpendings);
router.post("/spendings",user.userSpendings);
router.post("/month-end",user.totalSpendings);

router.post("/changepassword", changePassword.checkUser);
router.get("/changepassword/:email/:token", changePassword.confirmUserGet);
router.post("/resetpassword", changePassword.checkUserPost);


module.exports = router;