const fs = require('fs');
const path = require('path');

let type = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../DataUsed/test.json')));

function generateAppointment(notes, reasonforAppointment, FamilyDoctorMINC, PatientHealthCardNumber, ID, patientBirthDate) {
    let startDate = new Date(getRandomInt(patientBirthDate.getFullYear(), 2021), getRandomInt(patientBirthDate.getMonth(), 11), getRandomInt(patientBirthDate.getDate(), 31));//max day being set as 31 is fine as the constructor will just go to the next month and "add" the extra days
    let endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());

    startDate.setHours(getRandomInt(8, 18));
    startDate.setMinutes(getRandomInt(0,59));
    endDate.setHours(startDate.getHours() + 1);
    endDate.setMinutes(getRandomInt(0,59));

    return {
        startDateTime: startDate,
        endDateTime: endDate,
        notes: notes,
        reasonforAppointment: reasonforAppointment,
        FamilyDoctorMINC: FamilyDoctorMINC,
        PatientHealthCardNumber: PatientHealthCardNumber,
        ID: ID
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

console.log(generateAppointment("He is hurt", "Broken leg", "CAMD12345679", "233422332as", 1, new Date(2002, 3, 3)));