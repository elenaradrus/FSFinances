const connection = require("../database/sqlDB");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const url = "mongodb://127.0.0.1:27017/test";
const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

const user = {
    saveDataForm: (req, res) => {
        const name = req.body.accountName;
        const email = req.body.accountEmail;
        const password = req.body.accountPassword;
        const emailExp = new RegExp(/^([\d\w_\.-]+)@([\d\w\.-]+)\.([\w\.]{3})$/);
        const nameExp = new RegExp(/^([A-Za-z]{1,15})$/);
        const passExp = new RegExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/
        );

        if (
            !nameExp.test(name) ||
            !emailExp.test(email) ||
            !passExp.test(password)
        ) {
            console.log("campos incorrectos"); //renderizar una pagina de campos incorrectos
        } else {
            const getUsers = `SELECT * FROM Usuarios WHERE email = '${email}'`;
            connection.query(getUsers, (err, result) => {
                if (result.length > 0) {
                    res.json({ message: "Usuario ya registrado", status: false })
                } else {
                    bcrypt.hash(password, 10, (err, palabraSecretaEncriptada) => {
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
                                name,
                                email,
                                palabraEncriptada
                            ]);
                            connection.query(query, (err, data) => {
                                if (err) throw err;
                                console.log(data);
                            });

                            res.json({ message: "Registro completado correctamente", status: true })
                        }
                    });
                }

            });
        }
    },
    login: (req, res) => {
        const loginEmail = req.body.loginEmail;
        const passLog = req.body.passLog;

        let nameCorrect = `SELECT * FROM Usuarios where email = '${loginEmail}'`;

        connection.query(nameCorrect, (err, rows) => {
            if (rows.length > 0) {
                bcrypt.compare(passLog, rows[0].contrasena).then(function (result) {
                    console.log(rows[0]);
                    if (result) {
                        res.json({ message: "Usuario Correcto", status: true, id: rows[0].id });
                    } else {
                        res.json({ message: "Usuario o contraseña incorrecta", status: false });
                    }
                });
            } else {
                res.json({ message: "Usuario o contraseña incorrecta", status: false });
            }
        });
    },
    contact: (req, res) => {
        const contactName = req.body.dataName;
        const contactEmail = req.body.dataEmail;
        const contactMessage = req.body.dataMessage;

        const mongoDB = "Finanzas";
        const colection = "Contacto";
        const data = { "nombre": contactName, "email": contactEmail, "mensaje": contactMessage };

        if (contactName && contactEmail && contactMessage) {

            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db(mongoDB);

                dbo.collection(colection).insertOne(data, function (err, res) {
                    if (err) throw err;
                    console.log("Documento insertado");
                    db.close();
                });
            });

            res.status(200).json({ message: "Mensaje enviado", state: true });
        } else {
            res.status(400).json({ message: "Todos los campos son obligatorios", state: false });
        }
    },
    userIncome: (req, res) => {
        const month = req.body.month;
        const income = req.body.income;
        const expectedSavings = req.body.expectedSavings;
        const loggedUser = req.body.loggedUser;
        const idLoggedUser = req.body.idLoggedUser;
        //console.log(req.body.getId);

        if (month && income && expectedSavings) {
            const insertFinanzas = `INSERT INTO Finanzas
                    (
                    mes, fk_id_usuario, ingreso, ahorroEsperado
                    )
                    VALUES
                    (
                    ?, ?, ?, ?
                    )`;

            let dataFinanzas = mysql.format(insertFinanzas, [month, idLoggedUser, income, expectedSavings]);

            connection.query(dataFinanzas, (err, data) => {
                if (err) throw err;
                res.status(201);
                console.log(data);
                console.log('Finanzas insertadas en DB');
            });
            res.status(200).json({
                code: 200,
                message: "Los datos se han agreado con éxito",
                data: {
                    month,
                    income,
                    expectedSavings,
                }
            })
        } else {
            res.status(400).json({ code: 400, message: "Los datos no pueden estar vacios" })
        }


    },
    monthSummary: (req, res) => {

        const idLoggedUser = req.body.getId;
        const month = req.body.month;

        const getUser = `SELECT * FROM Finanzas where fk_id_usuario = '${idLoggedUser}' AND mes = '${month}'`;
        connection.query(getUser, (err, data) => {
            if (err) throw err;
            if (data.length) {
                res.json({ status: true, month: data[0].mes, income: data[0].ingreso, expectedSavings: data[0].ahorroEsperado })
            } else {
                res.json({ 
                    month: "", 
                    income: "Aún no hay datos", 
                    expectedSavings: "Aún no hay datos" 
                })
            }
            // console.log("data:" + data[0].ingreso)
            // console.log("data:" + data[0].ahorroEsperado)
            // console.log("data:" + data)
            //res.json({ ingreso: data[0].ingreso, ahorroEsperado: data[0].ahorroEsperado })

            // console.log("ingreso:" + data[0].ingreso);
        });
    },
    insertSpendings: (req, res) => {
        const title = req.body.title;
        const month = req.body.month;
        const day = req.body.day;
        const description = req.body.description;
        const amount = req.body.amount;
        const idLoggedUser = req.body.getId;


        if (title && month && day && description && amount) {
            // const procedure = `CALL GastosUsuarios(?, ?, ?, ?, ?, ?)`;
            // const dataGastos = mysql.format(procedure, [title, month, day, description, amount, idLoggedUser]);
            const insertSpending = `INSERT INTO Gastos
                    (
                    fk_id_usuario, tipo, mes, dia, descripcion, precio
                    )
                    VALUES
                    (
                    ?, ?, ?, ?, ?, ?
                    )`;

            let dataSpendings = mysql.format(insertSpending, [idLoggedUser, title, month, day, description, amount]);

            connection.query(dataSpendings, (err, data) => {
                if (err) throw err;
                //res.status(201);
                console.log(data);
                console.log('Gastos insertados en DB');
            });
            res.status(200).json({
                code: 200,
                status: true,
                message: "Los datos se han agreado con éxito",
                data: {
                    title,
                    day,
                    description,
                    amount
                }
            });
        } else {
            res.status(400).json({ code: 400, status: false, message: "Los datos no pueden estar vacios" })
        };
    },
    userSpendings: (req, res) => {
        const userId = req.body.userId;
        const month = req.body.month;

        const getSpendings = `SELECT * FROM Gastos WHERE fk_id_usuario = '${userId}' AND mes = '${month}'`;

        connection.query(getSpendings, (err, result) => {
            if (err) throw err;
            console.log("result" + result);
            //res.send(result)
            res.json({ code: 200, data: result });
        });

        // const insertGastosUsuarios = `INSERT INTO Gastos_Usuarios
        //         (
        //         fk_id_usuario, fk_id_gastos 
        //         )
        //         VALUES
        //         (
        //         ?, ?
        //         )`;

        // let dataGastosUsuarios = mysql.format(insertGastosUsuarios, [idLoggedUser]);

        // connection.query(dataGastosUsuarios, (err, data) => {
        //     if (err) throw err;
        //     //res.status(201);
        //     console.log(data);
        //     console.log('Gastos insertados en tabla relacional');
        // });

    },
    totalSpendings: (req, res) => {
        const userId = req.body.userId;
        const month = req.body.month;
        const totalSpendings = `SELECT precio FROM Gastos WHERE fk_id_usuario = '${userId}' AND mes = '${month}'`;

        connection.query(totalSpendings, (err, result) => {
            if (err) throw err;
            const amount = result;
            //console.log(amount)
            const mapAmount = amount.map((e) => {
                return e.precio;
            })
            console.log(mapAmount);

            const sumAmount = mapAmount.reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            })
            const totalAmount = sumAmount.toFixed(2);
            console.log(totalAmount);
            res.send({ totalAmount });
            //console.log("result" + result);
            //res.json({ code: 200, data: result });
        });

    }
};


module.exports = user;