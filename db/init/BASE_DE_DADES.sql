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

CREATE TABLE Literal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100),
    cat TEXT,
    esp TEXT,
    eng TEXT
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

INSERT INTO Literal (nom, cat, esp, eng) VALUES

('academia_btnInici',
'Tornar a l''Inici',
'Volver al Inicio'	   
'Back to Home'),

('academia_titolPrincipal',
'Curs Bàsic de Criptomonedes',
'Curso Básico de Criptomonedas',
'Basic Cryptocurrency Course'),

('academia_titolLlico1',
'Lliçó 1: Què és una criptomoneda?',
'Lección 1: ¿Qué es una criptomoneda?',
'Lesson 1: What is a cryptocurrency?'),

('academia_text1',
'Una criptomoneda és una moneda digital o virtual dissenyada per funcionar com a mitjà d''intercanvi.',
'Una criptomoneda es una moneda digital o virtual diseñada para funcionar como medio de intercambio.',
'A cryptocurrency is a digital or virtual currency designed to work as a medium of exchange.'),

('academia_text2',
'Utilitza la criptografia per assegurar i verificar les transaccions, així com per controlar la creació de noves unitats.',
'Utiliza la criptografía para asegurar y verificar las transacciones, así como para controlar la creación de nuevas unidades.',
'It uses cryptography to secure and verify transactions, as well as to control the creation of new units.'),

('academia_text3',
'A diferència dels diners tradicionals, les criptomonedes estan descentralitzades i funcionen mitjançant una tecnologia anomenada Blockchain.',
'A diferencia del dinero tradicional, las criptomonedas están descentralizadas y funcionan mediante una tecnología llamada Blockchain.',
'Unlike traditional money, cryptocurrencies are decentralized and work through a technology called Blockchain.'),

('academia_titolExercici',
'Exercici Pràctic',
'Ejercicio Práctico',
'Practical Exercise'),

('academia_textExercici',
'Posa a prova els teus coneixements:',
'Pon a prueba tus conocimientos:',
'Test your knowledge:'),

('academia_pregunta1',
'Quina tecnologia s''utilitza principalment per fer funcionar les criptomonedes?',
'¿Qué tecnología se utiliza principalmente para hacer funcionar las criptomonedas?',
'Which technology is mainly used to run cryptocurrencies?'),

('academia_respostaA',
'Intel·ligència Artificial',
'Inteligencia Artificial',
'Artificial Intelligence'),

('academia_respostaB',
'Blockchain (Cadena de blocs)',
'Blockchain (Cadena de bloques)',
'Blockchain'),

('academia_respostaC',
'Realitat Virtual',
'Realidad Virtual',
'Virtual Reality'),

('academia_btnComprovar',
'Comprovar Resposta',
'Comprobar Respuesta',
'Check Answer'),

('client_historial',
'Historial',
'Historial',
'History'),

('client_ranking',
'Ranking',
'Ranking',
'Ranking'),

('client_donacions',
'Donacions',
'Donaciones',
'Donations'),

('client_atencioClient',
'Atenció al Client',
'Atención al Cliente',
'Customer Support'),

('client_iniciarSessio',
'Iniciar Sessió',
'Iniciar Sesión',
'Login'),

('client_titolHero',
'Atenció al Client',
'Atención al Cliente',
'Customer Support'),

('client_subtitolHero',
'El nostre equip d''especialistes et resoldrà qualsevol dubte sobre criptomonedes.',
'Nuestro equipo de especialistas resolverá cualquier duda sobre criptomonedas.',
'Our team of specialists will solve any questions about cryptocurrencies.'),

('client_pill1',
'Tots els temes',
'Todos los temas',
'All topics'),

('client_pill2',
'Compte i verificació',
'Cuenta y verificación',
'Account and verification'),

('client_pill3',
'Depòsits i retirades',
'Depósitos y retiradas',
'Deposits and withdrawals'),

('client_pill4',
'Seguretat i 2FA',
'Seguridad y 2FA',
'Security and 2FA'),

('client_pill5',
'Comissions',
'Comisiones',
'Fees'),

('client_pill6',
'Trading i ordres',
'Trading y órdenes',
'Trading and orders'),

('client_card1',
'Seguretat del compte',
'Seguridad de la cuenta',
'Account security'),

('client_card2',
'Transaccions crypto',
'Transacciones crypto',
'Crypto transactions'),

('client_card3',
'Fiat i pagaments',
'Fiat y pagos',
'Fiat and payments'),

('client_card4',
'KYC i verificació',
'KYC y verificación',
'KYC and verification'),

('client_enviarSolicitud',
'Envia una sol·licitud',
'Envía una solicitud',
'Send a request'),

('client_nom',
'Nom',
'Nombre',
'Name'),

('client_cognoms',
'Cognoms',
'Apellidos',
'Surname'),

('client_usuari',
'Usuari',
'Usuario',
'Username'),

('client_correu',
'Correu electrònic',
'Correo electrónico',
'Email'),

('client_btnEnviar',
'Enviar sol·licitud',
'Enviar solicitud',
'Send request'),

('client_estatServei',
'Estat del servei',
'Estado del servicio',
'Service status'),

('client_horariAtencio',
'Horari d''atenció',
'Horario de atención',
'Support hours'),

('client_altresCanals',
'Altres canals',
'Otros canales',
'Other channels'),

('client_preguntesFreq',
'Preguntes freqüents',
'Preguntas frecuentes',
'Frequently asked questions'),

('forgot_titlePage',
'Heu oblidat la contrasenya?',
'¿Has olvidado la contraseña?',
'Forgot your password?'),

('forgot_titolReset',
'Restableix la contrasenya',
'Restablece la contraseña',
'Reset password'),

('forgot_novaContrasenya',
'Nova contrasenya',
'Nueva contraseña',
'New password'),

('forgot_infoPassword',
'8 caràcters com a mínim, distingeix majúscules de minúscules',
'8 caracteres como mínimo, distingue mayúsculas de minúsculas',
'8 characters minimum, case sensitive'),

('forgot_repetirContrasenya',
'Torneu a escriure la contrasenya',
'Vuelve a escribir la contraseña',
'Re-enter password'),

('forgot_btnCancelar',
'Cancel·lar',
'Cancelar',
'Cancel'),

('forgot_btnConfirmar',
'Confirma',
'Confirmar',
'Confirm');  

('index_titlePage',
'SMXCHANGE',
'SMXCHANGE',
'SMXCHANGE'),

('index_titol',
'Inici de sessió',
'Inicio de sesión',
'Login'),

('index_usuari',
'Usuari',
'Usuario',
'Username'),

('index_contrasenya',
'Contrasenya',
'Contraseña',
'Password'),

('index_oblidatContrasenya',
'Has oblidat la teva contrasenya?',
'¿Has olvidado tu contraseña?',
'Forgot your password?'),

('index_btnIniciarSessio',
'Iniciar Sessió',
'Iniciar Sesión',
'Login'),

('index_noCompte',
'No tens un compte?',
'¿No tienes una cuenta?',
'Don''t have an account?'),

('index_registrat',
'Registra''t',
'Regístrate',
'Sign up'),

('portada_titlePage',
'SMXCHANGE',
'SMXCHANGE',
'SMXCHANGE'),

('portada_historial',
'Historial',
'Historial',
'History'),

('portada_ranking',
'Ranking',
'Ranking',
'Ranking'),

('portada_donacions',
'Donacions',
'Donaciones',
'Donations'),

('portada_btnLogin',
'Iniciar Sessió',
'Iniciar Sesión',
'Login'),

('portada_titolPrincipal',
'El poder de les criptomonedes en les teves mans',
'El poder de las criptomonedas en tus manos',
'The power of cryptocurrencies in your hands'),

('portada_subtitol',
'Uneix-te a una nova economía digital amb la seguretat i confiança de SMXCHANGE',
'Únete a una nueva economía digital con la seguridad y confianza de SMXCHANGE',
'Join a new digital economy with the security and trust of SMXCHANGE'),

('portada_btnComencaAra',
'Comença ara',
'Empieza ahora',
'Start now'),

('register_titlePage',
'SMXCHANGE',
'SMXCHANGE',
'SMXCHANGE'),

('register_titol',
'Crear un compte',
'Crear una cuenta',
'Create an account'),

('register_nom',
'Nom',
'Nombre',
'Name'),

('register_cognom',
'Cognom',
'Apellido',
'Surname'),

('register_usuari',
'Usuari',
'Usuario',
'Username'),

('register_telefon',
'Número de telèfon',
'Número de teléfono',
'Phone number'),

('register_correu',
'Correu electrònic',
'Correo electrónico',
'Email'),

('register_contrasenya',
'Contrasenya',
'Contraseña',
'Password'),

('register_confirmaContrasenya',
'Confirma la contrasenya',
'Confirma la contraseña',
'Confirm password'),

('register_btnRegistrat',
'Registra''t',
'Regístrate',
'Sign up'),

('register_jaCompte',
'Ja tens un compte?',
'¿Ya tienes una cuenta?',
'Already have an account?'),

('register_iniciaSessio',
'Inicia sessió',
'Inicia sesión',
'Login'),

('register_msgFinestra',
'Missatge',
'Mensaje',
'Message'),

('register_btnAcceptar',
'Acceptar',
'Aceptar',
'Accept');

commit;