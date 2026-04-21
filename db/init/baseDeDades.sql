
CREATE TABLE Preguntes_de_seguretat (
IDps INT auto_increment NOT NULL,
Com_et_dius VARCHAR(30),
El_teu_numero_de_telefon VARCHAR(20),
El_teu_mail VARCHAR(60),
PRIMARY KEY (IDps)
);

CREATE TABLE Usuari (
IDusuari INT auto_increment NOT NULL,
Nom VARCHAR(50) NOT NULL,
Cognom VARCHAR(50) NOT NULL,
Numero_de_telefon VARCHAR(20),
Username VARCHAR(50) NOT NULL,
Password VARCHAR(50) NOT NULL,
Mail VARCHAR(100) NOT NULL,
PRIMARY KEY (IDusuari) 
);

CREATE TABLE Login (
IDlogin INT auto_increment NOT NULL	,
Username VARCHAR(50),
Password VARCHAR(255),
IDusuari INT, 
PRIMARY KEY (IDlogin),
CONSTRAINT fk_user
FOREIGN KEY (IDusuari)
REFERENCES Usuari(IDusuari) 
);

create user 'Smxange' identified by 'DnhYKQ49gQ';
grant all privileges on smxchange.* to 'Smxange';  

INSERT INTO Usuari ( Nom, Cognom, Numero_de_telefon, Username, Password, Mail)
VALUES ( 'Joan', 'Garcia', '123456789', 'joangarcia', 'password123', 'joan.garcia@exemple.com');
INSERT INTO Usuari ( Nom, Cognom, Numero_de_telefon, Username, Password, Mail)
VALUES ( 'Maria', 'Lopez', '987654321', 'marialopez', 'password456', 'maria.lopez@exemple.com');  
INSERT INTO Usuari ( Nom, Cognom, Numero_de_telefon, Username, Password, Mail)
VALUES ( 'Carlos', 'Sanchez', '555555555', 'carlossanchez', 'password789', 'carlos.sanchez@exemple.com'); 
INSERT INTO Usuari ( Nom, Cognom, Numero_de_telefon, Username, Password, Mail)
VALUES ( 'Ana', 'Martinez', '444444444', 'anamartinez', 'password321', 'ana.martinez@exemple.com');    
INSERT INTO Usuari ( Nom, Cognom, Numero_de_telefon, Username, Password, Mail)
VALUES ( 'Luis', 'Gomez', '333333333', 'luisgomez', 'password654', 'luis.gomez@exemple.com');    
INSERT INTO Usuari ( Nom, Cognom, Numero_de_telefon, Username, Password, Mail)
VALUES ( 'David', 'Rodriguez', '111111111', 'davidrodriguez', 'password111', 'david.rodriguez@exemple.com');      
INSERT INTO Usuari ( Nom, Cognom, Numero_de_telefon, Username, Password, Mail)
VALUES ( 'Laura', 'Gonzalez', '666666666', 'lauragonzalez', 'password222', 'laura.gonzalez@exemple.com');      
INSERT INTO Usuari ( Nom, Cognom, Numero_de_telefon, Username, Password, Mail)
VALUES ( 'Javier', 'Perez', '777777777', 'javierperez', 'password333', 'javier.perez@exemple.com');      
INSERT INTO Usuari ( Nom, Cognom, Numero_de_telefon, Username, Password, Mail)
VALUES ( 'Elena', 'Sanchez', '888888888', 'elenasanchez', 'password444', 'elena.sanchez@exemple.com');
INSERT INTO Usuari ( Nom, Cognom, Numero_de_telefon, Username, Password, Mail)
VALUES ( 'Miguel', 'Diaz', '999999999', 'migueldiaz', 'password555', 'miguel.diaz@exemple.com');
INSERT INTO Usuari ( Nom, Cognom, Numero_de_telefon, Username, Password, Mail)
VALUES ( 'Isabel', 'Ramirez', '777777777', 'isabelramirez', 'password666', 'isabel.ramirez@exemple.com');
INSERT INTO Usuari ( Nom, Cognom, Numero_de_telefon, Username, Password, Mail)
VALUES ( 'Pablo', 'Vazquez', '888888888', 'pablovazquez', 'password777', 'pablo.vazquez@exemple.com');
INSERT INTO Usuari ( Nom, Cognom, Numero_de_telefon, Username, Password, Mail)
VALUES ( 'Sara', 'Mendez', '999999999', 'saramendez', 'password888', 'sara.mendez@exemple.com');
INSERT INTO Usuari ( Nom, Cognom, Numero_de_telefon, Username, Password, Mail)
VALUES ( 'Albert', 'Santos', '111111111', 'albertosantos', 'password999', 'albert.santos@exemple.com');

commit;