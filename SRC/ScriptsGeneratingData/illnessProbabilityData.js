const fs = require('fs');
const path = require('path');

let illnessSymptoms = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../DataUsed/illnessSymptoms.json')));

function generateIllnessProbabilityData() {
    let out = [];

    for(let illnessIndex = 0; illnessIndex < illnessSymptoms.length; illnessIndex++) {
        for(let i = 0; i < illnessSymptoms.length; i++) {
            if(i === illnessIndex) {
                continue;
            }

            out.push({
                illness : illnessSymptoms[illnessIndex]["name"],
                resultingIllness : illnessSymptoms[i]["name"],
                probability : Math.floor(Math.random() * 10000)/10000,
                probabilityThreshold : Math.floor(Math.random() * 2500)/10000
            });
        }
    }
    return out;
}
exports.generateIllnessProbabilityData = generateIllnessProbabilityData;

// console.log(generateIllnessProbabilityData());