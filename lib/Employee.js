const inquirer = require('inquirer');

class Employee {
    constructor() {
    }
    getName() {
        return inquirer
            .prompt({
                type: 'input',
                message: "What is the employee's name?",
                name: 'userResponse',
            })
            .then(({ userResponse }) => {
                this.name = userResponse;
            });
    }

    getId() {
        return inquirer
        .prompt({
            type: 'input',
            message: "What is the employee's ID number?",
            name: 'userResponse',
        })
        .then(({ userResponse }) => {
            this.id = userResponse;
        });
    }

    getEmail() {
        return inquirer
        .prompt({
            type: 'input',
            message: "What is the employee's email address?",
            name: 'userResponse',
        })
        .then(({ userResponse }) => {
            this.email = userResponse;
        });
    }

    getRole() {
        return inquirer
        .prompt({
            type: 'input',
            message: "What is the employee's role?",
            name: 'userResponse',
        })
        .then(({ userResponse }) => {
            this.role = userResponse;
        });
    }
}

module.exports = Employee;