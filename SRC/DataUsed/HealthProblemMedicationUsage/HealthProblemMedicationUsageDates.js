const fs = require('fs');
const path = require('path');


function genHealthProblemMedicationUsage(healthProblemID, medicationID, healthProblemStartDate, healthProblemEndDate) {
    let out = new Array();
    let maxDate = healthProblemEndDate instanceof  Date? healthProblemEndDate : new Date(2021, 11, 31);

    let startDate = new Date(getRandomInt(healthProblemStartDate.getFullYear(), maxDate.getFullYear()), getRandomInt(healthProblemStartDate.getMonth(), maxDate.getMonth()), getRandomInt(healthProblemStartDate.getDate(), maxDate.getDate()-5));//max day being set as 31 is fine as the constructor will just go to the next month and "add" the extra days
    let endDate = new Date(getRandomInt(startDate.getFullYear(), maxDate.getFullYear()), getRandomInt(startDate.getMonth(), maxDate.getMonth()), getRandomInt(startDate.getDate(), maxDate.getDate()-5));
    

    out.push({
        startDate : startDate.toISOString().replace('T', ' ').replace('Z', '').replace(':00.000', ''),
        dosage : getRandomInt(0, 9999)/1000,
        frequency : getRandomInt(0, 3),
        endDate : endDate.toISOString().replace('T', ' ').replace('Z', '').replace(':00.000', ''),
        medicationID : medicationID,
        healthProblemID : healthProblemID

    });

    for(let i = 0; i < getRandomInt(0,1); i++) {
        startDate = new Date(getRandomInt(endDate.getFullYear(), maxDate.getFullYear()), getRandomInt(endDate.getMonth(), maxDate.getMonth()), getRandomInt(endDate.getDate(), maxDate.getDate()-4+i));//max day being set as 31 is fine as the constructor will just go to the next month and "add" the extra days
        endDate = new Date(getRandomInt(startDate.getFullYear(), maxDate.getFullYear()), getRandomInt(startDate.getMonth(), maxDate.getMonth()), getRandomInt(startDate.getDate(), maxDate.getDate()-4+i));
        startDate.setMinutes(i+1);
        out.push({
            startDate : startDate.toISOString().replace('T', ' ').replace('Z', '').replace(':00.000', ''),
            dosage : getRandomInt(0, 9999)/1000,
            frequency : getRandomInt(0, 3),
            endDate : endDate.toISOString().replace('T', ' ').replace('Z', '').replace(':00.000', ''),
            medicationID : medicationID,
            healthProblemID : healthProblemID
        });
    }

    if(healthProblemEndDate instanceof Date) {
        startDate = new Date(getRandomInt(endDate.getFullYear(), maxDate.getFullYear()), getRandomInt(endDate.getMonth(), maxDate.getMonth()), getRandomInt(endDate.getDate(), maxDate.getDate()));//max day being set as 31 is fine as the constructor will just go to the next month and "add" the extra days
        startDate.setMinutes(10);
        out.push({
            startDate : startDate.toISOString().replace('T', ' ').replace('Z', '').replace(':00.000', ''),
            dosage : getRandomInt(0, 9999)/1000,
            frequency : getRandomInt(0, 3),
            endDate : healthProblemEndDate.toISOString().replace('T', ' ').replace('Z', '').replace(':00.000', ''),
            medicationID : medicationID,
            healthProblemID : healthProblemID
        });
    } else {
        startDate = new Date(getRandomInt(endDate.getFullYear(), maxDate.getFullYear()), getRandomInt(endDate.getMonth(), maxDate.getMonth()), getRandomInt(endDate.getDate(), maxDate.getDate()));//max day being set as 31 is fine as the constructor will just go to the next month and "add" the extra days
        startDate.setMinutes(10);
        out.push({
            startDate : startDate.toISOString().replace('T', ' ').replace('Z', '').replace(':00.000', ''),
            dosage : getRandomInt(0, 9999)/1000,
            frequency : getRandomInt(0, 3),
            endDate : null,
            medicationID : medicationID,
            healthProblemID : healthProblemID
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

exports.genHealthProblemMedicationUsage = genHealthProblemMedicationUsage;
// console.log(genHealthProblemMedicationUsage("a", "asdf", new Date(2002, 3, 3), null));