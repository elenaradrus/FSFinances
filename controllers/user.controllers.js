const connection = require("../database/sqlDB");
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const user = {
    saveDataForm: (req, res) => {
        const nombre = req.body.nombre;
        const email = req.body.email;
        const contrasena = req.body.contrasena;
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
            const getUsers = `SELECT email FROM Usuarios WHERE email = '${email}'`;
            connection.query(getUsers, (err, result) => {
                if (result.length > 0) {
                    res.send("Usuario ya registrado")
                } else {
                    bcrypt.hash(contrasena, 10, (err, palabraSecretaEncriptada) => {
                        if (err) {
                            console.log("No se ha podido encriptar la contraseña ", err);
                        } else {
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

            });
        }
    },
    login: (req, res) => {
        loginEmail = req.body.loginEmail;
        passLog = req.body.passLog;

        let nameCorrect = `SELECT email,contrasena FROM Usuarios where email = '${loginEmail}'`;

        connection.query(nameCorrect, (err, rows) => {
            if (err) throw err;
            bcrypt.compare(passLog, rows[0].contrasena).then(function (result) {
                if (result && rows[0].email == loginEmail) {
                    res.send("Usuario Correcto");
                } else {
                    res.send("Usuario incorrecto");
                }
            });
        });
    }
}


module.exports = user;