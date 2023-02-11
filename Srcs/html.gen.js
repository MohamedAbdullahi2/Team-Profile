function generateHTML(data) {
    let employeeInfo = ``;
    for (let i = 0; i < data.length; i = i + 1) {
        let extraItem = ``;
        if(data[i].getRole() === 'Role: Manager'){
            extraItem = data[i].getOfficeNumber()
        }
        else if(data[i].getRole() === 'Role: Intern'){
            extraItem = data[i].getSchool()
        }
        else if(data[i].getRole() === 'Role: Engineer'){
            extraItem = data[i].getGithub()
        }


        let card = `<div>
            <h2>Name:${data[i].getName()}</h2>
            <h3>${data[i].getRole()}</h3>
            <p>ID:${data[i].getId()}</p>
            <p>Email:<a href="mailto:https://${data[i].getEmail()}">${data[i].getEmail()}</a></p>
            <p>${extraItem}</p>
        </div>`;

        employeeInfo += card;
        // employeeInfo = employeeInfo + card;
    }

    // return the html template, and put  ${employeeInfo} inside
    return ` 
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Profiles</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="header-wrapper">
        <h1>Team Profiles</h1>
    </div>
    <div class = "grid">
    ${employeeInfo}
    </div>
</body>
</html>
    `;

}

module.exports = generateHTML;