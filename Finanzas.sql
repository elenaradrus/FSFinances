#DROP DATABASE Finanzas;

CREATE DATABASE Finanzas;

USE Finanzas;

CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    contrasena VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

SELECT * FROM Usuarios;

CREATE TABLE Finanzas(
    id INT AUTO_INCREMENT,
    fk_id_usuario INT,
    mes VARCHAR(100),
    ingreso INT,
    ahorroEsperado VARCHAR(100),
    gastoTotal INT,
    ahorroReal INT,
    PRIMARY KEY (id),
    FOREIGN KEY(fk_id_usuario) REFERENCES Usuarios(id) ON UPDATE CASCADE ON DELETE CASCADE
);

#INSERT INTO Finanzas VALUES (null, 1, "1500", "400",null,null);

select * from Finanzas where fk_id_usuario = 1;

SELECT * FROM Finanzas;

#CREATE TABLE Usuarios_Finanzas(
#	id INT AUTO_INCREMENT,
#	fk_id_usuario INT NOT NULL,
#	fk_id_finanzas INT NOT NULL,
#	PRIMARY KEY (id),
#	FOREIGN KEY(fk_id_usuario) REFERENCES Usuarios(id) ON UPDATE CASCADE ON DELETE CASCADE, 
#	FOREIGN KEY(fk_id_finanzas) REFERENCES Finanzas(id) ON UPDATE CASCADE ON DELETE CASCADE
#);

#DROP TABLE Gastos;

CREATE TABLE Gastos (
    id INT AUTO_INCREMENT,
    fk_id_usuario INT,
    mes VARCHAR(100),
    tipo VARCHAR(100),
    dia INT,
    descripcion VARCHAR(100),
    precio INT,
    total INT,
    PRIMARY KEY (id)
);

SELECT * FROM Gastos;




