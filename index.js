const Manager = require("./test/employee.test");
const Engineer = require("./test/engineer.test");
const Intern = require("./test/intern.test");
const Intern = require("./test/manager.test");

const inquirer = require("inquirer");
const generateHTML = require('./assets');
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
                    message: 'What is your managers name?'
                },
                {
                    type: 'text',
                    name: 'id',
                    message: 'What is your managers id?'
                },
                {
                    type: 'text',
                    name: 'email',
                    message: 'What is your managers email?'
                },
                {
                    type: 'text',
                    name: 'officeNumber',
                    message: 'What is your managers office number?'
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
                    message: 'What is your engineers name?'
                },
                {
                    type: 'text',
                    name: 'id',
                    message: 'What is your engineers id?'
                },
                {
                    type: 'text',
                    name: 'email',
                    message: 'What is your engineers email?'
                },
                {
                    type: 'text',
                    name: 'github',
                    message: 'What is your engineers github username?'
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
                    message: 'What is your interns name?'
                },
                {
                    type: 'text',
                    name: 'id',
                    message: 'What is your interns id?'
                },
                {
                    type: 'text',
                    name: 'email',
                    message: 'What is your interns email?'
                },
                {
                    type: 'text',
                    name: 'school',
                    message: 'What is your interns school?'
                }
            ])
            .then(({ name, id, email, school }) => {
                this.employees.push(new Intern(name, id, email, school));

                this.addEmployee();
            })
    }

    writeFile() {
        fs.writeFile('./assets/index.html', generateHTML(this.employees), (err) => {
            if (err) throw err;

            console.log('The file is created');
        });

    }


}

const init = new Prompts();
init.promptUser();
module.exports = Prompts;