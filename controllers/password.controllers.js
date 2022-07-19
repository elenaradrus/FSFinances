const connection = require("../database/sqlDB");
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const fs = require("fs");

const sendMail = require("../email");

const SECRET = "secretword";

const changePassword = {

    checkUser: async (req, res, next) => {
        let email = req.body.email;


        const getUserFromDB = `SELECT * FROM Usuarios WHERE email = '${email}'`;

        connection.query(getUserFromDB, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {

                const payload = {
                    email,
                };
                const token = jwt.sign(payload, SECRET, { expiresIn: "30m" });

                const link = `<a href="http://localhost:3000/changepassword/${email}/${token}">Enlace</a>`;
                console.log(link);
                res.json({ message: "Se te ha enviado un email con las instrucciones", status: true })
                sendMail("clementinadelparaiso@gmail.com", `${email}`, "Cambiar contraseña", `${link}`)
            } else {
                console.log('El usuario no existe');
                res.json({ message: "Email no registrado", status: false })
            }
        })
    },
    checkUserPost: (req, res) => {

        const { newPassword, email, token} = req.body
       
        const updatePassword = `UPDATE Usuarios SET contrasena='${newPassword}' WHERE email = '${email}'`;
         
        connection.query(updatePassword, (err, result) => {
            if (err) throw err;
            console.log(result)
            res.json({message: "Contraseña cambiada correctamente"})
        });
    },
    confirmUserGet: (req, res) => {
        const { token } = req.params;

        try {
            jwt.verify(token, SECRET);

            res.render("confirmed-user");
        } catch (error) {
            res.send("No se puede confirmar el usuario, token inválido");
        }
    }

};

module.exports = changePassword;

