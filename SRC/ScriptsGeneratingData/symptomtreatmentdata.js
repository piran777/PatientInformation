const fs = require('fs');
const path = require('path');

let treatments = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../DataUsed/treatment.json')));
let illnessSymptoms = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../DataUsed/illnessSymptoms.json')));

//these symptoms don't match their actual treatment as we couldn't find any data that has this already matched, so they are randomized
function generateSymptomTreatmentData() {
    let out = [];
    let keys = new Map();

    for(let i = 0; i < illnessSymptoms.length; i++) {
        if(!keys.has(illnessSymptoms[i]["symptoms"])) {
            keys.set(illnessSymptoms[i]["symptoms"], "");
            out.push({
                symptom: illnessSymptoms[i]["symptoms"],
                treatment: treatments[getRandomInt(0,treatments.length-1)]["treatment"]
            });
        }
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

// exports.generateSymptomTreatmentData = generateSymptomTreatmentData;
 console.log(generateSymptomTreatmentData());