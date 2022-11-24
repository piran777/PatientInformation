let healthStatus = ["good", "bad", "ok", "could be better"]

function generateHealthProblemStatus(healthProblemID, stDate, status) {//stDate is healthProblemStartDate or the startDate of the healthProblemStatus
    if(status === "start") {
        return {
            dateTime : new Date(getRandomInt(stDate.getFullYear(), 2021), getRandomInt(stDate.getMonth(), 11), getRandomInt(stDate.getDate(), 31)),
            status : "start",
            healthProblemID : healthProblemID
        } 
    }

    if(status === "end") {
        return {
            dateTime : new Date(getRandomInt(stDate.getFullYear(), 2021), getRandomInt(stDate.getMonth(), 11), getRandomInt(stDate.getDate(), 31)),
            status : "end",
            healthProblemID : healthProblemID
        }
    } else {
        return {
            dateTime : new Date(getRandomInt(stDate.getFullYear(), 2021), getRandomInt(stDate.getMonth(), 11), getRandomInt(stDate.getDate(), 31)),
            status : healthStatus[getRandomInt(0, healthStatus.length-1)],
            healthProblemID : healthProblemID
    
        }
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