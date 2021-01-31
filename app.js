//Dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const dotenv = require('dotenv').config();
const cTable = require('console.table');
const { start } = require('repl');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'u3Sp6M28xr!',
    database: 'db_name'
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
                case ""
            }
        }
}
