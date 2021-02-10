USE company_db;

INSERT INTO department (name)
 VALUES
('Sales'),
('Finance'),
('Tech'),
('Operations'),
('Human Resources');

SELECT * FROM department;


INSERT INTO employee (first_name, last_name, role_id, manager_id)
 VALUES
("John", "Appleseed", 2, 1),
("Betty", "Crocker", 1, 1), 
("Peter", "Pan", 3, 2),
("Bill", "Gates", 4, 1),
("Steve", "Jobs", 4, 4),
("Jax", "Tocionis", 5, 1);

SELECT * FROM employee;

INSERT INTO role (title, salary, department_id) 
VALUES 
("Sales Rep", 50000, 1), 
("Manager", 65000, 4),
("Accountant", 60000, 2),
('Software Engineer', 80000, 3),
('HR Associate', 50000, 5),
('Regional Manager', 100000, 4),
('Associate', 450000, 1);

SELECT * FROM role;