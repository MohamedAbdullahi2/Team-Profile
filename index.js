
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const inquirer = require("inquirer");
const generateHTML = require('./Srcs/html.gen');
const fs = require("fs")

class Prompts {
    constructor() {
        this.employees = [];
    }

    promptUser() {
        inquirer
            .prompt([
                {
                    type: 'text',
                    name: 'name',
                    message: 'What is your manager name?'
                },
                {
                    type: 'text',
                    name: 'id',
                    message: 'What is your manager id?'
                },
                {
                    type: 'text',
                    name: 'email',
                    message: 'What is your manager email?'
                },
                {
                    type: 'text',
                    name: 'officeNumber',
                    message: 'What is your manager office number?'
                }
            ])
            //destructure name from the prompt object
            .then(({ name, id, email, officeNumber }) => {
                this.employees.push(new Manager(name, id, email, officeNumber));

                this.addEmployee();
            })
    }

    addEmployee() {
        inquirer
            .prompt({
                type: 'list',
                name: 'confirmAddEmp',
                message: 'Would you like to add an Engineer, add a Intern, or are you finished adding employees?',
                choices: ['Add Engineer', 'Add Intern', 'I am finished adding employees']
            })
            .then((data) => {
                if (data.confirmAddEmp === 'Add Engineer') {
                    this.addEngineer();
                } else if (data.confirmAddEmp === 'Add Intern') {
                    this.addIntern();
                } else {
                    this.writeFile()
                }
            })
    }

    addEngineer() {
        inquirer
            .prompt([
                {
                    type: 'text',
                    name: 'name',
                    message: 'What is your engineer name?'
                },
                {
                    type: 'text',
                    name: 'id',
                    message: 'What is your engineer id?'
                },
                {
                    type: 'text',
                    name: 'email',
                    message: 'What is your engineer email?'
                },
                {
                    type: 'text',
                    name: 'github',
                    message: 'What is your engineer github username?'
                }
            ])
            .then(({ name, id, email, github }) => {
                this.employees.push(new Engineer(name, id, email, github));

                this.addEmployee();
            })
    }
    addIntern() {
        inquirer
            .prompt([
                {
                    type: 'text',
                    name: 'name',
                    message: 'What is your intern name?'
                },
                {
                    type: 'text',
                    name: 'id',
                    message: 'What is your intern id?'
                },
                {
                    type: 'text',
                    name: 'email',
                    message: 'What is your intern email?'
                },
                {
                    type: 'text',
                    name: 'school',
                    message: 'What is your intern school?'
                }
            ])
            .then(({ name, id, email, school }) => {
                this.employees.push(new Intern(name, id, email, school));

                this.addEmployee();
            })
    }

    writeFile() {
        fs.writeFile('./dist/index.html', generateHTML(this.employees), (err) => {
            if (err) throw err;

            console.log('The file is created');
        });

    }


}

const init = new Prompts();
init.promptUser();
module.exports = Prompts;