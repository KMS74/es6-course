/* "ES6 Course From Udacity"
_______________________________________

    NOTES:
    1) Before the function is executed, all variables with var keyword are hoisted to the top of the function scope.
    2) Variables declared with let and const are only available within the block they're declared.
    3) use let when you plan to reassign new values to a variable, and
    use const when you don’t plan on reassigning new values to a variable.
    4) Template literals are essentially string literals that include embedded expressions.
    5) In ES6, you can extract data from arrays and objects into distinct variables using destructuring.
    6) When the properties of an object have the same name as the variables being assigned to them
       remove those duplicate variables names from object properties.
    7) The spread operator, written with three consecutive dots ( ... ), 
       is new in ES6 and gives you the ability to expand, or spread, iterable objects into multiple elements.
    8) If you can use the spread operator to spread an array into multiple elements,
      then certainly there should be a way to bundle multiple elements back into an array, right?
    9) In fact, there is! It’s called the rest parameter, and it’s another new addition in ES6.
    10) The rest parameter, also written with three consecutive dots ( ... ), allows you to represent an indefinite number of elements as an array. 

*/

// Using let, const keywords
function getClothing(isCold) {
  if (isCold) {
    const freezing = "Grab a jacket!";
  } else {
    const hot = "It’s a shorts kind of day.";
    // console.log(freezing);
    console.log(hot);
  }
}
// calling the function
getClothing(false);

const student = {
  name: "Richard Kalehoff",
  guardian: "Mr. Kalehoff",
};

const teacher = {
  name: "Mrs. Wilson",
  room: "N231",
};

// Using Template Literals  `${experision}`
let message = `${student.name} please see ${teacher.name} in ${teacher.room} to pick up your report card.`;
console.log(message);

// Using Destructuring

// Extracting value from an array
const points = [10, 20.5, 40];
// Bad Extracting:
// const x = points[0];
// const y = points[1];
// const z = points[2];

// Good Extracting:
const [x, , z] = points;
console.log(x, z); // 10 40

let positions = ["Gabrielle", "Jarrod", "Kate", "Fernando", "Mike", "Walter"];
let [first, second, third] = positions;

// Extracting value from an object
const gemstone = {
  type: "quartz",
  color: "rose",
  carat: 21.29,
};
// Bad Extracting:
// const type = gemstone.type;
// const color = gemstone.color;
// const carat = gemstone.carat;

// Good Extracting:
const { type: kind, color, carat } = gemstone; // kind is alise for tyep
console.log(kind, color, carat); // quartz rose 21.29

const circle = {
  radius: 10,
  color: "orange",
  getArea: function () {
    return Math.PI * this.radius * this.radius;
  },
  getCircumference: function () {
    return 2 * Math.PI * this.radius;
  },
};

let { radius, getArea, getCircumference } = circle;

console.log(radius); // 10
console.log(getArea()); // NaN
console.log(getCircumference()); // NaN

let area = circle.getArea;
area(); // return NaN also since there is no access to this in the circle object

// NOTE: When you destructure the object and store the getArea() method into the getArea variable,
//  it no longer has access to this in the circle object which results in an area that is NaN.

console.log(circle.getArea()); // 314.1592653589793

// Using Object literal shorthand:
const productName = "iPhone12";
const price = 1000;

// unnecessary repetition in your code(Bad Code)
/*
const Product = {
  productName: productName,
  price: price,
  getProductPrice: function () {
    return this.price;
  },
};
*/

// Good Code
const Product = {
  productName,
  price,
  getProductPrice() {
    return this.price;
  },
};

console.log(Product.productName);
console.log(Product.getProductPrice());

// Using Iteration:
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// add method to Array prototype object
Array.prototype.decimalfy = function () {
  for (let i = 0; i < this.length; i++) {
    this[i] = this[i].toFixed(2);
  }
};

// for loop
for (let i = 0; i < digits.length; i++) {
  console.log(digits[i]);
}
console.log("_________________________________________________");

// for...in loop:s
// 1) eliminating the counting logic and exit condition but,
//    you still have to deal with the issue of using an index to access the values of the array.
// 2) if you add any additional properties to the array's prototype, then those properties will also appear in the for..in loop.
// 3) You can stop or break a for...of loop at anytime.

for (const index in digits) {
  if (digits[index] === 5) {
    continue;
  }
  console.log(digits[index]);
}
// looping through object properties
for (const key in gemstone) {
  console.log(`${key} => ${gemstone[key]}`);
}
console.log("_________________________________________________");

//  forEach loop (Array Method)
digits.forEach((item) => console.log(item));
console.log("_________________________________________________");

// for...of loop(is used to loop over any type of data that is iterable.)
// You can stop or break a for...of loop at anytime.
// And you don’t have to worry about adding new properties to objects. The for...of loop will only loop over the values in the object.

for (const digite of digits) {
  if (digite % 2 === 0) {
    continue;
  }
  console.log(digite);
}

const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

/*
Write a for...of loop that:
1) loops through each day in the days array.
2) capitalizes the first letter of the day
and prints the day out to the console.
*/

for (let day of days) {
  day = day.charAt(0).toUpperCase() + day.substr(1);
  console.log(day);
}
// Using spread operator
const books = [
  "Don Quixote",
  "The Hobbit",
  "Alice in Wonderland",
  "Tale of Two Cities",
];

const primes = new Set([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);

console.log(books);
console.log(...books);

console.log(primes);
console.log(...primes);

// NOTE: notice that both the array and set have been expanded into their individual elements. So how is this useful?

// 1) One example of when the spread operator can be useful is when combining Objects.

const fruits = ["apples", "bananas", "pears"];
const vegetables = ["corn", "potatoes", "carrots"];

// This code actually adds the fruits array at the first index and the vegetables array at the second index of the produce array(arry of arrays).
// const produce = [fruits, vegetables];

// Combining arrays with concat
// const produce = fruits.concat(vegetables);  // This isn’t terrible, but wouldn’t it be nice if there was a shorthand way to write this code?

// Compining arrays with spread operator
const produce = [...fruits, ...vegetables];

console.log(produce);

// 1) Second example of when the spread operator can be useful is when clonning Objects.

const clonedFruits = [...fruits];
console.log(clonedFruits);

const clonedGemstone = { ...gemstone };
console.log(clonedGemstone);

// Using Rest parameter
// 1) One situation is when assigning the values of an array to variables. For example,

const order = [20.17, 18.67, 1.5, "cheese", "eggs", "milk", "bread"];
const [total, subtotal, tax, ...items] = order; // By using the rest parameter, items is assigned the rest of the values in the array (as an array).

// 2) Another use case for the rest parameter is when you’re working with variadic functions.
// Variadic functions: are functions that take an indefinite number of arguments.

// function calculates the sum of an indefinite amount of numbers

function sum(...numbers) {
  let total = 0;
  for (const num of numbers) {
    // uses for...of loop to loop over any type of data that is iterable.
    total += num;
  }
  return total;
}

// calling the functions with diffrent numbers of arguements
console.log(sum(10, 20));
console.log(sum(10, 20, 30));
console.log(sum(10, 20, 30, 40, 50, -20));

function average(...numbers) {
  let length = numbers.length;
  let total = 0.0;
  if (length === 0) return 0;
  for (const number of numbers) {
    total += number;
  }
  return total / length;
}
console.log(average());
console.log(average(2, 6));
console.log(average(2, 3, 3, 5, 7, 10));
console.log(average(7, 1432, 12, 13, 100));

// spread sperator VS rest parameter
// You can think of the rest parameter like the opposite of the spread operator;
// if the spread operator is like unboxing all of the contents of a package,
//  then the rest parameter is like taking all the contents and putting them back into the package.

const myPackage = ["cheese", "eggs", "milk", "bread"];

console.log(...myPackage); // spread sperator

function printPackageContent(...items) {
  // rest parameter
  for (const item of items) {
    console.log(item);
  }
}
console.log("___________________________________");
printPackageContent("cheese", "eggs", "milk", "bread");
