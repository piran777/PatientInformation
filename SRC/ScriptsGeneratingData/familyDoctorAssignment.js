const fs = require('fs');
const path = require('path');


function genFamilyDoctorAssignment(patientBirthDate,patientHealthCardNumber,familyDoctorMINC) {

    let startDate = new Date(getRandomInt(patientBirthDate.getFullYear(), 2021), getRandomInt(patientBirthDate.getMonth(), 11), getRandomInt(patientBirthDate.getDate(), 31));//max day being set as 31 is fine as the constructor will just go to the next month and "add" the extra days
    let endDate = new Date(getRandomInt(startDate.getFullYear(), 2021), getRandomInt(startDate.getMonth(), 11), getRandomInt(startDate.getDate(), 31));
    
    return {
        startDate : startDate.toISOString().split('T')[0],
        endDate : endDate.toISOString().split('T')[0],
        patientHealthCardNumber : patientHealthCardNumber,
        familyDoctorMINC: familyDoctorMINC
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
exports.genFamilyDoctorAssignment = genFamilyDoctorAssignment;
// console.log(genFamilyDoctorAssignment(new Date(2002, 3, 3), "233422332as", "CAMD-8932-345"));
