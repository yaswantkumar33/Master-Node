const fs = require("fs");

// const textIn = fs.readFileSync("./1-node-farm/starter/txt/input.txt", "utf-8");
// console.log(`hello the txt file is: ${textIn}`);
// let textOut = "This is what we know about the avacado" + textIn;
// fs.writeFileSync("./1-node-farm/starter/txt/output.txt", textOut);
// console.log("file written!");

// let testin = fs.readFileSync("./test.js");
// console.log(`this is the test file: ${testin}`);

// this is te asynochrous non blocking way of the same thing
fs.readFile("./read-this.txt", "utf-8", function (err, data1) {
  if (err) return console.log("Error oops check again");
  console.log(data1);
  fs.readFile(`./${data1}.js`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile("./append.txt", "utf-8", function (err, data3) {
      console.log(data3);
      fs.writeFile(
        "./stark.txt",
        `${data1}\n${data2}\n${data3}`,
        "utf-8",
        (err) => {
          console.log("write file is done ");
        },
      );
    });
  });
});
console.log("Read file is running ........");
