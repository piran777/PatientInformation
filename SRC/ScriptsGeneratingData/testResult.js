const fs = require('fs');
const path = require('path');

let type = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../DataUsed/test.json')));

function generateReferral(component, value, unit, note, AppointmentID) {
    return {
        component: component,
        value: value,
        unit: unit,
        note: note,
        TestType: type[getRandomInt(0, type.length - 1)].type,
        AppointmentID: AppointmentID
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

console.log(generateReferral("Roni", 3, "mL", "cancer", 1));