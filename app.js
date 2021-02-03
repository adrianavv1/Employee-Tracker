//Dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
require('console.table');


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'u3Sp6M28xr!',
    database: 'company_DB'
});

 connection.connect(function(err) {
    if (err) throw err;
     start();
 });

function start() {
    inquirer
        .prompt({
           name: 'action',
           type: 'list',
           message: 'Welcome! Select any options below.',
           choices: [
               'View ALL Employees.',
               'View ALL Employess by Department.',
               'View ALL Employees by Manager.',
               'View ALL Departments',
               'Add Employee.',
               'Remove Employee.',
               'Update Employee Role',
               'Update Employee Manager',
               'Add Role',
               'Delete Role',
               'Add Department',
               'Delete Department',
               'Add Employee',
               'Delete Employee',
               'Exit'

           ] 
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View ALL Employees.":
                    viewAllEmployees();
                    break;

                case "View ALL Employees by Department":
                    viewAllEmployeesDept();
                    break;

                case "View ALL Employees by Manager.":
                    viewAllEmployeesByManager();
                    break;

                case "View ALL Departments":
                    viewAllDepartment();
                    break;
                
                case "Add Department":
                    addDepartment();
                    break;

                case "Remove Department":
                    removeDepartment();
                    break;

                case "Add Employee":
                    addEmployee();    
                    break;

                case "Update Employee Role":
                    updateEmployee();
                    break;
                    
                case "Update Employee Manager":
                    updateManager();
                    break;
                    
                case "Remove Employee":
                    removeEmployee();
                    break;
                    
                case "View ALL Roles":
                    viewRoles();
                    break;

                case "Add Role":
                    addRoles();
                    break;
                    
                case "Remove Role":
                    removeRole();
                    break;

                case "EXIT":
                connection.end();
                break;
            }
        })
}


function viewAllEmployees () {
    var query = "SELECT * FROM employee;";
    connection.query(query, function(err, res) {
      if (err) throw err;
         console.table(res);
         start();
    })
};

function viewRoles () {
    var query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
      if (err) throw err;
         console.table(res);
         start();
    })
};

function viewAllDepartment () {
    var query = "SELECT * FROM department;";
    connection.query(query, function(err, res) {
      if (err) throw err;
         console.table(res);
         start();
    })
};

function viewAllEmployeesByManager () {
    inquirer.prompt([
        {
            type: "input",
            name: "managerId",
            message: "Please enter the manager's id:"
        }
    ]).then(answer => {
        var query = "SELECT * FROM employee WHERE manager_id = " + answer.managerId + ";";
        connection.query(query, function(err, res) {
        if (err) throw err;
            console.table(res);
            start();
        })
    });


}

function viewAllEmployeesDept() {
    inquirer.prompt([
        {
            type:"list",
            name: "department",
            message: "Which department would you like to look into?"
        }
    ])
    .then(answer => {
        var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, e2.first_name AS manager FROM employee LEFT JOIN employee as e2 ON e2.id = employee.manager_id JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE department.name = ? ORDER BY employee.id" + answer.department + ";"
        connection.query(query, function(err, res) {
            if (err) throw err;
            console.table(res);
            start();
        })
    });
}





start();