const express = require("express");
const app = express();
require("./database/mongoDB")
require("./database/sqlDB")

const router = require("./routes/routes")
const PORT = process.env.PORT || 3000;
 

// app.set("view engine", "pug");
// app.set("views", "./views");
// app.use(express.static(__dirname + "/views/css"));
 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/", router);

app.listen(PORT, ()=>{
    console.log(`Se inicia el server en : http://localhost:${PORT}`);
})