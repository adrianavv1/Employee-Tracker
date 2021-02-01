//Dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const dotenv = require('dotenv').config();
require('console.table');
// const { start } = require('repl');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'u3Sp6M28xr!',
    database: 'company_DB'
});

// connection.connect(function(err) {
//     if (err) throw err;
//     start();
// });

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
                    break;
                case 'View ALL Employees by Manager.':
                    viewAllEmployeesByManager();
                    break;
                case 'View ALL Departments' :
                    viewAllDepartment();

                    break;
                default:
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
    })
}



start();