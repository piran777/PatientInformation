const fs = require('fs');
const path = require('path');

let streetNames = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../DataUsed/streetNames.json')));
let cityNames = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../DataUsed/cities.json')));


function generateImmunization (patientBirthDate) {
    let date = new Date(getRandomInt(patientBirthDate.getFullYear(), 2021), getRandomInt(patientBirthDate.getMonth(), 11), getRandomInt(patientBirthDate.getDate(), 31));
    return{
    date : date.toISOString().split('T')[0],
    location : generateAddress()
    }
}

function address() {
    let index = getRandomInt(0, cityNames.length-1);
    return String(getRandomInt(0, 10000)) + " " + streetNames[getRandomInt(0, streetNames.length-1)]["FullStreetName"] + ", " + cityNames[index]["city"] + ", " + cityNames[index]["admin_name"] + " " + generatePostalZipCode(cityNames[index["country"]]) + ", " + cityNames[index]["country"];
}
function generatePostalZipCode(country) {
    if(country === "Canada") {
        let postCode = "";
        for(let i = 0; i < 3; i++) {
            postCode += String.fromCharCode(getRandomInt(65, 90));
            postCode += getRandomInt(0, 9);
        }
        return postCode;
    } else {
        return String(padZeros(getRandomInt(0, 99999), 5)) + "-" + String(padZeros(getRandomInt(0, 9999), 4));
    }
}

exports.generateImmunization = generateImmunization;