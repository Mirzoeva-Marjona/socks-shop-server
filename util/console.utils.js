const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getInput() {
    return new Promise(resolve => {
        rl.question(">", answer => {
            resolve(answer);
        });
    });
}

module.exports = {
    rl,
    getInput,
}
