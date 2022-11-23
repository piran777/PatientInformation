const fs = require('fs');
const path = require('path');

let names = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../DataUsed/randomNames.json')));
let streetNames = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../DataUsed/streetNames.json')));
let cityNames = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../DataUsed/cities.json')));

let emails = ["gmail.com", "yahoo.com", "hotmail.com", "aol.com", "msn.com", "wanadoo.fr", "orange.fr", "live.com", "free.fr", "gmx.de", "hotmail.it", "rogers.com", "hotmail.co.uk"];
let languages = ["Mandarin", "Hindu", "Spanish", "English", "Arabic", "Portuguese", "Bengali", "Russian", "Japanese", "German", "Panjabi", "Korean", "Italian", "Turkish", "Arabic", "Thai", "French"];
let ethnicity = ["American Indian", "Asian", "Arab", "Black", "African American", "Hispanic", "White"];
let religion = ["Christianity", "Islam", "Irreligion", "Hinduism", "Buddhism", "Folk Religions", "Sikhism", "Judaism"];


function generatePatient(index) {
    let fNameI = getRandomInt(0, names.length-1);
    let lNameI = getRandomInt(0, names.length-1);
    
    let birthDate = new Date(getRandomInt(1902, 2021), getRandomInt(0, 11), getRandomInt(0, 31));//max day being set as 31 is fine as the constructor will just go to the next month and "add" the extra days

    return {
        healthCardNumber: generateHealthCard(index),
        firstName : names[fNameI]['Name'],
        lastName : names[lNameI]['Name'],
        dateOfBirth : birthDate.toISOString().split('T')[0],
        gender : names[fNameI]['Gender'],
        ethnicity : ethnicity[getRandomInt(0, ethnicity.length-1)],
        preferredLanguage : languages[getRandomInt(0, languages.length-1)],
        religion : religion[getRandomInt(0, religion.length-1)],
        phoneNo : getRandomInt(1000000000, 9999999999),
        email : names[fNameI]['Name'] + names[lNameI]['Name'] + "@" + emails[getRandomInt(0, emails.length-1)],
        address : generateAddress()
    }
}

//address format: stNum street, city, province postalcode, Country
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

function generateHealthCard(index) {
    if(index.length > 10) {
        return;
    }

    return padZeros(index, 10) + String.fromCharCode(getRandomInt(65, 90), getRandomInt(65, 90)); 
}

function padZeros(val, length) {
    val = String(val);
    let out = val;

    for(let i = 0; i < (length - val.length); i++) {
        out = "0" + out;
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

console.log(generatePatient(10));