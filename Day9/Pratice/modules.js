// console.log(arguments);
// console.log(require('module').wrapper);


// Module.export
const C = require('./test-module-1');

const calculatorOne = new C;
console.log(calculatorOne.add(2,5));

// exports 

const {add} = require("./test-module-2");
console.log(add(10,20));

