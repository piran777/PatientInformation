const fs = require('fs');
const path = require('path');

function generateReferral(reason, OtherDoctorMINC, AppointmentID) {
    return {
        reason: reason,
        OtherDoctorMINC: OtherDoctorMINC,
        AppointmentID: AppointmentID
    }
}

exports.generateReferral = generateReferral;
//console.log(generateReferral("He broke his arm", "CAMD12345679", 1));