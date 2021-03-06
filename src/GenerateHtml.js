// Returns a picture appropriate to the role
const getPic = (role) => {
    const manPic = `https://c.pxhere.com/images/b4/0a/c3912017a6eb6a6cbcab1c41fe82-1450985.jpg!d`
    const engPic = `https://c.pxhere.com/images/ab/43/81d9690e47183ee54a9ef236f9a4-1446017.jpg!d`
    const intPic = `https://c.pxhere.com/images/a7/77/7b4611c40db2012baf730fac0061-1445221.jpg!d`
    switch (role) {
        case "Manager":
            return manPic;
        case "Engineer":
            return engPic;
        case "Intern":
            return intPic;
    };
}

// This function returns the information which varries by role
const variantInfo = (employee) => {
    switch (employee.role) {
        case "Manager":
            return `Office Number: <br> ${employee.officeNumber}`;
        case "Engineer":
            return `Github Username: <br><a href="https://github.com/${employee.github}" target="_blank"> ${employee.github}</a>`;
        case "Intern":
            return `School: <br> ${employee.school}`;
    }
}

// These three functions make the subset arrays according to employee role
const makeManager = (roster) => {
    const Manager = roster.filter(function (element) {
        return (element.role === 'Manager');
    });
    return Manager
};

const makeEngineers = (roster) => {
    const Engineers = roster.filter(function (element) {
        return (element.role === 'Engineer');
    });
    return Engineers;
};

const makeInterns = (roster) => {
    const Interns = roster.filter(function (element) {
        return (element.role === 'Intern');
    });
    return Interns;
};

// Card assembler
const cardMaker = (array) => {
    var collectCards = "";
    if (array.length === 0) {
        return ``;
    }
    const pic = getPic(array[0].role);

    for (var i = 0; i < array.length; i++) {
        collectCards += `
    <div class="card" style="width: 16rem;">
    <div class="card-styling">
    <img class="card-img-top" src="${pic}" alt="${array[i].role}">
    <div class="role-title">${array[i].role}</div>
    </div>
    <div class="card-body">
        <h5 class="card-title">${array[i].name}</h5>
        <p class="card-text">Employee Number:<br> ${array[i].id}</p>
        <p class="card-text">${variantInfo(array[i])}</p>
        <a href="mailto:${array[i].email}">${array[i].email}</a>
    </div>
    </div>
`;
    };
    return collectCards;

}

// Main html assembler
const htmlAssembler = (roster) => {

    // splits the team info for placement into the html
    const manArr = makeManager(roster);
    const engArr = makeEngineers(roster);
    const intArr = makeInterns(roster);

    return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="./assets/css/style.css">
    <title>${manArr[0].name}'s Team Profile</title>
    <meta name="description"
        content="A CLI team profile generator that builds an attractive dashboard display.">
</head>
<body>
    <div id="background" class="whole-page container-fluid">

        <div class="row d-flex align-items-center" id="header-row">

            <header class="col-11 d-flex justify-content-center">
                <h1 class="blend-mode">${manArr[0].name}'s Team</h1>
            </header>
            <div class="col-1 d-flex justify-content-end">
                <img src="./assets/images/toroid.png"
                    alt="A drawing of a red and blue horseshoe magnet with lines tracing the direction of the magnetic flux from each pole which evoke the legs of a spider">

            </div>

        </div>

    <div class="row align-items-start" id="body-row">

    <!-- First Coloumn -->
            <div class="col-lg-3 col-md-12 col-sm-12 d-flex justify-content-around flex-wrap">
                ${cardMaker(manArr)}
        </div>

    <!-- Second Column -->
    <div class="col-lg-6 col-md-12 col-sm-12 d-flex justify-content-around flex-wrap">
    ${cardMaker(engArr)}
        </div>

    <!-- Third Column -->
    <div class="col-lg-3 col-md-12 col-sm-12 d-flex justify-content-around flex-wrap">
    ${cardMaker(intArr)}
        </div>

</body>

</html>
    `
}

module.exports = { htmlAssembler };