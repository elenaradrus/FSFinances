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
    mes VARCHAR(100) NOT NULL,
    ano VARCHAR(100) NOT NULL,
    ingreso VARCHAR(100) NOT NULL,
    ahorroEsperado VARCHAR(100) NOT NULL,
    gastoTotal VARCHAR(100),
    ahorroReal VARCHAR(100),
    PRIMARY KEY (id)
);


CREATE TABLE GastosHogar (
    id INT AUTO_INCREMENT,
    dia VARCHAR(100) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    precio VARCHAR(100) NOT NULL,
    total VARCHAR(100),
    PRIMARY KEY (id)
);

CREATE TABLE GastosSupermercados (
    id INT AUTO_INCREMENT,
    dia VARCHAR(100) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    precio VARCHAR(100) NOT NULL,
    total VARCHAR(100),
    PRIMARY KEY (id)
);

CREATE TABLE GastosRestaurantes (
    id INT AUTO_INCREMENT,
    dia VARCHAR(100) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    precio VARCHAR(100) NOT NULL,
    total VARCHAR(100),
    PRIMARY KEY (id)
);

CREATE TABLE GastosOcio (
    id INT AUTO_INCREMENT,
    dia VARCHAR(100) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    precio VARCHAR(100) NOT NULL,
    total VARCHAR(100),
    PRIMARY KEY (id)
);

CREATE TABLE GastosHogar_Usuarios(
id INT AUTO_INCREMENT,
fk_id_usuario INT NOT NULL,
fk_id_gastosHogar INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY(fk_id_usuario) REFERENCES Usuarios(id) ON UPDATE CASCADE ON DELETE CASCADE, 
FOREIGN KEY(fk_id_gastosHogar) REFERENCES GastosHogar(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE GastosSupermercados_Usuarios(
id INT AUTO_INCREMENT,
fk_id_usuario INT NOT NULL,
fk_id_gastosSupermercados INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY(fk_id_usuario) REFERENCES Usuarios(id) ON UPDATE CASCADE ON DELETE CASCADE, 
FOREIGN KEY(fk_id_gastosSupermercados) REFERENCES GastosSupermercados(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE GastosRestaurantes_Usuarios(
id INT AUTO_INCREMENT,
fk_id_usuario INT NOT NULL,
fk_id_gastosRestaurantes INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY(fk_id_usuario) REFERENCES Usuarios(id) ON UPDATE CASCADE ON DELETE CASCADE, 
FOREIGN KEY(fk_id_gastosRestaurantes) REFERENCES GastosRestaurantes(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE GastosOcio_Usuarios(
id INT AUTO_INCREMENT,
fk_id_usuario INT NOT NULL,
fk_id_gastosOcio INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY(fk_id_usuario) REFERENCES Usuarios(id) ON UPDATE CASCADE ON DELETE CASCADE, 
FOREIGN KEY(fk_id_gastosOcio) REFERENCES GastosOcio(id) ON UPDATE CASCADE ON DELETE CASCADE
);
