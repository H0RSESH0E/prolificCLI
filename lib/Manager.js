const inquirer = require('inquirer');
const Employee = require('./Employee');

class Manager extends Employee {
    constructor() {
        super();
    }
    getOfficeNumber() {
        return inquirer
        .prompt({
            type: 'input',
            message: "What is your office number?",
            name: 'userResponse',
        })
        .then(({ userResponse }) => {
            this.officeNumber = userResponse;
        });
    }

    getRole() {
        return "Manager";
    }
}
module.exports = Manager;