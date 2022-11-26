const fs = require('fs');
const path = require('path');

let tests = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../DataUsed/testNames.json')));

function generateTests(appointmentID, appointmentDate) {
    let out = [];
    let map = new Map();

    for(let i = 0; i < getRandomInt(0, 7); i++) {
        let test = tests[getRandomInt(0, tests.length-1)];
        while(map.has(test)) {
            test = tests[getRandomInt(0, tests.length-1)];
        }
        map.set(test, "");
        
        let dateTime = new Date(getRandomInt(appointmentDate.getFullYear(), 2021), getRandomInt(appointmentDate.getMonth(), 11), getRandomInt(appointmentDate.getDate(), 31));
        
        out.push({
            type : test,
            date : dateTime.toISOString().split('T')[0],
            AppointmentID : appointmentID
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

exports.generateTests = generateTests;