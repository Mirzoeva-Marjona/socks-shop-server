const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const fs = require('fs');
const path = require('path');
const dirPath = path.resolve(__dirname, 'data');
const filePath = path.resolve(dirPath, 'products.json');

function saveProduct(content) {
    const jsonContent = JSON.stringify(content, null, 2);
    fs.writeFileSync(filePath, jsonContent);
}

function readProductFile() {
    const file = readFile(filePath);
    const content = file && JSON.parse(file) || [];
    return content;
}

function readFile(filePath) {
    if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath);
    }
    return null;
}

function getInput() {
    return new Promise(resolve => {
        rl.question(">", answer => {
            resolve(answer);
        });
    });
}

module.exports = {
    rl,
    saveProduct,
    readProductFile,
    getInput,
}
