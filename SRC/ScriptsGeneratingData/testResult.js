const fs = require('fs');
const path = require('path');

let type = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../DataUsed/test.json')));
let components = ["Systolic Average Blood Pressure", "Min Systolic Blood Pressure", "Max Diastolic Blood Pressure", "Diastolic Average Blood Pressure", "Min Diastolic Blood Pressure", "Max Systolic Blood Pressure", "Creatinine", "eGFR", "BICARBONATE SERUM", "ALBUMIN R U", "Albumin,R.Urine", "Microalb Creat Ratio", "Sodium", "POTASSIUM", "Chloride", "Hemoglobin A1C, POC"];
let units = ["mmol/L", "%", "mg/L", "mg/mmol creat", "umol/L", "mL/min/1.73m*2", ""];
let notes = ["This could be better", "good", "Too high", "Too low", "We will need to work on this", "bad", "within range"];

function generateTestResults(appointmentID, testType) {
    let out = [];
    
    for(let i = 0; i < getRandomInt(0, units.length-1); i++) {
        out.push({
            component: components[getRandomInt(0, components.length-1)],
            value: getRandomInt(0, 9999)/100,
            unit: units[i],//this is to ensure that all values are unique but a very lazy way of doing it
            note: notes[getRandomInt(0, notes.length-1)],
            TestType: testType,
            AppointmentID: appointmentID
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
exports.generateTestResults = generateTestResults;

// console.log(generateTestResults(1, "sfadafsd"));