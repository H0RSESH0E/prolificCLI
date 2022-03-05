const inquirer = require('inquirer');

const Manager = require('../lib/Manager');
const Engineer = require('../lib/Engineer');
const Intern = require('../lib/Intern');

var trackingNumber = 0;

const timeStamp = () => {
    let options = {
        year: "numeric",
        month: "long",
        weekday: "long",
        hour: "numeric",
        minute: "numeric"
    };

    return Intl.DateTimeFormat('en-US', options).format(Date.now());
}

class Process {
    constructor() {
        this.date = timeStamp();
        this.roster = [];
    }

    initialize() {
        this.userInputEmployeeDetails('Manager')
            .then(response => {
                console.log("here we are!!!!", response);
                this.manager = response;
                this.roster.push(this.manager);
                this.cycler();
            })
    }

    cycler() {
        console.log("in the CYCLER");

        this.chooseEmployeeType()
            .then(({ userResponse }) => {
                console.log("HERERERERERERERER", userResponse);

                if (userResponse  === "I'm finished building the team.") {
                    console.log("CONCLUSION", userResponse);
                    return

                } else {
                    this.userInputEmployeeDetails(userResponse)
                        .then(response => {
                            console.log("THIS WAS THE RESPONSE!!!!!", response);
                            this.roster.push(response);
                            console.log("roster", this.roster);
                        })
                        .then(data => this.cycler());
                }
            })
    }
    chooseEmployeeType = () => {
        return inquirer
            .prompt({
                type: 'list',
                message: "Select an employee role to proceed or 'SAVE' to proceed.",
                name: 'userResponse',
                choices: ["Engineer", "Intern", "I'm finished building the team."]
            });

    }

    userInputEmployeeDetails = (position) => {

        return inquirer.prompt([{
            type: 'input',
            message: "What is the employee's name?",
            name: 'name'
        },
        {
            type: 'input',
            message: "What is the employee's ID number?",
            name: 'id'
        },
        {
            type: 'input',
            message: "What is the employee's email address?",
            name: 'email'
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "What is the manager's office number?",
            when: (position === "Manager")
        },
        {
            type: 'input',
            name: 'github',
            message: "What is the engineer's Github username?",
            when: (position === "Engineer")
        },
        {
            type: 'input',
            name: 'school',
            message: "What is the interns's school name?",
            when: (position === "Intern")
        }]);
    }


}

new Process().initialize();
