let healthStatus = ["good", "bad", "ok", "could be better"]

function generateHealthProblemStatus(healthProblemID, stDateHP, endDate) {//stDate is healthProblemStartDate or the startDate of the healthProblemStatus
    let out = [];
    let maxDate = endDate instanceof  Date? endDate : new Date(2021, 11, 31);

    out.push({
        dateTime : new Date(getRandomInt(stDateHP.getFullYear(), maxDate.getFullYear()), getRandomInt(stDateHP.getMonth(), maxDate.getMonth()), getRandomInt(stDateHP.getDate(), maxDate.getDate())).toISOString().replace('T', ' ').replace('Z', '').replace(':00.000', ''),
        status : "start",
        healthProblemID : healthProblemID
    });

    for(let i = 0; i < getRandomInt(0, 7); i++) {
        let dateTime = new Date(getRandomInt(stDateHP.getFullYear(), maxDate.getFullYear()), getRandomInt(stDateHP.getMonth(), maxDate.getMonth()), getRandomInt(stDateHP.getDate(), maxDate.getDate()));
        dateTime.setMinutes(i+1);
        out.push({
            dateTime : dateTime.toISOString().replace('T', ' ').replace('Z', '').replace(':00.000', ''),
            status : healthStatus[getRandomInt(0, healthStatus.length-1)],
            healthProblemID : healthProblemID
    
        })
    }

    if(endDate instanceof Date) {
        maxDate.setMinutes(19);
        out.push({
            dateTime : maxDate.toISOString().replace('T', ' ').replace('Z', '').replace(':00.000', ''),
            status : "end",
            healthProblemID : healthProblemID
        })
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

exports.generateHealthProblemStatus = generateHealthProblemStatus;

