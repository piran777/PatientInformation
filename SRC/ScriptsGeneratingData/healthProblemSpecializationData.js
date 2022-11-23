const fs = require('fs');
const path = require('path');

let illnessSymptoms = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../DataUsed/illnessSymptoms.json')));
let doctorSpec = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../DataUsed/doctorSpecilization.json')));

//this basically has no meaning doing it this way as we would need to manually create this if we wanted this to be correct
function healthProblemSpecializationData() {
    let out = [];

    for(let i = 0; i < illnessSymptoms.length; i++) {
        out.push({
            healthProblem : illnessSymptoms[i]["name"],
            specialization : doctorSpec[getRandomInt(0, doctorSpec.length-1)]
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


console.log(healthProblemSpecializationData());