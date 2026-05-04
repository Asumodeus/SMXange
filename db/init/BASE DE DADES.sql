USE smxange;

CREATE TABLE Login (
    IDlogin INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL
);


CREATE TABLE Usuari (
    IDusuari INT AUTO_INCREMENT PRIMARY KEY,
    Nom VARCHAR(50) NOT NULL,
    Cognom VARCHAR(50) NOT NULL,
    Numero_de_telefon VARCHAR(20) UNIQUE,
    Mail VARCHAR(100) NOT NULL UNIQUE,
    IDLogin INT UNIQUE, 
    FOREIGN KEY (IDLogin) REFERENCES Login(IDlogin) 
);


CREATE TABLE Preguntes_de_seguretat (
    IDps INT AUTO_INCREMENT PRIMARY KEY,
    IDusuari INT,
    Pregunta VARCHAR(100),
    Resposta VARCHAR(100),
    FOREIGN KEY (IDusuari) REFERENCES Usuari(IDusuari)
);


CREATE TABLE Monedes (
    ID_moneda INT AUTO_INCREMENT PRIMARY KEY,
    Nom VARCHAR(50) NOT NULL UNIQUE,
    Descripcio VARCHAR(255)
);


CREATE TABLE Historic_Preus (
    ID_historic INT AUTO_INCREMENT PRIMARY KEY,
    Data DATETIME NOT NULL,
    Preu DECIMAL(10,2) NOT NULL,
    ID_moneda INT,
    FOREIGN KEY (ID_moneda) REFERENCES Monedes(ID_moneda)
);


CREATE TABLE Transaccions (
    ID_transaccio INT AUTO_INCREMENT PRIMARY KEY,
    Quantitat DECIMAL(10,2) NOT NULL,
    Data DATETIME NOT NULL,
    Destinatari VARCHAR(100),
    Comissio DECIMAL(10,2),
    ID_Usuari INT,
    ID_Moneda INT,
    FOREIGN KEY (ID_Usuari) REFERENCES Usuari(IDusuari),
    FOREIGN KEY (ID_Moneda) REFERENCES Monedes(ID_moneda)
);


CREATE TABLE Cursos (
    ID_Cursos INT AUTO_INCREMENT PRIMARY KEY,
    Nom VARCHAR(100) NOT NULL,
    Hores INT,
    ID_Usuari INT,
    FOREIGN KEY (ID_Usuari) REFERENCES Usuari(IDusuari)
);


CREATE TABLE Moduls (
    ID_Moduls INT AUTO_INCREMENT PRIMARY KEY,
    Nom VARCHAR(100),
    ID_Cursos INT,
    FOREIGN KEY (ID_Cursos) REFERENCES Cursos(ID_Cursos)
);


CREATE TABLE Temes (
    ID_Temes INT AUTO_INCREMENT PRIMARY KEY,
    Nom VARCHAR(100),
    ID_Modul INT,
    FOREIGN KEY (ID_Modul) REFERENCES Moduls(ID_Moduls)
);


CREATE TABLE Contingut (
    ID_Contingut INT AUTO_INCREMENT PRIMARY KEY,
    Textos TEXT,
    ID_Temes INT,
    FOREIGN KEY (ID_Temes) REFERENCES Temes(ID_Temes)
);


CREATE TABLE Activitats (
    ID_Act INT AUTO_INCREMENT PRIMARY KEY,
    Nom VARCHAR(100),
    Nota DECIMAL(5,2),
    Dificultat VARCHAR(50),
    ID_Temes INT,
    FOREIGN KEY (ID_Temes) REFERENCES Temes(ID_Temes)
);

INSERT INTO Usuari ( Nom, Cognom, Numero_de_telefon, Mail)
VALUES 
( 'Joan', 'Garcia', '123456789', 'joan.garcia@exemple.com'),
( 'Maria', 'Lopez', '987654321', 'maria.lopez@exemple.com'),  
( 'Carlos', 'Sanchez', '555555555', 'carlos.sanchez@exemple.com'), 
( 'Ana', 'Martinez', '444444444', 'ana.martinez@exemple.com'),    
( 'Luis', 'Gomez', '333333333', 'luis.gomez@exemple.com'),    
( 'David', 'Rodriguez', '111111111', 'david.rodriguez@exemple.com'),      
( 'Laura', 'Gonzalez', '666666666', 'laura.gonzalez@exemple.com'),      
( 'Javier', 'Perez', '777777777', 'javier.perez@exemple.com'),      
( 'Elena', 'Sanchez', '888888888', 'elena.sanchez@exemple.com'),
( 'Miguel', 'Diaz', '999999999', 'miguel.diaz@exemple.com'),
( 'Isabel', 'Ramirez', '777777777', 'isabel.ramirez@exemple.com'),
( 'Pablo', 'Vazquez', '888888888', 'pablo.vazquez@exemple.com'),
( 'Sara', 'Mendez', '999999999', 'sara.mendez@exemple.com'),
( 'Albert', 'Santos', '111111111', 'albert.santos@exemple.com');

INSERT INTO Login ( Username, Password)
Values
( 'joangarcia', 'password123'),
( 'marialopez', 'password456'),
( 'carlossanchez', 'password789'),
( 'anamartinez', 'password321'),
( 'luisgomez', 'password654'),
( 'davidrodriguez', 'password111'),
( 'lauragonzalez', 'password222'),
( 'javierperez', 'password333'),
( 'elenasanchez', 'password444'),
( 'migueldiaz', 'password555'),
( 'isabelramirez', 'password666'),
( 'pablovazquez', 'password777'),
( 'saramendez', 'password888'),
('albertosantos', 'password999');

commit;