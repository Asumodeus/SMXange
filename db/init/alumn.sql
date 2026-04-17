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
