const fs = require('fs');
const path = require('path');
let relationshipTopatient = ["dad", "mom","sister","brother", "friend","uncle","aunt","cousin"];
function generatePatient(patientIDs,familyIDs) {
    
    return {
        relationshipTopatient: relationshipTopatient[getRandomInt(0, relationshipTopatient.length-1)],
        patientID: patientIDs,
        familyID : familyIDs,
        
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

exports.generatePatient = generatePatient;