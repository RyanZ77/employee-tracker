const connection = require('./db/connection.js');
const inquirer = require("inquirer");

function start() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "userInput",
                choices: [
                    "View Departments",
                    "View Roles",
                    "View Employees",
                    "Add Department",
                    "Add Role",
                    "Add Employee",
                    "Update Employee Role"
                ]
            }
        ])
        .then(function ({ userInput }) {

            switch (userInput) {
                case "View Departments":
                    getAlldepartments();
                    break;

                case "View Roles":
                    getAllroles();
                    break;

                case "View Employees":
                    getAllemployees();
                    break;

                case "Add Department":
                    addDepartments();
                    break;

                case "Add Role":
                    addRoles();
                    break;

                case "Add Employee":
                    addEmployees();
                    break;

                case "Update Employee Role":
                    updateRole();
                    break;
            }
        })
}

function getAlldepartments() {
    return connection.query('SELECT * FROM department')
        .then(results => {
            console.table(results);
            endProgram();
        })
        .catch(err => console.log(err))
};

function getAllroles() {
    return connection.query('SELECT * FROM roles')
        .then(results => {
            console.table(results)
            endProgram();
        })
        .catch(err => console.log(err))
};

function getAllemployees() {
    return connection.query('SELECT * FROM employees')
        .then(results => {
            console.table(results)
            endProgram();
        })
        .catch(err => console.log(err))
};

function addDepartments() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the name of this Department?",
                name: "names"
            }
        ])
        .then(function ({ names }) {

            connection.query('INSERT INTO department SET ?', { names: names })
                .then(console.log(names, "Has been added to Department"))
                .catch(err => console.log(err))

        endProgram();
        })

};

function addRoles() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the name of this Role?",
                name: "title"
            }
        ])
        .then(function ({ title }) {
            connection.query('INSERT INTO roles SET ?', { title: title })
                .then(console.log(title, "Has been added to Roles"))
                .catch(err => console.log(err))

        endProgram();
        })
};

function addEmployees() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the first name of this employee?",
                name: "first_name"
            },
            {
                type: "input",
                message: "What is the last name of this employee?",
                name: "last_name"
            },
            {
                type: "input",
                message: "What is the role ID of this employee?",
                name: "role_id"
            },
            {
                type: "list",
                message: "Does this employee have a manager?",
                name: "hasManager",
                choices: [
                    "Yes",
                    "No"
                ]
            },
            {
                type: "input",
                message: "What is the ID of this employee's manager?",
                name: "manager_id",

                when: function (data) {
                    return data.hasManager === "Yes";
                }
            }
        ])

        .then(function (data) {
            if (data.hasManager === 'Yes') {
                connection.query('INSERT INTO employees SET ?',
                    {
                        first_name: data.first_name,
                        last_name: data.last_name,
                        role_id: data.role_id,
                        manager_id: data.manager_id
                    })

                    .then(console.log(data.first_name, "has been added to Employees!"))

                    .catch(error => console.log(error))

                endProgram();
            }
            else {

                connection.query('INSERT INTO employees SET ?',
                    {
                        first_name: data.first_name,
                        last_name: data.last_name,
                        role_id: data.role_id,
                    })

                    .then(console.log(data.first_name, "has been added to Employees!"))
                    .catch(error => console.log(error))

                endProgram();
            }
        })
};

start()