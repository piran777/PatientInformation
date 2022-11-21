function generateHealthCard(index) {
    if(index.length > 10) {
        return;
    }

    return padZeros(index, 10) + String.fromCharCode(getRandomInt(65, 90), getRandomInt(65, 90));

    function padZeros(val, length) {
        let out = val;
        for(let i = 0; i < (length - val.length); i++) {
            out = "0" + out;
        }
        return out;
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
