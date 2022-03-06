const inquirer = require('inquirer');

const Manager = require('../lib/Manager');
const Engineer = require('../lib/Engineer');
const Intern = require('../lib/Intern');
const { writeFile } = require('../utils/WriteFile.js');
const { htmlAssembler } = require('./GenerateHtml.js');

const roster = [];

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

const initialize = () => {
    console.log('\033[2J');
    userInputEmployeeDetails('Manager')
        .then(({ name, id, email, officeNumber }) => roster.push(new Manager(name, id, email, officeNumber)))
            .then(data => displayRoster())
            .then(data => cycler());
        
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


const conclusion = () => {
    writeFile('dist/index.html', htmlAssembler(roster))
    .then(response => console.log(response.message))
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

initialize();

