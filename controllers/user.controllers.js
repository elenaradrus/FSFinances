const connection = require("../database/sqlDB");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const url = "mongodb://127.0.0.1:27017/test";
const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

const user = {
    saveDataForm: (req, res) => {
        const nombre = req.body.accountName;
        const email = req.body.accountEmail;
        const contrasena = req.body.accountPassword;
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
            const getUsers = `SELECT * FROM Usuarios WHERE email = '${email}'`;
            connection.query(getUsers, (err, result) => {
                if (result.length > 0) {
                    res.json({ message: "Usuario ya registrado", status: false })
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

                            res.json({ message: "Registro completado correctamente", status: true })
                        }
                    });
                }

            });
        }
    },
    login: (req, res) => {
        loginEmail = req.body.loginEmail;
        passLog = req.body.passLog;

        let nameCorrect = `SELECT * FROM Usuarios where email = '${loginEmail}'`;

        connection.query(nameCorrect, (err, rows) => {
            if (rows.length > 0) {
                bcrypt.compare(passLog, rows[0].contrasena).then(function (result) {
                    //console.log(result);
                    if (result) {
                        res.json({ message: "Usuario Correcto", status: true });
                    } else {
                        res.json({ message: "Usuario o contraseña incorrecta", status: false });
                    }
                });
            } else {
                res.json({ message: "Usuario o contraseña incorrecta", status: false });
            }
        });
    },
    contacto: (req, res) => {
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

            res.json({ message: "Mensaje enviado", state: true });
        } else {
            res.json({ message: "Todos los campos son obligatorios", state: false });
        }
    },
    ingresos: (req, res) => {
        const income = req.body.income;
        const expectedSavings = req.body.expectedSavings;

        if (typeof income == 'number' && typeof expectedSavings == 'number') {
            res.send("correcto")
        } else {
            res.send("No es un número")
        }
    },
    finanzas: (req, res) => {
        const title = req.body.title;
        const day = req.body.day;
        const description = req.body.description;
        const amount = req.body.amount;

        if (
            title == 'Hogar' &&
            typeof day == 'number' &&
            typeof description == 'string' &&
            typeof amount == 'number'
        ) {
            const insertHogar = `INSERT INTO GastosHogar
                    (
                    dia, descripcion, precio
                    )
                    VALUES
                    (
                    ?, ?, ?
                    )`;

            let dataHogar = mysql.format(insertHogar, [day, description, amount]);

            connection.query(dataHogar, (err, data) => {
                if (err) throw err;
                console.log(data);
                console.log('Datos Hogar insertados en DB');
            });


            res.send('Todo correcto');

        } else if (
            title == 'Supermercados' &&
            typeof day == 'number' &&
            typeof description == 'string' &&
            typeof amount == 'number'
        ) {
            const insertSupermercados = `INSERT INTO GastosSupermercados
                    (
                    dia, descripcion, precio
                    )
                    VALUES
                    (
                    ?, ?, ?
                    )`;

            let dataSupermercados = mysql.format(insertSupermercados, [day, description, amount]);

            connection.query(dataSupermercados, (err, data) => {
                if (err) throw err;
                console.log(data);
                console.log('Datos Supermercados insertados en DB');
            });
            res.send('Todo correcto');
        } else if (
            title == 'Restaurantes' &&
            typeof day == 'number' &&
            typeof description == 'string' &&
            typeof amount == 'number'
        ) {
            const insertRestaurantes = `INSERT INTO GastosRestaurantes
                    (
                    dia, descripcion, precio
                    )
                    VALUES
                    (
                    ?, ?, ?
                    )`;

            let dataRestaurantes = mysql.format(insertRestaurantes, [day, description, amount]);

            connection.query(dataRestaurantes, (err, data) => {
                if (err) throw err;
                console.log(data);
                console.log('Datos Restaurantes insertados en DB');
            });
            res.send('Todo correcto');

        } else if (
            title == 'Ocio' &&
            typeof day == 'number' &&
            typeof description == 'string' &&
            typeof amount == 'number'
        ) {
            const insertOcio = `INSERT INTO GastosOcio
                    (
                    dia, descripcion, precio
                    )
                    VALUES
                    (
                    ?, ?, ?
                    )`;

            let dataOcio = mysql.format(insertOcio, [day, description, amount]);

            connection.query(dataOcio, (err, data) => {
                if (err) throw err;
                console.log(data);
                console.log('Datos Ocio insertados en DB');
            });
            res.send('Todo correcto');
        } else {
            res.send('Campos incorrectos');
        }
    }
}


module.exports = user;