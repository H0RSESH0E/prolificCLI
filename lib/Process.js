const inquirer = require('inquirer');
var fs = require('fs');


const chalk = require('chalk');
const { exec } = require('child_process');

const Manager = require('../lib/Manager');
const Engineer = require('../lib/Engineer');
const Intern = require('../lib/Intern');
const { writeFile } = require('../utils/WriteFile.js');
const { readFile } = require('../utils/ReadFile.js');
const { htmlAssembler } = require('../src/GenerateHtml.js');

const log = console.log;

var roster = [];

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

const displayRoster = () => {
    console.log('\033c');
    console.table(roster);
    console.log("");
    console.log("");
}

const confirmNew = () => {
    return inquirer
        .prompt({
            type: 'list',
            message: "Start a new roster or load the last one?",
            name: 'userResponse',
            choices: ["NEW roster", "LOAD last roster"]
        });
}

const initialize = () => {
    confirmNew()
        .then(({ userResponse }) => {

            if (userResponse === "NEW roster") {
                start();
            } else {
                loadData();
            };
        }
        )

}

const start = () => {
    console.log('\033[2J');
    userInputEmployeeDetails('Manager')
        .then(({ name, id, email, officeNumber }) => roster.push(new Manager(name, id, email, officeNumber)))
        .then(data => displayRoster())
        .then(data => cycler());

}


const loadData = () => {
    console.log('\033c');
    readFile('lastRoster.json')
    .then(response => roster = response)
    .then(data => {
        console.log(roster);
        // displayRoster()    
        cycler()
    });

}




const cycler = () => {

    nextEmployeeOrFinish()
        .then(({ userResponse }) => {
            if (userResponse === "SAVE") {
                conclusion();
                return
            }
            else if (userResponse === "Engineer") {
                userInputEmployeeDetails(userResponse)
                    .then(({ name, id, email, github }) => roster.push(new Engineer(name, id, email, github)))
                    .then(data => displayRoster())
                    .then(data => cycler());
            }
            else if (userResponse === "Intern") {
                userInputEmployeeDetails(userResponse)
                    .then(({ name, id, email, school }) => roster.push(new Intern(name, id, email, school)))
                    .then(data => displayRoster())
                    .then(data => cycler());
            }
        })
}

const nextEmployeeOrFinish = () => {
    return inquirer
        .prompt({
            type: 'list',
            message: "Please select an employee role or 'SAVE' to finalize your HTML file.",
            name: 'userResponse',
            choices: ["Engineer", "Intern", "SAVE"]
        });

}


const saveRoster = (roster) => {
    writeFile('lastRoster.json', JSON.stringify(roster))
        .then(response => {
            log(chalk.bgGreen.bold(response.message))
            console.log("");
        })
        .catch(err => console.log(err));

}


const conclusion = () => {
    console.log("POOOP", roster);

    saveRoster(roster);

    console.log('\033c');
    log(chalk.bgYellow.bold(`Attempting to wrtie file...`));
    console.log("");

    writeFile('dist/index.html', htmlAssembler(roster))
        .then(response => {
            log(chalk.bgGreen.bold(response.message))
            console.log("");
        })
        .then(data => {
            const launch = exec('start dist/index.html', (err, stdout, stderr) => {
                if (err) {
                    console.error(`exec error: ${err}`);
                    return;
                }
                log(chalk.bgBlue.bold(`Your File is Ready ${stdout}`));

            })
        })
        .catch(err => console.log(err));
};

const userInputEmployeeDetails = (position) => {

    return inquirer.prompt([{
        type: 'input',
        message: "What is the employee's name?",
        name: 'name'
    },
    {
        type: 'input',
        message: "What is the employee's ID number?",
        name: 'id',
        default: () => { },
        validate: function (id) {

            valid = /^[0-9.-]*$/.test(id);

            if (valid) {
                return true;
            } else {
                log(chalk.red.bold('( Use only 0 - 9 or "." or "-" )'));
                return false;
            }
        }
    },
    {
        type: 'input',
        message: "What is the employee's email address?",
        name: 'email',
        default: () => { },
        validate: function (email) {

            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

            if (valid) {
                return true;
            } else {
                log(chalk.red.bold("Please enter a valid email"));
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: "What is the manager's office number?",
        when: (position === "Manager"),
        default: () => { },
        validate: function (officeNumber) {

            valid = /^[0-9]*$/.test(officeNumber);

            if (valid) {
                return true;
            } else {
                log(chalk.red.bold('( Use only 0 - 9 )'));
                return false;
            }
        }
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

module.exports = { initialize };

