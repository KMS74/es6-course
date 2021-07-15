// "use strict";  // Defines that JavaScript code should be executed in "strict mode".
/* "ES6 Course From Udacity"
_______________________________________

    NOTES:
    1) Regular functions can be either function declarations or function expressions,
     however arrow functions are always expressions.
    2) Arrow functions can be:
        -stored in a variable,
        -passed as an argument to a function,
        -and stored in an object's property.
    3) The value of the this keyword is based completely on how its function (or method) is called.
    4) this refering to the Object that is exuting the current method part of an object.
    5) this refering to Global Object(Window or Global) that is exuting the regular function or undefined in strict mode.
    6) this could be any of the following:
        -A new object
        -A specified object: If the function is invoked with call/apply:
        -A context object
    7) With arrow functions, the value of this is based on the function's surrounding context.
    8) the value of this inside an arrow function is the same as the value of this outside the arrow function.
    9) a function can have an object be a default parameter and use object destructuring.
   10) the constructor function is called with the new keyword.
   11) the constructor function, by convention, starts with a capital letter.
   12) the constructor function controls the setting of data on the objects that will be created.
   13) "inherited" methods are placed on the constructor function's prototype object.
   14) Methods that appear in the class definition are placed on that class's prototype object and a class is just a function
*/

// Using Arrow functions

// regular function
// function declarations
function regularFunction(regular) {
  console.log(`regular function with input parameter = ${regular}`);
}
// const upperizedNames = ["Farrin", "Kagure", "Asser"].map(function (name) {
//   return name.toUpperCase();
// });
regularFunction("Hello World");
// arrow function
const upperizedNames = ["Farrin", "Kagure", "Asser"].map((name) =>
  name.toUpperCase()
);

console.log(upperizedNames);

const names = [
  "Afghanistan",
  "Aruba",
  "Bahamas",
  "Chile",
  "Fiji",
  "Gabon",
  "Luxembourg",
  "Nepal",
  "Singapore",
  "Uganda",
  "Zimbabwe",
];
const longNames = names.filter((name) => name.length > 6);
console.log(longNames);

// the arrow function is stored in the greet variable
const graet = (name) => `Hello ${name}`; // return string value
// and you'd call it like this:
const result = graet("Karem");
console.log(result);

// empty parameter list requires parentheses
const sayHi = () => console.log("Hello Udacity Student!");
sayHi();

// multiple parameters requires parentheses
const orderIceCream = (flavor, cone) =>
  console.log(`Here's your ${flavor} ice cream in a ${cone} cone.`);
orderIceCream("chocolate", "waffle");

// this keyword in regular functions and methods
// creat video object using {}
const video = {
  title: "a",
  play() {
    console.log(this); // this refering the video object
  },
};
video.play();

// regular function
function playVideo() {
  console.log(this); // this refering the global(Window) object
}
playVideo();

// constructor function
function Video(title) {
  this.title = title;
  console.log(this); // this refering to a new empty object created from the constructor function by using new keyword
}
// creating a new object from Video constructor function
const v = new Video("b");

// this keyword in arrow function

// constructor function
function Icecream() {
  this.scoops = 0;
}
// add a method to prototype object property of Icecream
Icecream.prototype.addScoop = function () {
  console.log(this); // this outside the arrow function refereing to a new object from IceCream
  setTimeout(() => {
    console.log(this);
    this.scoops++; // the value of this inside an arrow function is the same as the value of this outside the function.
    console.log("scoop added!", this.scoops);
  }, 0.5);
};

const dessert = new Icecream();
dessert.addScoop();

// Default Function Parameters

function graetPerson(name = "Student", greating = "Welcome") {
  // name = typeof name !== "undefined" ? name : "Studnet";
  // greating = typeof greating !== "undefined" ? greating : "Welcome";
  console.log(`${greating} ${name}!`);
}

graetPerson(); // Welcome Student!
graetPerson("James"); // Welcome James!
graetPerson("Richard", "Howdy"); // Howdy Richard!

// Defaults and destructuring arrays

// The createGrid() function expects an array to be passed to it for destructuring .
// It uses destructuring to set the first item in the array to the width and the second item to be the height.
// if createGrid() is called without any argument then it will use the default empty array.
function createGrid([width = 5, height = 5] = []) {
  console.log(`Generates a ${width} x ${height} grid`);
}

createGrid([2, 3]); // Generates a 2 x 3 grid
createGrid();
createGrid([]);
createGrid([3, 1]); // Generates a 3 x 1 grid

// // Defaults and destructuring objects
function buildHouse({ floors = "1", color = "red", walls = "brick" } = {}) {
  return `Your house has ${floors} floor(s) with ${color} ${walls} walls.`;
}

console.log(buildHouse({ floors: 3, color: "yellow", walls: "soft" }));
console.log(buildHouse());

// Classe Preview

// ES6 class syntax and new keywords
class Dessert {
  constructor(calories = 250) {
    this.calories = calories;
  }
}
class IceCream extends Dessert {
  constructor(flavor, calories, toppings = []) {
    super(calories); // you must call the super consructor of the parent class
    this.flavor = flavor;
    this.toppings = toppings;
  }
  addTopping(topping) {
    this.toppings.unshift(topping);
  }
}

const icecream = new IceCream("Mango", 100, ["topping1", "topping2"]);
icecream.addTopping("topping3");
console.log(icecream);

class Plane {
  constructor(numEngines) {
    this.numEngines = numEngines;
    this.enginesActive = false;
  }
  startEngines() {
    console.log("starting engines...", this.numEngines);
    this.enginesActive = true;
  }
  static badWeather(palnes) {
    for (const palne of palnes) {
      palne.enginesActive = false;
    }
  }
}

//  create a "class" with ES5 code

// create constructor function
/*
function Plane(numEngines) {
  this.numEngines = numEngines;
  this.enginesActive = false;
  
}

// methods "inherited" by all instances created from Plane Constructor Function
Plane.prototype.startEngines = function () {
  console.log("starting engines...", this.numEngines);
  this.enginesActive = true;
};
*/

let richardsPlane = new Plane(1);
richardsPlane.startEngines();

let jamesPlane = new Plane(4);
jamesPlane.startEngines();
Plane.badWeather([richardsPlane, jamesPlane]);

// Subclasses with ES6

class Tree {
  constructor(
    size = "10",
    leaves = { spring: "green", summer: "green", fall: "orange", winter: null }
  ) {
    this.size = size;
    this.leaves = leaves;
    this.leafColor = null;
  }
  changeSeason(sesson) {
    this.leafColor = this.leaves[sesson];
    if (sesson === "spring") {
      this.size++;
    }
  }
}

class Maple extends Tree {
  constructor(syrupQty = 15, size, leaves) {
    super(size, leaves); // In a subclass constructor function, before this can be used, a call to the super class must be made.
    this.syrupQty = syrupQty;
  }
  changeSeason(sesson) {
    super.changeSeason(sesson);
    if (sesson === "sprinng") this.syrupQty++;
  }
  gatherSyrup() {
    this.syrupQty -= 3;
  }
}

class Vehicle {
  constructor(color = "blue", wheels = 4, horn = "beep beep") {
    this.color = color;
    this.wheels = wheels;
    this.horn = horn;
  }

  honkHorn() {
    console.log(this.horn);
  }
}

class Bicycle extends Vehicle {
  constructor(color, wheels = 2, horn = "honk honk") {
    super(color, wheels, horn);
  }
}

const bicycle = new Bicycle();
bicycle.honkHorn();
