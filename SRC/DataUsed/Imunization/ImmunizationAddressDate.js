const fs = require('fs');
const path = require('path');

let streetNames = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../DataUsed/streetNames.json')));
let cityNames = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../DataUsed/cities.json')));

let site = ["left deltoid", "right deltoid", "left Vastus lateralis", "right Vastus lateralis", "left Ventrogluteal muscle", "right Ventrogluteal muscle", "left Dorsogluteal muscles", "right Dorsogluteal muscles"];
let types = [
    "Inactivated vaccines"
    ,"Live-attenuated vaccines"
    ,"Messenger RNA (mRNA) vaccines"
    ,"Subunit"
    ,"recombinant"
    ,"polysaccharide"
    ,"conjugate"
    ,"Toxoid "
    ,"Viral vector"
];

function generateImmunization (patientBirthDate, patientHealthCardNumber) {
    let date = new Date(getRandomInt(patientBirthDate.getFullYear(), 2021), getRandomInt(patientBirthDate.getMonth(), 11), getRandomInt(patientBirthDate.getDate(), 31));
    let out = [];
    let map = new Map();

    for(let i = 0; i < getRandomInt(0, 10); i++) {
        let type = types[getRandomInt(0, types.length-1)];
        while(map.has(type)) {
            type = types[getRandomInt(0, types.length-1)];
        }
        map.set(type, "");

        out.push({
            type : type,
            date : date.toISOString().split('T')[0],
            location : address(),
            lot : getRandomInt(1, 1000),
            dosage: getRandomInt(0, 9999)/100,
            site : site[getRandomInt(0, site.length-1)],
            PatientHealthCardNumber: patientHealthCardNumber,
        });
    }
    return out;
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
function padZeros(val, length) {
    val = String(val);
    let out = val;

    for(let i = 0; i < (length - val.length); i++) {
        out = "0" + out;
    }
    
    return out;
}

exports.generateImmunization = generateImmunization;

