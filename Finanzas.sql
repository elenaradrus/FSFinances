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
    ingreso VARCHAR(100),
    ahorroEsperado VARCHAR(100),
    gastoTotal VARCHAR(100),
    ahorroReal VARCHAR(100),
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

CREATE TABLE GastosFijos (
    id INT AUTO_INCREMENT,
    dia VARCHAR(100),
    descripcion VARCHAR(100),
    precio VARCHAR(100),
    total VARCHAR(100),
    PRIMARY KEY (id)
);

SELECT * FROM GastosFijos;

CREATE TABLE GastosSupermercados (
    id INT AUTO_INCREMENT,
    dia VARCHAR(100),
    descripcion VARCHAR(100),
    precio VARCHAR(100),
    total VARCHAR(100),
    PRIMARY KEY (id)
);

SELECT * FROM GastosSupermercados;

CREATE TABLE GastosOcio (
    id INT AUTO_INCREMENT,
    dia VARCHAR(100),
    descripcion VARCHAR(100),
    precio VARCHAR(100),
    total VARCHAR(100),
    PRIMARY KEY (id)
);

SELECT * FROM GastosOcio;

CREATE TABLE GastosFijos_Usuarios(
id INT AUTO_INCREMENT,
fk_id_usuario INT NOT NULL,
fk_id_gastosFijos INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY(fk_id_usuario) REFERENCES Usuarios(id) ON UPDATE CASCADE ON DELETE CASCADE, 
FOREIGN KEY(fk_id_gastosFijos) REFERENCES GastosFijos(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE GastosSupermercados_Usuarios(
id INT AUTO_INCREMENT,
fk_id_usuario INT NOT NULL,
fk_id_gastosSupermercados INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY(fk_id_usuario) REFERENCES Usuarios(id) ON UPDATE CASCADE ON DELETE CASCADE, 
FOREIGN KEY(fk_id_gastosSupermercados) REFERENCES GastosSupermercados(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE GastosOcio_Usuarios(
id INT AUTO_INCREMENT,
fk_id_usuario INT NOT NULL,
fk_id_gastosOcio INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY(fk_id_usuario) REFERENCES Usuarios(id) ON UPDATE CASCADE ON DELETE CASCADE, 
FOREIGN KEY(fk_id_gastosOcio) REFERENCES GastosOcio(id) ON UPDATE CASCADE ON DELETE CASCADE
);
