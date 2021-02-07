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
    let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, e2.first_name AS manager FROM employee LEFT JOIN employee as e2 ON e2.id = employee.manager_id JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;";
    connection.query(query, function(err, res) {
      if (err) throw err;
         console.table(res);
         start();
    })
};

function viewRoles () {
    let query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
      if (err) throw err;
         console.table(res);
         start();
    })
};

function viewAllDepartment () {
    let query = "SELECT * FROM department;";
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
        console.log(answer.managerId);
        let query = "SELECT * FROM employee WHERE manager_id = " + answer.managerId + ";";
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
        let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, e2.first_name AS manager FROM employee LEFT JOIN employee as e2 ON e2.id = employee.manager_id JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE department.name = ? ORDER BY employee.id" + answer.department + ";"
        connection.query(query, function(err, res) {
            if (err) throw err;
            console.table(res);
            start();
        })
    });
}

function addEmployee () {
    let newEmployee = {};
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;

    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employees last name?"

        
        },
        {
            type: "list",
            name: "role",
            message: "What is their role?",
            choices: function () {
                let choiceArray = [];
                for (var i = 0; i < result.length; i++) {
                    choiceArray.push(res[i].title);
                }
                return choiceArray;
            }
        }

    ]).then(answer => {
        
        newEmployee.first_name = answer.first_name;
        newEmployee.last_name = answer.last_name;

        connection.query('SELECT * FROM role WHERE title = ?', answer.role, function (err, res) {
            if (err) throw err;

            newEmployee.role_id = res[0].id;

            connection.query('SELECT * FROM employee;', function (err,res) {
                if (err) throw err;

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'manager_name',
                        message: "Who is the employee's Manager?",
                        choices: function () {
                            let choiceArray = [];
                            for (var i =0; i < result.length; i++) {
                                choiceArray.push(res[i].first_name);
                            }
                            return choiceArray;
                        }
                    }
                ]).then(function (answer) {
                    connection.query('SELECT id FROM employee WHERE first_name = ?', answer.manager_name, function (err, res) {
                        if (err) throw err;
                        newEmployee.managerId = res[0].id;
                        console.log('Great! New employee added: ', newEmployee);

                        connection.query( 'INSERT INTO employee SET ?', newEmployee, function (err,res) {
                            if (err) throw err;
                            console.log('Employee successfully added.');
                            start();
                        })
                    })
                });
            });
        });
    })    



})
};

function addRoles() {
    inquirer.prompt([
        {
            type: "input",
            name: "role_title",
            message: "What is the role you would like to add?",
        },
        {
            type: "input",
            name: "salary",
            message: "What is their yearly salary?"
        },
        {
            type: "list",
            name: "dept_name",
            message: "What is the role's department?",
            choices: function () {
                let choiceArray = [];
                for (var i = 0; i < result.length; i++) {
                    choiceArray.push(result[i].name);
                }
                return choiceArray;
            }
        }
    ]).then(answer => {

        newRole.title = answer.role_title;
        newRole.salary = answer.salary;

        connection.query( 'SELECT id FROM department WHERE name = ?', answer.dept_name, function(err, res) {
            if (err) throw err;
            newRole.department_id = res[0].id;
            console.log("Adding new role: ", newRole);

            connection.query('INSERT INTO role SET ?', newRole, function (err, res) {
                if (err) throw err;
                console.log('Role was successfully added.');
                start();
            });
             
        })
        });

        
}

function addDepartment() {
    
        inquirer.prompt([
            {
                type: "input",
                name: "dept_name",
                message: "What department will you be adding today?"
            }
        ]).then(answer => {
            let query = "INSERT INTO department (name) VALUES (?)" + answer.dept_name + ";";
            connection.query(query, function(err, res) {
            if (err) throw err;
                console.log('Department successfully added.');
                start();
            })
        });
    
    
    }

//Remove//
function removeEmployee() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'removeEmployee',
            message: 'Which Employee woukd you like to remove?',
            choices: function () {
                let choiceArray = [];
                for (var i = 0; i < result.length; i++) {
                    choiceArray.push(result[i].first_name);
                }
                return choiceArray;
            }
        }
    ]).then(answer => {
        let query = 'SELECT * FROM employee' + answer.removeEmployee + ";"
        connection.query(query, function(err, res) {
            if (err) throw err;
            console.log('Employee has now been deleted.');
            start();
        });
    })
}    

function updateRole() {
    
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, e2.first_name AS manager FROM employee LEFT JOIN employee AS e2 ON e2.id = employee.manager_id JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id', function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'list',
                name: 'updateEmployee',
                message: 'Which employee would you like to update?',
                choices: function () {
                    for (var i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].first_name);
                    }
                    return choiceArray;
                }
            }
        ]).then(answer => {

            newRole.first_name = answer.updateEmployee;

            connection.query('SELECT * FROM role', function (err,res) {
                if (err) throw err;
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'updateRole',
                        message: 'What is their new role?',
                        choices: function () {
                            let choiceArray = [];
                            for (var i = 0; i < res.length; i++) {
                                choiceArray.push(res[i].title);
                            }
                            return choiceArray;
                        }
                    }
                ]).then(answer => {
                    let query = 'SELECT * FROM role WHERE title = ?' + answer.updateRole + ";" ;
                    connection.query = function (err, res) {
                        if (err) throw err;

                        newRole.role_id = res[0].id;

                        let query = 'UPDATE employee SET role_id = ? WHERE first_name = ?' + newRole.role_id + newRole.first_name + ";" ;
                        connection.query = function (err, res) {
                            if (err) throw err;
                            console.log('Employee role succesfully updated.');
                            start();
                        }
                    };
                    

                });
            });
        });
    });
   

};

function updateManager() {

    connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, e2.first_name AS manager FROM employee LEFT JOIN employee AS e2 ON e2.id = employee.manager_id JOIN role ON employee.role_id = role.id JOIN department_id = department.id ORDER BY employee.id', function(err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'list',
                name: 'updateManager',
                message: 'Who would you like to change their manager to?',
                choices: function () {
                    let choiceArray = [];
                    for (var i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].first_name);
                    }
                    return choiceArray;
                }
            }
        ]).then(answer => {
            let query = 'SELECT * FROM employee WHERE first_name = ?' + answer.updateManager + ";";
            connection.query = function (err, res) {
                if (err) throw err;
                console.log('Employee manager successfully updated.');
            }
        
        })
    });
};

function removeRole () {
    inquirer.prompt([
        {
            type: 'list',
            name: 'removeRole',
            message: 'Which role would you like to remove?',
            choices: function () {
                let choiceArray = [];
                for (var i = 0; i < result.length; i++) {
                    choiceArray.push(result[i].first_name);
                }
                return choiceArray;
            }
        }
    ]).then(answer => {
        let query = 'DELETE FROM role WHERE title = ?' + answer.removeRole + ";"
        connection.query(query, function(err, res) {
            if (err) throw err;
            console.log('Role has now been deleted.');
            start();
        });
    })
};

function removeDepartment () {
    inquirer.prompt([
        {
            type: 'list',
            name: 'removeDepartment',
            message: 'Which department would you like to remove?',
            choices: function () {
                let choiceArray = [];
                for (var i = 0; i < result.length; i++) {
                    choiceArray.push(result[i].first_name);
                }
                return choiceArray;
            }
        }
    ]).then(answer => {
        let query = 'DELETE FROM department WHERE name = ?' + answer.removeDepartment + ";"
        connection.query(query, function(err, res) {
            if (err) throw err;
            console.log('Department has now been deleted.');
            start();
        });
    })
};

start();