const fs = require('fs');
const path = require('path');

let treatments = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../DataUsed/treatment.json')));

function generateOtherDoctor(symptom) {

    return {
        symptom: symptom,
        treatment: treatments[getRandomInt(0,treatments.length-1)]["treatment"]
       
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


console.log(generateOtherDoctor("merily"));