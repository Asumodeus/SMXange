CREATE TABLE alumn (
    id_alumne INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    password VARCHAR(50)
);

-- Dades d'exemple per a poguer fer alguna cosa
INSERT INTO alumn (id_alumne, first_name, password) VALUES 
    (1, 'Waverly', "321"),
    (2, 'Adelind', "123"),
    (3, 'Godfrey', "632"),
    (4, 'Chrysler', "931"),
    (5, 'Englebert', "leomessi"),
    (6, 'Blancha', "900"),
    (7, 'Albert', "159"),
    (8, 'Zacherie', "159"),
    (9, 'Bryana', "500"),
    (10, 'Bogart', "802");