const fs = require('fs');
const path = require('path');

let surgeries = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../DataUsed/surgeries.json')));
let streetNames = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../DataUsed/streetNames.json')));
let cityNames = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../DataUsed/cities.json')));


function generateSurgery(healthCardNumber, DoctorMINC, patientBirthDate) {
    let date = new Date(getRandomInt(patientBirthDate.getFullYear(), 2021), getRandomInt(patientBirthDate.getMonth(), 11), getRandomInt(patientBirthDate.getDate(), 31));//max day being set as 31 is fine as the constructor will just go to the next month and "add" the extra days

    return {
        date : date.toISOString().split('T')[0],
        type : surgeries[getRandomInt(0, surgeries.length-1)]["CPT Description"],
        location : generateAddress(),
        doctorResponsibleMINC : DoctorMINC,
        patientHealthCardNumber : healthCardNumber
    }
}

function getRandomInt(min, max) {
    min = Math.floor(min);
    max = Math.floor(max);

    if(max < min) {
        let temp = max;
        max = min;
        min = temp;
    }
    
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function padZeros(val, length) {
    val = String(val);
    let out = val;

    for(let i = 0; i < (length - val.length); i++) {
        out = "0" + out;
    }
    
    return out;
}

function generateAddress() {
    let index = getRandomInt(0, cityNames.length-1);
    return String(getRandomInt(0, 10000)) + " " + streetNames[getRandomInt(0, streetNames.length-1)]["FullStreetName"] + ", " + cityNames[index]["city"] + ", " + cityNames[index]["admin_name"] + " " + generatePostalZipCode(cityNames[index["country"]]) + ", " + cityNames[index]["country"];
}
//prefiltered the data so "Canada" and "United States" are the only possible options
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

exports.generateSurgery = generateSurgery;