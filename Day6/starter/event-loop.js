const fs = require('fs');
const crypto = require('crypto');

setTimeout(() => { console.log("Timer 1") }, 0);
setImmediate(() => { console.log("Immediate 1"); });

fs.readFile('./test-file.txt', () => {

    console.log("file read in fs");
    setTimeout(() => { console.log("Timer 2") }, 3000);
    setImmediate(() => { console.log("Immediate 2"); });
    process.nextTick(() => { console.log("The next tick is called") })

})

console.log("Welcome to Evvvent loop File");


