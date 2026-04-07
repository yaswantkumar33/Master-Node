// process.env.UV_THREADPOOL_SIZE = 1; => you can't runt he thread count in code where node is already started so you can try it with the below command
// $env:UV_THREADPOOL_SIZE=1; node index.js
const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();

setTimeout(() => { console.log("Timer 1") }, 0);
setImmediate(() => { console.log("Immediate 1"); });

fs.readFile('./test-file.txt', () => {
    console.log("file read in fs");
    console.log("------------------------");
    setTimeout(() => { console.log("Timer 2") }, 3000);
    setImmediate(() => { console.log("Immediate 2"); });

    process.nextTick(() => { console.log("The next tick is called") })

    crypto.pbkdf2('Password', 'Test', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, "Password Encrypted");
    })
    crypto.pbkdf2('Password', 'Test', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, "Password Encrypted");
    })
    crypto.pbkdf2('Password', 'Test', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, "Password Encrypted");
    })
    crypto.pbkdf2('Password', 'Test', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, "Password Encrypted");
    })
})

console.log("Welcome to Evvvent loop File");