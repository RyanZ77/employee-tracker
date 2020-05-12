DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    names VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
    -- sales, engineering, finance
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    PRIMARY KEY (id)
    -- salary DECIAML,
    -- deparment_id INT NOT NULL AUTO_INCREAMENT
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_Id INT,
    manager_Id INT,
    PRIMARY KEY (id)
);

INSERT INTO department (names)
VALUES ("Sales");
INSERT INTO department (names)
VALUES ("Engineering");
INSERT INTO department (names)
VALUES ("Finance");

INSERT INTO roles (title)
VALUES ("Sales Lead");
INSERT INTO roles (title)
VALUES ("Software Engineer");
INSERT INTO roles (title)
VALUES ("Accountant");
INSERT INTO roles (title)
VALUES ("Lead Engineer");

INSERT INTO employees (first_name, last_name)
Values ("Ezio", "Auditore");
INSERT INTO employees (first_name, last_name)
Values ("Haythem", "Kenway");
INSERT INTO employees (first_name, last_name)
Values ("Shay", "Cormac");
