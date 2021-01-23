const fs = require('fs');

const path = require('path');
let dirPath = path.resolve(__dirname, '../model/data');

function writeJson(fileName, content) {
    const filePath = path.resolve(dirPath, fileName);
    const jsonContent = JSON.stringify(content, null, 2);
    fs.writeFileSync(filePath, jsonContent);
}

function readFile(filePath) {
    if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath);
    }
    console.log('error');
    return null;
}

function readJson(fileName) {
    const filePath = path.resolve(dirPath, fileName);
    const file = readFile(filePath);
    const content = file && JSON.parse(file) || [];
    return content;
}

module.exports = {
    writeJson,
    readJson,
}
