
// if instillation section, creates TOC entry for instillation
const instillationTOC = instillation => {
  if (instillation) {
    return `
* [Installation](#installation)`;
  } else {
    return '';
  }
};

// if instillation section, creates the instillation section in the markdown
const generateInstillation = instillation => {
  if (instillation) {
    return `
## Instillation
${instillation}
`;

  } else {
    return '';
  }
};

//test
const testsTOC = tests => {
  if (tests) {
    return `
    *[Tests](#tests)`;
  } else {
    return '';
  }
};

const generateTests = tests => {
  if (tests) {
    return `
    ## Tests
    
    ${tests}  `
  }
}

//license
const licenseTOC = (license, licenseOther) => {
  if (license !== 'No license') {
    return `
    *[License](#license)`;
  } else {
    return '';
  }
};

const creditsTOC = credits => {
  if(credits) {
  return `
  *[Credits(#credits)
    `;
  } else {
    return '';
  }
};

const generateCredits = credits => {
  if (credits) {
    return`
    ##Credits

    ${credits.replace(/,/g, `
    `)}`;
  } else {
    return '';
  }
};

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
const renderLicenseBadge = (license, licenseOther) => {
  if (license === 'Other') {
    const licenseStr = licenseOther.replace(/ /g, '_')
    return `
    ![${licenseOther} license]((https://img.shields.io/badge/license-${licenseStr}-green)
    `


    // See if having a parameter of === 'No license' and the function just returning an empty string works
  } else if (license !== 'No license'){
    const licenseStr = license.replace(/ /g, '_');
    return `
    ![${license}](https://img.shields.io/badge/license-${licenseStr}-green)
    `;
  } else {
   
    return ``;
  }
};

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
const generateLicenseLink = (license, licenseOther) => {
  if (license === 'Other'){
  return `
  ## License
  ${licenseOther}
  `;
    } else if (license === 'Apache License 2.0') {
    return `
    ## License
    [${license}](https://choosealicense.com/licenses/apache-2.0/)
    `;
  
  } else if (license === 'GNU GPLv3'){
    return `
    ## License
    [${license}](https://https://choosealicense.com/licenses/gpl-3.0/)
    `;
  } else if (license === 'ISC') {
    return`
    ## License 
    [${license}](https://choosealicense.com/licenses/isc/)
    `;
  } else if (license === 'MIT') {
    return `
    ## License
    [${license}](https://choosealicense.com/licenses/mit/)
    `;
  } else if (license === 'No license') {
    return'';
  }
};



// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  return `
  # ${data.title}

  ${renderLicenseBadge(data.license, data.licenseOther)}

  ##Description
  ${data.description}

  ## Table of Contents

  ${instillationTOC(data.instillation)}

  * [Usage](#usage)${licenseTOC(data.license)}${creditsTOC(data.credits)}
  * [Authors](#authors)${testsTOC(data.tests)}
  * [Questions](#questions)
  
  ${generateInstillation(data.instillation)}
  ## Usage

  ${data.usage}${generateLicenseLink(data.license, data.licenseOther)}${generateCredits(data.credits)}
  ## Authors

  ${data.authors.replace(/, /g, `  
  `)}
  ${generateTests(data.tests)}
  ## Questions

  Please reach out of you have any additional questions!

  * [GitHub](https://github.com/${data.githubUsername})
  * [Email](mailto:${data.email})
  `
  };

module.exports = generateMarkdown;