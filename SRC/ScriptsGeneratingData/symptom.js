const fs = require('fs');
const path = require('path');

let symptom = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../DataUsed/illnessSymptoms.json')));

function generateSymptoms(appointmentID, reasonForAppointment) {
    let map = new Map();
    let out = [{
        appointmentID : appointmentID,
        type : reasonForAppointment
    }];
    map.set(out[0]["type"], "");

    for(let i = 0; i < getRandomInt(0, 7); i++) {
        let type = symptom[getRandomInt(0,symptom.length-1)]["name"];
        while(map.has(type)) {
            type = symptom[getRandomInt(0,symptom.length-1)]["name"];
        }
        map.set(type, "");
        
        out.push({
            appointmentID: appointmentID,
            type: type
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