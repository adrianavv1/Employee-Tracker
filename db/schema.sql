/* Schema for SQL database/table. We haven't discussed this type of file yet */
DROP DATABASE IF EXISTS company_DB;

/* Create database */
CREATE DATABASE company_DB;
USE company_DB;

/* Create new table with a primary key that auto-increments, and a text field */
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
  -- FOREIGN KEY (department_id) REFERENCE department(id) ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL,
  PRIMARY KEY (id)
  -- FOREIGN KEY (role_id) REFERENCE role(id),
  -- FOREIGN KEY (manager_id) REFERENCE employee(id) ON DELETE SET NULL 
);

