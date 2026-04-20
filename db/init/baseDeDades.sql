CREATE TABLE Preguntes_de_seguretat (
IDps INT NOT NULL,
Com_et_dius VARCHAR(30),
El_teu_numero_de_telefon VARCHAR(20),
El_teu_mail VARCHAR(60),
PRIMARY KEY (IDps)
);

CREATE TABLE Usuari (
IDusuari INT NOT NULL,
Nom VARCHAR(50) NOT NULL,
Cognom VARCHAR(50) NOT NULL,
Numero_de_telefon VARCHAR(20),
Username VARCHAR(50) NOT NULL,
Password VARCHAR(50) NOT NULL,
Mail VARCHAR(100) NOT NULL,
IDps INT,
PRIMARY KEY (IDusuari), 
CONSTRAINT fk_preguntes_de_seguretat
FOREIGN KEY (IDps) 
REFERENCES Preguntes_de_seguretat(IDps)
);

CREATE TABLE Login (
IDlogin INT NOT NULL,
Username VARCHAR(50),
Password VARCHAR(255),
IDusuari INT, 
PRIMARY KEY (IDlogin),
CONSTRAINT fk_user
FOREIGN KEY (IDusuari)
REFERENCES Usuari(IDusuari) 
);

INSERT INTO Usuari (IDusuari, Nom, Cognom, Numero_de_telefon, Username, Password, Mail, IDps)
VALUES (1, 'Joan', 'Garcia', '123456789', 'joangarcia', 'password123', 'joan.garcia@exemple.com', 1);
VALUES (2, 'Maria', 'Lopez', '987654321', 'marialopez', 'password456', 'maria.lopez@exemple.com', 2);  
VALUES (3, 'Carlos', 'Sanchez', '555555555', 'carlossanchez', 'password789', 'carlos.sanchez@exemple.com', 3); 
VALUES (4, 'Ana', 'Martinez', '444444444', 'anamartinez', 'password321', 'ana.martinez@exemple.com', 4);    
VALUES (5, 'Luis', 'Gomez', '333333333', 'luisgomez', 'password654', 'luis.gomez@exemple.com', 5);    
VALUES (6, 'Sofia', 'Fernandez', '222222222', 'sofiafernandez', 'password987', 'sofia.fernandez@exemple.com', 6);      
VALUES (7, 'David', 'Rodriguez', '111111111', 'davidrodriguez', 'password111', 'david.rodriguez@exemple.com', 7);      
VALUES (8, 'Laura', 'Gonzalez', '666666666', 'lauragonzalez', 'password222', 'laura.gonzalez@exemple.com', 8);      
VALUES (9, 'Javier', 'Perez', '777777777', 'javierperez', 'password333', 'javier.perez@exemple.com', 9);      
VALUES (10, 'Elena', 'Sanchez', '888888888', 'elenasanchez', 'password444', 'elena.sanchez@exemple.com', 10);
VALUES (11, 'Miguel', 'Diaz', '999999999', 'migueldiaz', 'password555', 'miguel.diaz@exemple.com', 11);
VALUES (12, 'Isabel', 'Ramirez', '777777777', 'isabelramirez', 'password666', 'isabel.ramirez@exemple.com', 12);
VALUES (13, 'Pablo', 'Vazquez', '888888888', 'pablovazquez', 'password777', 'pablo.vazquez@exemple.com', 13);
VALUES (14, 'Sara', 'Mendez', '999999999', 'saramendez', 'password888', 'sara.mendez@exemple.com', 14);
VALUES (15, 'Albert', 'Santos', '111111111', 'albertosantos', 'password999', 'albert.santos@exemple.com', 15);
