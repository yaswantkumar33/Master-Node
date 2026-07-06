// this is note js to pratcie oops in js

class Student {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  study() {
    console.log(`${this.name} is studying`);
  }
}

class studAction extends Student {
  constructor(name, age, action) {
    super(name, age);
    this.action = action;
  }

  doaction() {
    console.log(`${this.name} is doing ${this.action}`);
  }
}

const std1 = new Student('stark', 25);
const std2 = new Student('marco', 24);
const std3 = new studAction('michel', 23, 'eating');

std1.study();
std2.study();

std3.doaction();
std3.study();
