const fs = require('fs');
const path = require('path');

let illnessSymptoms = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../DataUsed/illnessSymptoms.json')));

function generateHealthProblem(patientBirthDate, patientHealthCardNumber) {
    let out = [];
    let startDate = new Date(getRandomInt(patientBirthDate.getFullYear(), 2020), getRandomInt(patientBirthDate.getMonth(), 11), getRandomInt(patientBirthDate.getDate(), 31));//max day being set as 31 is fine as the constructor will just go to the next month and "add" the extra days
    let endDate = new Date(getRandomInt(startDate.getFullYear(), 2020), getRandomInt(startDate.getMonth(), 11), getRandomInt(startDate.getDate(), 31));
    let map = new Map();

    //generate health problems that end
    for(let i = 0; i < getRandomInt(0, 7); i++) {
        let problem = illnessSymptoms[getRandomInt(0, illnessSymptoms.length-1)]["name"];
        while(map.has(problem)) {
            problem = illnessSymptoms[getRandomInt(0, illnessSymptoms.length-1)]["name"];
        }
        map.set(problem, "");

        out.push({
            PatientHealthCardNumber : patientHealthCardNumber,
            type : problem,
            startDate : startDate.toISOString().split('T')[0],
            endDate : endDate.toISOString().split('T')[0]
        });
        startDate = new Date(getRandomInt(endDate.getFullYear(), 2020), getRandomInt(endDate.getMonth(), 11), getRandomInt(endDate.getDate(), 31));//max day being set as 31 is fine as the constructor will just go to the next month and "add" the extra days
        endDate = new Date(getRandomInt(startDate.getFullYear(), 2020), getRandomInt(startDate.getMonth(), 11), getRandomInt(startDate.getDate(), 31));

    }
    map = new Map();

    for(let i = 0; i < getRandomInt(0, 4); i++) {
        let problem = illnessSymptoms[getRandomInt(0, illnessSymptoms.length-1)]["name"];
        while(map.has(problem)) {
            problem = illnessSymptoms[getRandomInt(0, illnessSymptoms.length-1)]["name"];
        }
        map.set(problem, "");

        out.push({
            PatientHealthCardNumber : patientHealthCardNumber,
            type : problem,
            startDate : startDate.toISOString().split('T')[0],
            endDate : null
        });
        startDate = new Date(getRandomInt(startDate.getFullYear(), 2021), getRandomInt(startDate.getMonth(), 11), getRandomInt(startDate.getDate(), 31));//max day being set as 31 is fine as the constructor will just go to the next month and "add" the extra days
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

exports.generateHealthProblem = generateHealthProblem;

// console.log(generateHealthProblem(new Date(2002, 3, 3), "233422332as"));