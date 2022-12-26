const fs = require("fs");
const path = require("path");
const createFolder = () => {
    let pathDirectory = createPath()
    if (!fs.existsSync(pathDirectory)) {
        fs.mkdirSync(pathDirectory, { recursive: true })
    }
    return pathDirectory
}
const createPath = () => {
    return path.join(__dirname, "..", 'logs/');
}
const printLog = (msg, type = 'draft') => {
    try {
        console.log(JSON.stringify(msg))
        let folder = createFolder()
        let cDate = new Date();
        let fileName = parseDate(cDate);
        msg = `\n${cDate.toLocaleTimeString()}||${type}||${msg}`
        fs.appendFile(`${folder}/${fileName}.log`, msg, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    } catch (error) {
        console.log(error)
        throw error
    }
};

function parseDate(date) {
    let cdate = new Date(date);
    return `${cdate.getFullYear()}-${parseTwoDigit(cdate.getMonth() + 1)}-${parseTwoDigit(cdate.getDate())}`
};

function parseTwoDigit(num) {
    if (Number(num) < 10) return Number(`0${num}`);
    return num;
};


module.exports = {
    printLog
}