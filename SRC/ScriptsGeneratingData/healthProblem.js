const fs = require('fs');
const path = require('path');

let illnessSymptoms = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../DataUsed/illnessSymptoms.json')));

function generateHealthProblem(patientBirthDate, patientHealthCardNumber) {

    let startDate = new Date(getRandomInt(patientBirthDate.getFullYear(), 2021), getRandomInt(patientBirthDate.getMonth(), 11), getRandomInt(patientBirthDate.getDate(), 31));//max day being set as 31 is fine as the constructor will just go to the next month and "add" the extra days
    let endDate = new Date(getRandomInt(startDate.getFullYear(), 2021), getRandomInt(startDate.getMonth(), 11), getRandomInt(startDate.getDate(), 31));
    
    return {
        patientHealthCardNumber : patientHealthCardNumber,
        type : illnessSymptoms[getRandomInt(0, illnessSymptoms.length-1)]["name"],
        startDate : startDate,
        endDate : endDate
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

console.log(generateHealthProblem(new Date(2002, 3, 3), "233422332as"));