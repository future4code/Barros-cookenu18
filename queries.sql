-- Active: 1674082121776@@35.226.146.116@3306@jbl-4416323-jessica-lima
CREATE TABLE users_cookenu (
	id VARCHAR(255) PRIMARY KEY, 
    name VARCHAR(255) NULL, 
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

DROP TABLE users_cookenu;
ALTER TABLE users_cookenu ADD role ENUM("ADMIN", "NORMAL") NOT NULL DEFAULT "NORMAL";

CREATE TABLE recipes_cookenu (
	id VARCHAR(255) PRIMARY KEY, 
    title VARCHAR(255) NOT NULL, 
    description TEXT NOT NULL,
    creation_date date NOT NULL,
    id_author VARCHAR(255),
    FOREIGN KEY (id_author) REFERENCES users_cookenu(id)
);

SELECT * FROM recipes_cookenu;
SELECT * FROM users_cookenu;


