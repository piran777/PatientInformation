const fs = require('fs');
const path = require('path');

let illnessSymptoms = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../DataUsed/illnessSymptoms.json')));

function generateIllnessProbabilityData() {
    let i = getRandomInt(0, illnessSymptoms.length-1);
    let ri = getRandomInt(0, illnessSymptoms.length-1);

    while(ri === i) {
        ri = getRandomInt(0, illnessSymptoms.length-1);
    }

    return {
        illness : illnessSymptoms[i]["name"],
        resultingIllness : illnessSymptoms[ri]["name"],
        probabilityNotGetting : Math.floor(Math.random() * 10000)/10000,
        probabilityThreshold : Math.floor(Math.random() * 2500)/10000
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

console.log(generateIllnessProbabilityData());