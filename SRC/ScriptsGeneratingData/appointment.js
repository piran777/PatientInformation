const fs = require('fs');
const path = require('path');

let type = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../DataUsed/test.json')));
let notes = ["Patient is very sick", "Patient seems fine", "Patient has a cough", "Patient is sick", "Patient has a limp"];

function generateAppointment(reasonforAppointment, FamilyDoctorMINC, PatientHealthCardNumber, patientBirthDate) {
    let startDate = new Date(getRandomInt(patientBirthDate.getFullYear(), 2021), getRandomInt(patientBirthDate.getMonth(), 11), getRandomInt(patientBirthDate.getDate(), 31));//max day being set as 31 is fine as the constructor will just go to the next month and "add" the extra days
    let endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());

    startDate.setHours(getRandomInt(8, 18));
    startDate.setMinutes(getRandomInt(0,59));
    endDate.setHours(startDate.getHours() + 1);
    endDate.setMinutes(getRandomInt(0,59));

    return {
        startDateTime: startDate.toISOString().replace('T', ' ').replace('Z', '').replace(':00.000', ''),
        endDateTime: endDate.toISOString().replace('T', ' ').replace('Z', '').replace(':00.000', ''),
        notes: notes[getRandomInt(0, notes.length-1)],
        reasonforAppointment: reasonforAppointment,
        FamilyDoctorMINC: FamilyDoctorMINC,
        PatientHealthCardNumber: PatientHealthCardNumber
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
exports.generateAppointment = generateAppointment;