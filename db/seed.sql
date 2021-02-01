USE company_DB;

INSERT INTO department (name) VALUES ('Sales'), ('Finance'), ('Tech');

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("John", "Appleseed", 2, 1), ("Betty", "Crocker", 1, 1), ("Peter", "Pan", 3, 3);

INSERT INTO role (title, salary, department_id) VALUES ("Salesperson", 12.00, 1), ("Manager", 20.00, 1);