USE smxange;


CREATE TABLE rols (
	IDrols INT PRIMARY KEY,
	NomRol VARCHAR(30) NOT NULL UNIQUE
);


CREATE TABLE Login (
    IDlogin INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(50) NOT NULL
);


CREATE TABLE Usuari (
    IDusuari INT AUTO_INCREMENT PRIMARY KEY,
    Nom VARCHAR(50) NOT NULL,
    Cognom VARCHAR(50) NOT NULL,
    Numero_de_telefon VARCHAR(20) UNIQUE,
    Mail VARCHAR(100) NOT NULL UNIQUE,
    IDLogin INT UNIQUE,
    IDrols INT NOT NULL DEFAULT 0,
    FOREIGN KEY (IDLogin) REFERENCES Login(IDlogin),
    FOREIGN KEY (IDrols) REFERENCES Rols(IDrols)
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


INSERT INTO Rols (IDrols, NomRol)
VALUES
(0, 'User'),
(1, 'Admin');


INSERT INTO Usuari (Nom, Cognom, Numero_de_telefon, Mail, IDrol)
VALUES 
('Joan', 'Garcia', '123456789', 'joan.garcia@exemple.com', '1'),
('Maria', 'Lopez', '987654321', 'maria.lopez@exemple.com', 'DEFAULT'),
('Carlos', 'Sanchez', '555555555', 'carlos.sanchez@exemple.com', 'DEFAULT'),
('Ana', 'Martinez', '444444444', 'ana.martinez@exemple.com', 'DEFAULT'),
('Luis', 'Gomez', '333333333', 'luis.gomez@exemple.com', 'DEFAULT'),
('David', 'Rodriguez', '111111111', 'david.rodriguez@exemple.com', 'DEFAULT'),
('Laura', 'Gonzalez', '666666666', 'laura.gonzalez@exemple.com', 'DEFAULT'),
('Javier', 'Perez', '777777777', 'javier.perez@exemple.com', 'DEFAULT'),
('Elena', 'Sanchez', '888888888', 'elena.sanchez@exemple.com', 'DEFAULT'),
('Miguel', 'Diaz', '999999999', 'miguel.diaz@exemple.com', 'DEFAULT'),
('Isabel', 'Ramirez', '777777777', 'isabel.ramirez@exemple.com', 'DEFAULT'),
('Pablo', 'Vazquez', '888888888', 'pablo.vazquez@exemple.com', 'DEFAULT'),
('Sara', 'Mendez', '999999999', 'sara.mendez@exemple.com', 'DEFAULT'),
('Albert', 'Santos', '111111111', 'albert.santos@exemple.com', 'DEFAULT');

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

INSERT INTO Literal (nom, cat, esp, eng) 
VALUES

('academia1_1_logoAlt', 
'Logo SMXchange', 
'Logo SMXchange', 
'SMXchange Logo'),

('academia1_1_titolHeader', 
'Acadèmia - Criptomonedes i Blockchain', 
'Academia - Criptomonedas y Blockchain', 
'Academy - Cryptocurrencies and Blockchain'),

('academia1_1_btnInici', 
'Tornar a l''Inici', 
'Volver al Inicio', 
'Back to Home'),

('academia1_1_sidebarTitol', 
'Esquema del Curs', 
'Esquema del Curso', 
'Course Outline'),

('academia1_1_modulProgres', 
'Mòdul 1: Introducció', 
'Módulo 1: Introducción', 
'Module 1: Introduction'),

('academia1_1_progresPercent', 
'0% Completat', 
'0% Completado', 
'0% Completed'),

('academia1_1_modul1_1', 
'1.1. Introducció al Blockchain', 
'1.1. Introducción al Blockchain', 
'1.1. Introduction to Blockchain'),

('academia1_1_modul1_2', 
'1.2. Què és una criptomoneda?', 
'1.2. ¿Qué es una criptomoneda?', 
'1.2. What is a cryptocurrency?'),

('academia1_1_modul1_3', 
'1.3. Com funciona la mineria?', 
'1.3. ¿Cómo funciona la minería?', 
'1.3. How does mining work?'),

('academia1_1_modul1_4', 
'1.4. Inversió i riscos', 
'1.4. Inversión y riesgos',
'1.4. Investment and risks'),

('academia1_1_titolContingut', 
'1.1. Introducció al Blockchain', 
'1.1. Introducción al Blockchain', 
'1.1. Introduction to Blockchain'),

('academia1_1_paragraf1', 
'El blockchain és una tecnologia revolucionària que permet l''emmagatzematge i la transmissió d''informació de manera segura, transparent i descentralitzada.', 
'El blockchain es una tecnología revolucionaria que permite el almacenamiento y la transmisión de información de manera segura, transparente y descentralizada.', 
'Blockchain is a revolutionary technology that enables secure, transparent, and decentralized storage and transmission of information.'),

('academia1_1_paragraf2', 
'En el seu nucli, és una base de dades distribuïda que manté una llista de registres en continu creixement, anomenats blocs. Cada bloc conté un enllaç criptogràfic al bloc anterior, una marca de temps i dades de transaccions.', 
'En su núcleo, es una base de datos distribuida que mantiene una lista de registros en continuo crecimiento, llamados bloques. Cada bloque contiene un enlace criptográfico al bloque anterior, una marca de tiempo y datos de transacciones.',
 'At its core, it is a distributed database that maintains a continuously growing list of records called blocks. Each block contains a cryptographic link to the previous block, a timestamp, and transaction data.'),

('academia1_1_paragraf3', 
'Aquesta estructura garanteix que la informació no pugui ser alterada retroactivament sense alterar tots els blocs posteriors.', 
'Esta estructura garantiza que la información no pueda ser alterada retroactivamente sin modificar todos los bloques posteriores.',
'This structure ensures that information cannot be altered retroactively without modifying all subsequent blocks.'),

('academia1_1_exerciciTitol', 
'Posa a prova els teus coneixements', 
'Pon a prueba tus conocimientos', 
'Test your knowledge'),

('academia1_1_pregunta1', 
'Què és fonamentalment un blockchain?', 
'¿Qué es fundamentalmente un blockchain?', 
'What is fundamentally a blockchain?'),

('academia1_1_respostaA', 
'Un videojoc descentralitzat', 
'Un videojuego descentralizado', 
'A decentralized video game'),

('academia1_1_respostaB', 
'Una base de dades distribuïda',
'Una base de datos distribuida', 
'A distributed database'),

('academia1_1_respostaC', 
'Una moneda física', 
'Una moneda física', 
'A physical currency'),

('academia1_1_btnSubmit', 
'Comprovar i Avançar', 
'Comprobar y Avanzar', 
'Check and Continue');

('academia1_2_logoAlt', 
'Logo SMXchange', 
'Logo SMXchange', 
'SMXchange Logo'),

('academia1_2_titolHeader', 
'Acadèmia - Criptomonedes i Blockchain', 
'Academia - Criptomonedas y Blockchain', 
'Academy - Cryptocurrencies and Blockchain'),

('academia1_2_btnInici', 
'Tornar a l''Inici', 
'Volver al Inicio', 
'Back to Home'),

('academia1_2_sidebarTitol', 
'Esquema del Curs',
'Esquema del Curso', 
'Course Outline'),

('academia1_2_modulProgres',
 'Mòdul 1: Introducció', 
 'Módulo 1: Introducción', 
 'Module 1: Introduction'),
 
('academia1_2_progresPercent', 
'25% Completat', 
'25% Completado', 
'25% Completed'),

('academia1_2_modul1_1', 
'1.1. Introducció al Blockchain', 
'1.1. Introducción al Blockchain', 
'1.1. Introduction to Blockchain'),

('academia1_2_modul1_2', 
'1.2. Què és una criptomoneda?', 
'1.2. ¿Qué es una criptomoneda?', 
'1.2. What is a cryptocurrency?'),

('academia1_2_modul1_3', 
'1.3. Com funciona la mineria?', 
'1.3. ¿Cómo funciona la minería?', 
'1.3. How does mining work?'),

('academia1_2_modul1_4', 
'1.4. Inversió i riscos', 
'1.4. Inversión y riesgos', 
'1.4. Investment and risks'),

('academia1_2_titolContingut', 
'1.2. Què és una criptomoneda?', 
'1.2. ¿Qué es una criptomoneda?', 
'1.2. What is a cryptocurrency?'),

('academia1_2_paragraf1', 
'El flux de transaccions entre usuaris genera un registre. A diferència dels diners tradicionals, les criptomonedes estan descentralitzades i funcionen mitjançant una tecnologia anomenada Blockchain.', 
'El flujo de transacciones entre usuarios genera un registro. A diferencia del dinero tradicional, las criptomonedas están descentralizadas y funcionan mediante una tecnología llamada Blockchain.', 
'The flow of transactions between users generates a record. Unlike traditional money, cryptocurrencies are decentralized and operate using a technology called Blockchain.'),

('academia1_2_paragraf2', 
'Són monedes digitals o virtuals dissenyades per funcionar com a mitjà d''intercanvi. Utilitzen la criptografia per assegurar i verificar les transaccions, així com per controlar la creació de noves unitats.', 
'Son monedas digitales o virtuales diseñadas para funcionar como medio de intercambio. Utilizan la criptografía para asegurar y verificar las transacciones, así como para controlar la creación de nuevas unidades.', 
'They are digital or virtual currencies designed to work as a medium of exchange. They use cryptography to secure and verify transactions, as well as to control the creation of new units.'),

('academia1_2_paragraf3', 
'A diferència de les monedes fiat tradicionals (com l''euro o el dòlar), les criptomonedes generalment no són emeses per cap autoritat central, el que les fa teòricament immunes a la interferència i manipulació governamental.', 
'A diferencia de las monedas fiat tradicionales (como el euro o el dólar), las criptomonedas generalmente no son emitidas por ninguna autoridad central, lo que las hace teóricamente inmunes a la interferencia y manipulación gubernamental.', 
'Unlike traditional fiat currencies (such as the euro or dollar), cryptocurrencies are generally not issued by any central authority, making them theoretically immune to government interference and manipulation.'),

('academia1_2_exerciciTitol', 
'Posa a prova els teus coneixements', 
'Pon a prueba tus conocimientos', 
'Test your knowledge'),

('academia1_2_pregunta1', 
'Quina tecnologia s''utilitza principalment per fer funcionar les criptomonedes?', 
'¿Qué tecnología se utiliza principalmente para hacer funcionar las criptomonedas?', 
'Which technology is mainly used to run cryptocurrencies?'),

('academia1_2_respostaA', 
'Intel·ligència Artificial', 
'Inteligencia Artificial', 
'Artificial Intelligence'),

('academia1_2_respostaB', 
'Blockchain (Cadena de blocs)', 
'Blockchain (Cadena de bloques)', 
'Blockchain'),

('academia1_2_respostaC', 
'Bases de dades tradicionals', 
'Bases de datos tradicionales', 
'Traditional databases'),

('academia1_2_btnSubmit', 
'Comprovar i Avançar', 
'Comprobar y Avanzar', 
'Check and Continue');

('academia1_3_logoAlt', 
'Logo SMXchange', 
'Logo SMXchange', 
'SMXchange Logo'),

('academia1_3_titolHeader', 
'Acadèmia - Criptomonedes i Blockchain', 
'Academia - Criptomonedas y Blockchain', 
'Academy - Cryptocurrencies and Blockchain'),

('academia1_3_btnInici', 
'Tornar a l''Inici', 
'Volver al Inicio', 
'Back to Home'),

('academia1_3_sidebarTitol', 
'Esquema del Curs', 
'Esquema del Curso', 
'Course Outline'),

('academia1_3_modulProgres', 
'Mòdul 1: Introducció', 
'Módulo 1: Introducción', 
'Module 1: Introduction'),

('academia1_3_progresPercent', 
'50% Completat', 
'50% Completado', 
'50% Completed'),

('academia1_3_modul1_1', 
'1.1. Introducció al Blockchain', 
'1.1. Introducción al Blockchain', 
'1.1. Introduction to Blockchain'),

('academia1_3_modul1_2', 
'1.2. Què és una criptomoneda?', 
'1.2. ¿Qué es una criptomoneda?', 
'1.2. What is a cryptocurrency?'),

('academia1_3_modul1_3', 
'1.3. Com funciona la mineria?', 
'1.3. ¿Cómo funciona la minería?', 
'1.3. How does mining work?'),

('academia1_3_modul1_4', 
'1.4. Inversió i riscos', 
'1.4. Inversión y riesgos', 
'1.4. Investment and risks'),

('academia1_3_titolContingut', 
'1.3. Com funciona la mineria?', 
'1.3. ¿Cómo funciona la minería?', 
'1.3. How does mining work?'),

('academia1_3_paragraf1', 
'La mineria és el procés pel qual s''afegeixen noves transaccions al blockchain. Els miners utilitzen ordinadors potents per resoldre problemes matemàtics complexos.', 
'La minería es el proceso mediante el cual se añaden nuevas transacciones al blockchain. Los mineros utilizan ordenadores potentes para resolver problemas matemáticos complejos.', 
'Mining is the process by which new transactions are added to the blockchain. Miners use powerful computers to solve complex mathematical problems.'),

('academia1_3_paragraf2', 
'El primer miner que resol el problema pot afegir el següent bloc a la cadena de blocs i rep una recompensa en forma de criptomonedes de nova creació i comissions de transacció.', 
'El primer minero que resuelve el problema puede añadir el siguiente bloque a la cadena de bloques y recibe una recompensa en forma de criptomonedas de nueva creación y comisiones de transacción.', 
'The first miner to solve the problem can add the next block to the blockchain and receives a reward in the form of newly created cryptocurrencies and transaction fees.'),

('academia1_3_exerciciTitol', 
'Posa a prova els teus coneixements', 
'Pon a prueba tus conocimientos', 
'Test your knowledge'),

('academia1_3_pregunta1', 
'Què reben els miners com a recompensa?', 
'¿Qué reciben los mineros como recompensa?', 
'What do miners receive as a reward?'),

('academia1_3_respostaA', 
'Diners tradicionals en efectiu', 
'Dinero tradicional en efectivo', 
'Traditional cash'),

('academia1_3_respostaB', 
'Noves criptomonedes', 
'Nuevas criptomonedas', 
'New cryptocurrencies'),

('academia1_3_respostaC',
'Res', 
'Nada', 
'Nothing'),

('academia1_3_btnSubmit', 
'Comprovar i Avançar', 
'Comprobar y Avanzar', 
'Check and Continue');

('academia1_4_logoAlt',
'Logo SMXchange', 
'Logo SMXchange', 
'SMXchange Logo'),

('academia1_4_titolHeader', 
'Acadèmia - Criptomonedes i Blockchain', 
'Academia - Criptomonedas y Blockchain', 
'Academy - Cryptocurrencies and Blockchain'),

('academia1_4_btnInici', 
'Tornar a l''Inici', 
'Volver al Inicio', 
'Back to Home'),

('academia1_4_sidebarTitol', 
'Esquema del Curs', 
'Esquema del Curso',
'Course Outline'),

('academia1_4_modulProgres', 
'Mòdul 1: Introducció', 
'Módulo 1: Introducción', 
'Module 1: Introduction'),

('academia1_4_progresPercent',
'75% Completat', 
'75% Completado', 
'75% Completed'),

('academia1_4_modul1_1', 
'1.1. Introducció al Blockchain', 
'1.1. Introducción al Blockchain', 
'1.1. Introduction to Blockchain'),

('academia1_4_modul1_2', 
'1.2. Què és una criptomoneda?', 
'1.2. ¿Qué es una criptomoneda?', 
'1.2. What is a cryptocurrency?'),

('academia1_4_modul1_3', 
'1.3. Com funciona la mineria?', 
'1.3. ¿Cómo funciona la minería?', 
'1.3. How does mining work?'),

('academia1_4_modul1_4', 
'1.4. Inversió i riscos', 
'1.4. Inversión y riesgos', 
'1.4. Investment and risks'),

('academia1_4_titolContingut', 
'1.4. Inversió i riscos', 
'1.4. Inversión y riesgos', 
'1.4. Investment and risks'),

('academia1_4_paragraf1', 
'Invertir en criptomonedes comporta riscos significatius degut a la seva alta volatilitat i la falta de regulació en molts mercats.', 
'Invertir en criptomonedas conlleva riesgos significativos debido a su alta volatilidad y la falta de regulación en muchos mercados.', 
'Investing in cryptocurrencies involves significant risks due to their high volatility and lack of regulation in many markets.'),

('academia1_4_paragraf2', 
'És fonamental fer la teva pròpia recerca (DYOR) i no invertir mai més del que et puguis permetre perdre.', 
'Es fundamental hacer tu propia investigación (DYOR) y no invertir nunca más de lo que puedas permitirte perder.', 
'It is essential to do your own research (DYOR) and never invest more than you can afford to lose.'),

('academia1_4_exerciciTitol', 
'Posa a prova els teus coneixements', 
'Pon a prueba tus conocimientos', 
'Test your knowledge'),

('academia1_4_pregunta1', 
'Què significa DYOR en l''entorn de les inversions?', 
'¿Qué significa DYOR en el entorno de las inversiones?', 
'What does DYOR mean in the context of investments?'),

('academia1_4_respostaA', 
'Fes la teva pròpia recerca (Do Your Own Research)', 
'Haz tu propia investigación (Do Your Own Research)', 
'Do Your Own Research'),

('academia1_4_respostaB', 
'Doble guany de rendibilitat', 
'Doble ganancia de rentabilidad', 
'Double return gain'),

('academia1_4_respostaC', 
'Diners i Organització Regular', 
'Dinero y Organización Regular', 
'Money and Regular Organization'),

('academia1_4_btnSubmit', 
'Finalitzar Curs', 
'Finalizar Curso', 
'Finish Course');

('atencioclient_titolPage', 
'SMXCHANGE – Atenció al Client', 
'SMXCHANGE – Atención al Cliente', 
'SMXCHANGE – Customer Support'),

('atencioclient_logoText', 
'SMXCHANGE', 
'SMXCHANGE', 
'SMXCHANGE'),

('atencioclient_navHistorial', 
'Historial', 
'Historial', 
'History'),

('atencioclient_navRanking', 
'Ranking', 
'Ranking', 
'Ranking'),

('atencioclient_navDonacions', 
'Donacions', 
'Donaciones',
'Donations'),

('atencioclient_navAtencio', 
'Atenció al Client', 
'Atención al Cliente', 
'Customer Support'),

('atencioclient_btnLogin', 
'Iniciar Sessió', 
'Iniciar Sesión',
'Log In'),

('atencioclient_heroTitol', 
'Atenció al Client', 
'Atención al Cliente', 
'Customer Support'),

('atencioclient_heroText', 
'El nostre equip d''especialistes et resoldrà qualsevol dubte sobre criptomonedes.', 
'Nuestro equipo de especialistas resolverá cualquier duda sobre criptomonedas.', 
'Our team of specialists will resolve any questions about cryptocurrencies.'),

('atencioclient_pillAll', 
'Tots els temes', 
'Todos los temas', 
'All topics'),

('atencioclient_pillCompte', 
'Compte i verificació', 
'Cuenta y verificación', 
'Account and verification'),

('atencioclient_pillDeposits', 
'Depòsits i retirades', 
'Depósitos y retiradas', 
'Deposits and withdrawals'),

('atencioclient_pillSeguretat', 
'Seguretat i 2FA', 
'Seguridad y 2FA', 
'Security and 2FA'),

('atencioclient_pillComissions', 
'Comissions', 
'Comisiones', 
'Fees'),

('atencioclient_pillTrading', 
'Trading i ordres', 
'Trading y órdenes', 
'Trading and orders'),

('atencioclient_cardSeguretat', 
'Seguretat del compte', 
'Seguridad de la cuenta',
'Account security'),

('atencioclient_cardSeguretatDesc', 
'2FA, accés bloquejat o activitat sospitosa.', 
'2FA, acceso bloqueado o actividad sospechosa.', 
'2FA, blocked access or suspicious activity.'),

('atencioclient_cardCrypto', 
'Transaccions crypto', 
'Transacciones crypto', 
'Crypto transactions'),

('atencioclient_cardCryptoDesc', 
'Seguiment d''enviaments, retards o errors d''adreça.', 
'Seguimiento de envíos, retrasos o errores de dirección.', 
'Tracking transfers, delays or address errors.'),

('atencioclient_cardFiat', 
'Fiat i pagaments', 
'Fiat y pagos', 
'Fiat and payments'),

('atencioclient_cardFiatDesc', 
'Ingressos bancaris, retirades en euros i SEPA.', 
'Ingresos bancarios, retiradas en euros y SEPA.', 
'Bank deposits, euro withdrawals and SEPA.'),

('atencioclient_cardKYC', 
'KYC i verificació', 
'KYC y verificación', 
'KYC and verification'),

('atencioclient_cardKYCDesc', 
'Documentació, nivells de compte i límits.', 
'Documentación, niveles de cuenta y límites.', 
'Documentation, account levels and limits.'),

('atencioclient_formTitol', 
'Envia una sol·licitud', 
'Envía una solicitud', 
'Submit a request'),

('atencioclient_inputNom',
'Nom', 
'Nombre', 
'Name'),

('atencioclient_inputCognoms', 
'Cognoms', 
'Apellidos',
 'Surname'),
 
('atencioclient_inputUsuari', 
'Usuari', 
'Usuario', 
'Username'),

('atencioclient_inputEmail', 
'Correu electrònic', 
'Correo electrónico', 
'Email'),

('atencioclient_selectCategoria', 
'Categoria del problema', 
'Categoría del problema', 
'Problem category'),

('atencioclient_optSeguretat', 
'Seguretat i accés al compte', 
'Seguridad y acceso a la cuenta', 
'Account security and access'),

('atencioclient_optCrypto', 
'Depòsit o retirada de crypto', 
'Depósito o retirada de crypto', 
'Crypto deposit or withdrawal'),

('atencioclient_optFiat', 
'Ingrés o retirada en euros', 
'Ingreso o retirada en euros',
'Euro deposit or withdrawal'),

('atencioclient_optKYC', 
'Verificació KYC', 
'Verificación KYC', 
'KYC verification'),

('atencioclient_optTrading', 
'Error en trading o ordres', 
'Error en trading u órdenes', 
'Trading or order error'),

('atencioclient_optFees', 
'Comissions i tarifes', 
'Comisiones y tarifas', 
'Fees and charges'),

('atencioclient_optAltres', 
'Altres consultes', 
'Otras consultas', 
'Other inquiries'),

('atencioclient_textarea', 
'Descriu el problema amb detall. Inclou IDs de transacció si en tens.', 
'Describe el problema con detalle. Incluye IDs de transacción si los tienes.', 
'Describe the problem in detail. Include transaction IDs if available.'),

('atencioclient_btnEnviar', 
'Enviar sol·licitud', 
'Enviar solicitud', '
Submit request'),

('atencioclient_okTitol', 
'Sol·licitud enviada!',
'¡Solicitud enviada!', 
'Request sent!'),

('atencioclient_okText', 
'Et respondrem al correu en menys de 2 hores.', 
'Te responderemos por correo en menos de 2 horas.', 
'We will reply by email in less than 2 hours.'),

('atencioclient_btnNou', 
'Nou missatge', 
'Nuevo mensaje', 
'New message'),

('atencioclient_serveiTitol', 
'Estat del servei', 
'Estado del servicio', 
'Service status'),

('atencioclient_livechat', 
'Xat en viu', 
'Chat en vivo', 
'Live chat'),

('atencioclient_disponible', 
'Disponible ara', 
'Disponible ahora', 
'Available now'),

('atencioclient_email', 
'Correu electrònic', 
'Correo electrónico', 
'Email'),

('atencioclient_phone', 
'Telèfon (Pro)', 
'Teléfono (Pro)', 
'Phone (Pro)'),

('atencioclient_horariTitol', 
'Horari d''atenció', 
'Horario de atención', 
'Support hours'),

('atencioclient_dilluns', 
'Dill. – Div.', 
'Lun. – Vie.', 
'Mon – Fri'),

('atencioclient_dissabte', 
'Dissabte', 
'Sábado', 
'Saturday'),

('atencioclient_diumenge', 
'Diumenge', 
'Domingo', 
'Sunday'),

('atencioclient_tancat', 
'Tancat', 
'Cerrado',
'Closed'),

('atencioclient_suportTecnic', 
'Suport tècnic', 
'Soporte técnico', 
'Technical support'),

('atencioclient_altresCanals', 
'Altres canals', 
'Otros canales', 
'Other channels'),

('atencioclient_chat', 
'Xat en viu', 
'Chat en vivo', 
'Live chat'),

('atencioclient_chatSub', 
'Resposta immediata', 
'Respuesta inmediata', 
'Instant response'),

('atencioclient_telegram', 
'Telegram oficial', 
'Telegram oficial', 
'Official Telegram'),

('atencioclient_centreAjuda', 
'Centre d''ajuda', 
'Centro de ayuda', 
'Help center'),

('atencioclient_centreAjudaSub', 
'Guies i tutorials', 
'Guías y tutoriales', 
'Guides and tutorials'),

('atencioclient_faqTitol', 
'Preguntes freqüents', 
'Preguntas frecuentes', 
'Frequently asked questions'),

('atencioclient_faq1', 
'Com puc recuperar l''accés si he perdut el 2FA?', 
'¿Cómo puedo recuperar el acceso si he perdido el 2FA?', 
'How can I recover access if I lost 2FA?'),

('atencioclient_faq1_resp', 
'Obre un tiquet seleccionant "Seguretat i accés al compte". Hauràs de verificar la teva identitat amb DNI o passaport i el correu de registre. El procés dura entre 24 i 48 hores laborables.', 
'Abre un ticket seleccionando "Seguridad y acceso a la cuenta". Deberás verificar tu identidad con DNI o pasaporte y el correo de registro. El proceso dura entre 24 y 48 horas laborables.', 
'Open a ticket selecting "Account security and access". You will need to verify your identity with ID or passport and your registered email. The process takes 24–48 business hours.'),

('atencioclient_faq2', 'Quant tarda una retirada de Bitcoin a arribar?', '¿Cuánto tarda una retirada de Bitcoin en llegar?', 'How long does a Bitcoin withdrawal take?'),
('atencioclient_faq2_resp', 'Les retirades de BTC s''envien a la xarxa en un màxim de 30 minuts. El temps fins a la confirmació depèn de la congestió: normalment entre 10 minuts i 2 hores.', 'Las retiradas de BTC se envían a la red en un máximo de 30 minutos. El tiempo de confirmación depende de la congestión: normalmente entre 10 minutos y 2 horas.', 'BTC withdrawals are sent to the network within 30 minutes. Confirmation time depends on congestion: usually between 10 minutes and 2 hours.'),
('atencioclient_faq3', 'Per què el meu dipòsit en euros no apareix?', '¿Por qué mi depósito en euros no aparece?', 'Why is my euro deposit not showing?'),
('atencioclient_faq3_resp', 'Els ingressos SEPA es processen en 1-2 dies hàbils. Assegura''t d''haver inclòs la referència correcta. Si han passat més de 3 dies, obre un tiquet adjuntant el justificant bancari.', 'Los ingresos SEPA se procesan en 1-2 días hábiles. Asegúrate de haber incluido la referencia correcta. Si han pasado más de 3 días, abre un ticket adjuntando el justificante bancario.', 'SEPA deposits are processed in 1–2 business days. Make sure you included the correct reference. If more than 3 days have passed, open a ticket with proof of payment.'),
('atencioclient_faq4', 'Com puc augmentar els límits del meu compte?', '¿Cómo puedo aumentar los límites de mi cuenta?', 'How can I increase my account limits?'),
('atencioclient_faq4_resp', 'Completa la verificació KYC de nivell 2 (DNI/NIE + selfie + justificant d''adreça). Un cop verificat, els límits s''amplien automàticament en 24 hores.', 'Completa la verificación KYC de nivel 2 (DNI/NIE + selfie + justificante de dirección). Una vez verificado, los límites se amplían automáticamente en 24 horas.', 'Complete KYC level 2 verification (ID + selfie + proof of address). Once verified, limits are increased automatically within 24 hours.'),
('atencioclient_faq5', 'Quines comissions cobreu per les transaccions?', '¿Qué comisiones cobráis por las transacciones?', 'What fees do you charge for transactions?'),
('atencioclient_faq5_resp', 'El maker és del 0.1% i el taker del 0.2% per als comptes estàndard. Els comptes Pro disposen de tarifes regressives. Consulta la pàgina de tarifes per als detalls complets.', 'El maker es del 0.1% y el taker del 0.2% para cuentas estándar. Las cuentas Pro tienen tarifas decrecientes. Consulta la página de tarifas para más detalles.', 'Maker fee is 0.1% and taker fee is 0.2% for standard accounts. Pro accounts have reduced fees. Check the fee page for full details.');
('cookies_titolPage', 'Política de Cookies - CryptoSite', 'Política de Cookies - CryptoSite', 'Cookie Policy - CryptoSite'),
('cookies_titolPrincipal', 'Política de Cookies', 'Política de Cookies', 'Cookie Policy'),
('cookies_intro', 'En CryptoSite utilitzem cookies per millorar la teva experiència i analitzar l''ús de la nostra web de criptomonedes.', 'En CryptoSite utilizamos cookies para mejorar tu experiencia y analizar el uso de nuestra web de criptomonedas.', 'At CryptoSite we use cookies to improve your experience and analyze the use of our cryptocurrency website.'),
('cookies_sec1_titol', 'Què són les cookies?', '¿Qué son las cookies?', 'What are cookies?'),
('cookies_sec1_text', 'Les cookies són petits arxius que s''emmagatzemen al teu dispositiu quan visites una pàgina web.', 'Las cookies son pequeños archivos que se almacenan en tu dispositivo cuando visitas una página web.', 'Cookies are small files stored on your device when you visit a website.'),
('cookies_sec2_titol', 'Tipus de cookies que fem servir', 'Tipos de cookies que usamos', 'Types of cookies we use'),
('cookies_sec2_item1', 'Cookies tècniques: Necessàries per al funcionament de la web.', 'Cookies técnicas: Necesarias para el funcionamiento de la web.', 'Technical cookies: Necessary for the website to function.'),
('cookies_sec2_item2', 'Cookies d''anàlisi: Ens ajuden a entendre com utilitzes la web.', 'Cookies de análisis: Nos ayudan a entender cómo usas la web.', 'Analytics cookies: Help us understand how you use the website.'),
('cookies_sec2_item3', 'Cookies de personalització: Milloren la teva experiència.', 'Cookies de personalización: Mejoran tu experiencia.', 'Personalization cookies: Improve your experience.'),
('cookies_sec3_titol', 'Com gestionar les cookies', 'Cómo gestionar las cookies', 'How to manage cookies'),
('cookies_sec3_text', 'Pots configurar o desactivar les cookies des del teu navegador en qualsevol moment.', 'Puedes configurar o desactivar las cookies desde tu navegador en cualquier momento.', 'You can configure or disable cookies from your browser at any time.'),
('cookies_btnAccept', 'Acceptar', 'Aceptar', 'Accept'),
('cookies_btnReject', 'Rebutjar', 'Rechazar', 'Reject'),
('cookies_footer', '© 2026 CryptoSite', '© 2026 CryptoSite', '© 2026 CryptoSite');
('forgot_titolPage', 'Heu oblidat la contrasenya?', '¿Has olvidado la contraseña?', 'Forgot your password?'),
('forgot_titolHeader', 'Restableix la contrasenya', 'Restablecer la contraseña', 'Reset your password'),
('forgot_inputUsuari', 'Usuari', 'Usuario', 'Username'),
('forgot_infoPassword', '6 caràcters com a mínim, distingeix majúscules de minúscules', '6 caracteres como mínimo, distingue mayúsculas de minúsculas', 'At least 6 characters, case sensitive'),
('forgot_inputPassword', 'Escriu la nova contrasenya', 'Escribe la nueva contraseña', 'Enter the new password'),
('forgot_msgSpot', '', '', ''),
('forgot_btnCancel', 'Cancel·lar', 'Cancelar', 'Cancel'),
('forgot_btnConfirm', 'Confirma', 'Confirmar', 'Confirm');
('login_titolPage', 'SMXCHANGE', 'SMXCHANGE', 'SMXCHANGE'),
('login_titolHeader', 'Inici de sessió', 'Inicio de sesión', 'Login'),
('login_inputUsuari', 'Usuari', 'Usuario', 'Username'),
('login_inputPassword', 'Contrasenya', 'Contraseña', 'Password'),
('login_linkForgot', 'Has oblidat la teva contrasenya?', '¿Has olvidado tu contraseña?', 'Forgot your password?'),
('login_btnSubmit', 'Iniciar Sessió', 'Iniciar Sesión', 'Log In'),
('login_noAccount', 'No tens un compte?', '¿No tienes una cuenta?', 'Don’t have an account?'),
('login_linkRegister', 'Registra''t', 'Regístrate', 'Sign up'),
('login_msgError', 'Usuari o contrasenya incorrectes', 'Usuario o contraseña incorrectos', 'Invalid username or password'),
('login_msgEmpty', 'Omple tots els camps', 'Rellena todos los campos', 'Please fill in all fields'),
('login_msgSpot', '', '', '');
('home_titolPage', 'SMXCHANGE', 'SMXCHANGE', 'SMXCHANGE'),
('home_menuHistorial', 'Historial', 'Historial', 'History'),
('home_menuRanking', 'Ranking', 'Ranking', 'Ranking'),
('home_menuDonacions', 'Donacions', 'Donaciones', 'Donations'),
('home_heroTitol', 'El teu portal de criptomonedes', 'Tu portal de criptomonedas', 'Your cryptocurrency portal'),
('home_heroText', 'Consulta preus en temps real, aprèn trading i segueix les principals monedes del mercat.', 'Consulta precios en tiempo real, aprende trading y sigue las principales monedas del mercado.', 'Check real-time prices, learn trading and follow the main market coins.'),
('home_stat1_titol', '20+', '20+', '20+'),
('home_stat1_text', 'Criptomonedes', 'Criptomonedas', 'Cryptocurrencies'),
('home_stat2_titol', 'Temps real', 'Tiempo real', 'Real-time'),
('home_stat2_text', 'Preus actualitzats', 'Precios actualizados', 'Updated prices'),
('home_stat3_titol', 'SMX', 'SMX', 'SMX'),
('home_stat3_text', 'Plataforma educativa', 'Plataforma educativa', 'Educational platform'),
('home_cryptoSection', 'Monedes populars', 'Monedas populares', 'Popular coins'),
('home_tableMoneda', 'Moneda', 'Moneda', 'Coin'),
('home_tablePreu', 'Preu', 'Precio', 'Price'),
('home_table24h', '24h', '24h', '24h'),
('home_trackingTitol', 'Panell de seguiment en temps real', 'Panel de seguimiento en tiempo real', 'Real-time tracking panel'),
('home_trackingFooter', 'Dades de', 'Datos de', 'Data from'),
('home_academiaTitol', 'Academia', 'Academia', 'Academy'),
('home_academiaText', 'Domina el món cripte des de zero fins a nivell avançat.', 'Domina el mundo cripto desde cero hasta nivel avanzado.', 'Master the crypto world from beginner to advanced level'),
('home_academiaBtn', 'Accedeix al curs', 'Accede al curso', 'Access the course');
('portada_titolPage', 'SMXchange', 'SMXchange', 'SMXchange'),
('portada_menuHistorial', 'Historial', 'Historial', 'History'),
('portada_menuRanking', 'Ranking', 'Ranking', 'Ranking'),
('portada_menuDonacions', 'Donacions', 'Donaciones', 'Donations'),
('portada_btnLogin', 'Iniciar Sessió', 'Iniciar Sesión', 'Log In'),
('portada_heroTitol', 'El poder de les criptomonedes en les teves mans', 'El poder de las criptomonedas en tus manos', 'The power of cryptocurrencies in your hands'),
('portada_heroText', 'Uneix-te a una nova economia digital amb la seguretat i confiança de SMXCHANGE', 'Únete a una nueva economía digital con la seguridad y confianza de SMXCHANGE', 'Join a new digital economy with the security and trust of SMXCHANGE'),
('portada_btnStart', 'Comença ara', 'Empieza ahora', 'Get started');
('register_titolPage', 'Crear un compte', 'Crear una cuenta', 'Create an account'),
('register_inputNom', 'Nom', 'Nombre', 'First name'),
('register_inputCognom', 'Cognom', 'Apellido', 'Last name'),
('register_inputUsuari', 'Usuari', 'Usuario', 'Username'),
('register_inputTelefon', 'Número de telèfon', 'Número de teléfono', 'Phone number'),
('register_inputEmail', 'Correu electrònic', 'Correo electrónico', 'Email'),
('register_inputPassword1', 'Contrasenya', 'Contraseña', 'Password'),
('register_inputPassword2', 'Confirma la contrasenya', 'Confirma la contraseña', 'Confirm password'),
('register_btnSubmit', 'Registra''t', 'Regístrate', 'Sign up'),
('register_loginText', 'Ja tens un compte?', '¿Ya tienes una cuenta?', 'Already have an account?'),
('register_loginLink', 'Inicia sessió', 'Inicia sesión', 'Log in'),
('register_popupText', 'Missatge', 'Mensaje', 'Message'),
('register_popupBtn', 'Acceptar', 'Aceptar', 'Accept');

commit;