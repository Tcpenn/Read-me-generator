// modules needed
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown')

// TODO: Create an array of questions for user input
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What would you like the title to be? (required)',
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log('Please provide a title!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Please provide a description for your readme. (required)',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log('Please provide a description!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Please provide instruction how to install your application',
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Please provide and example for proper usage of project with pictures if available',
            validate: usageInput => {
                if (usageInput) {
                    return true;
                } else {
                    console.log('Please provide examples for usage of your project!')
                    return false;
                    
                }
            }
        },
        {
            type: 'list',
            name: 'license',
            message: 'Which license does your project use?',
            choices: ['Apache License 2.0', 'GNU GPLv3', 'ISC', 'MIT', 'Other', 'No license']
        },
        {
            type: 'input',
            name: 'license',
            message: 'What is the name of your license?',
            when: ({license}) => {
                if(license === 'Other') {
                    return true;
                } else {
                    console.log('Please enter the name of the license!')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'credits',
            message: 'What sources were used to aid in the development of your project? (Separate with a comma)'
        },
        {
            type: 'input',
            name: 'authors',
            message: 'Who are the authors of your project (Separate the authors with a comma)',
            validate: contributingInput => {
                if (contributingInput) {
                    return true;
                } else {
                    console.log("Please provide the author(s) of your project!")
                }
            }
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Enter testing instructions for the project (Optional)'
        },
        {
            type: 'input',
            name: 'githubUsername',
            message: 'What is your GitHub username?',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please provide your github username')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Please enter your email',
            validate: emailInput => {
                if (emailInput) {
                    return true;
                } else {
                    console.log('Please provide a valid email!')
                    return false;
                }
            }
        }
    ]);
    
};

// TODO: Create a function to write README file
const writeToFile = (fileName, data) => {
    return new Promise((resolve, reject)=> {
        fs.writeFile(fileName, data, err => {
            if (err) {
                reject(err);
                // return out of the function 
                return;

            }

            resolve ({
                ok: true,
                message: 'File created'
            })
        });
    });
};


// Function call to initialize app
promptUser()
.then(userResponse => {
    return generateMarkdown(userResponse);
})
.then(readmeMarkdown => {
    writeToFile('./dist/README.md', readmeMarkdown);
})
.catch(err => {
    console.log(err)
});