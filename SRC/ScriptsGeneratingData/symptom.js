const fs = require('fs');
const path = require('path');

let symptom = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../DataUsed/illnessSymptoms.json')));

function generateSymptoms(appointmentID) {
    let out = [];

    for(let i = 0; i < getRandomInt(0, 7); i++) {
        out.push({
            appointmentID: appointmentID,
            type: symptom[getRandomInt(0,symptom.length-1)]["name"]
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

exports.generateSymptoms = generateSymptoms;
// console.log(generateSymptoms(1));