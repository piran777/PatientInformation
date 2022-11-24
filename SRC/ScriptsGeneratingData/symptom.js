const fs = require('fs');
const path = require('path');

let symptom = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../DataUsed/illnessSymptoms.json')));

function generateSymptoms(appointmentID) {

    return {
        appointmentID: appointmentID,
        type: symptom[getRandomInt(0,symptom.length-1)]["name"]
       
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

exports.generateSurgery = generateSurgery;
console.log(generateSymptoms(1));