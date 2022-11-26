const fs = require('fs');
const path = require('path');


function generateReferral(reason, OtherDoctorMINC, AppointmentID) {
    let out = [];
    let map = new Map();

    for(let i = 0; i < getRandomInt(0, 5); i++) {
        let MINC = OtherDoctorMINC[getRandomInt(0, OtherDoctorMINC.length-1)]["MINC"];
        while(map.has(MINC)) {
            MINC = OtherDoctorMINC[getRandomInt(0, OtherDoctorMINC.length-1)]["MINC"];
        }
        map.set(MINC, "");

        out.push({
            reason: reason,
            OtherDoctorMINC: MINC,
            AppointmentID: AppointmentID
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
exports.generateReferral = generateReferral;
//console.log(generateReferral("He broke his arm", "CAMD12345679", 1));