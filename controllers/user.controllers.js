const connection = require("../database/sqlDB");
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const user = {
    saveDataForm: (req, res) => {
        let nombre = req.body.nombre;
        let email = req.body.email;
        let contrasena = req.body.contrasena;
        const emailExp = new RegExp(/^([\d\w_\.-]+)@([\d\w\.-]+)\.([\w\.]{3})$/);
        const nameExp = new RegExp(/^([A-Za-z]{1,15})$/);
        const passExp = new RegExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/
        );

        if (
            !nameExp.test(nombre) ||
            !emailExp.test(email) ||
            !passExp.test(contrasena)
        ) {
            console.log("campos incorrectos"); //renderizar una pagina de campos incorrectos
        } else {
            bcrypt.hash(contrasena, 10, (err, palabraSecretaEncriptada) => {
                if (err) {
                    console.log("Error hasheando:", err);
                } else {
                    console.log("Y hasheada es: " + palabraSecretaEncriptada);
                    palabraEncriptada = palabraSecretaEncriptada;



                    let insertQuery = `INSERT INTO Usuarios
                    (
                        nombre, email, contrasena
                    )
                    VALUES
                    (
                        ?, ?, ?
                    )`;


                    let query = mysql.format(insertQuery, [
                        nombre,
                        email,
                        palabraEncriptada
                    ]);
                    connection.query(query, (err, data) => {
                        if (err) throw err;
                        console.log(data);
                    });

                    res.send("Registro completado correctamente");
                }

            });
        }
    }
}

module.exports = user;