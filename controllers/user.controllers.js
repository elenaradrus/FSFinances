const connection = require("../database/sqlDB");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const url = "mongodb://127.0.0.1:27017/test";
const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

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
    },
    contacto: (req, res) => {
        const contactName = req.body.contactName;
        const contactEmail = req.body.contactEmail;
        const contactMessage = req.body.contactMessage;

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

            res.send("Mensaje enviado");
        } else {
            res.send("Algún campo está vacío");
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