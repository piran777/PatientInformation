const fs = require('fs');
const path = require('path');

let names = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../DataUsed/randomNames.json')));


let emails = ["gmail.com", "yahoo.com", "hotmail.com", "aol.com", "msn.com", "wanadoo.fr", "orange.fr", "live.com", "free.fr", "gmx.de", "hotmail.it", "rogers.com", "hotmail.co.uk"];
let specialization = ['Addiction medicine', 'Allergy and clinical immunology', 'Cardiac surgery', 'Cardiology', 'Chronic pain', 'Critical care medicine', 'Dermatology', 'Diagnostic and interventional radiology',
'Emergency medicine', 'Endocrinology', 'Gastroenterology', 'General internal medicine', 'General surgery', 'General thoracic surgery', 'Genetics medicine', 'Geriatric medicine', 'Hematology and medical oncology',
'Nephrology', 'Neurology', 'Neuroradiology', 'Neurosurgery', 'Obstetrics and gynecology', 'Opthalmology', 'Orthopedic surgery', 'Otolaryngology/head and neck surgery', 'Palliative medicine', 'Pediatrics', 'Physical medicine and rehabilitation',
'Plastic surgery', 'Primary care mental health', 'Psychiatry', 'Radiation oncology', 'Reproductive biology', 'Respiratory disease', 'Rheumatology', 'Sport and exercise medicine', 'Urology', 'Vascular surgery'];

function generateOtherDoctor(index) {
    let fNameI = getRandomInt(0, names.length-1);
    let lNameI = getRandomInt(0, names.length-1);

    return {
        MINC: generateMINC(index),
        firstName: names[fNameI]['Name'],
        lastName: names[lNameI]['Name'],
        phoneNo: getRandomInt(1000000000, 9999999999),
        email: names[fNameI]['Name'] + names[lNameI]['Name'] + "@" + emails[getRandomInt(0, emails.length-1)],
        specialization: specialization[getRandomInt(0, specialization.length-1)]
    }
}

function generateMINC(index) {
    return("CAMD" + padZeros(index, 7) + "9");
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

exports.generateOtherDoctor = generateOtherDoctor;
// console.log(generateOtherDoctor());