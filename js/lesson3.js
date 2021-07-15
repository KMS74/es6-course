/* "ES6 Course From Udacity"
_______________________________________

    NOTES:
    1) Symbols are always different values, even if they have the same name. If we want same-named symbols to be equal,
     then we should use the global registry: Symbol.for(key) returns (creates if needed) a global symbol with key as the name.
  
   2) The iterable protocol is used for defining and customizing the iteration behavior of objects.
   3) The iterator protocol is used to define a standard way that an object produces a sequence of values.
   4) in order for an object to be iterable it must contain a default iterator method. This method will define how the object should be iterated. 
   5) you now have a process for defining how an object will iterate. This is done through implementing the .next() method.
   6) An object becomes an iterator when it implements the .next() method. The .next() method is a zero arguments function that returns an object with two properties:
      value : the data representing the next value in the sequence of values within the object
      done : a boolean representing if the iterator is done going through the sequence of values
   7) Sets are not indexed-based - you do not refer to items in a set based on their position,
     in the set items in a Set can’t be accessed individually.
  8) a Map is an object that lets you store key-value pairs where both the keys and the values can be objects, primitive values, or a combination of the two.
  9) A promise will let you start some work that will be done asynchronously and let you get back to your regular work.
  10) A Promise constructor takes a function(executor(resolve,reject) these function runs when the Promise is constructe  ) that will run and then, after some amount of time, will either complete successfully (using the resolve method) or unsuccessfully (using the reject method)
  11) "resolve" is used to indicate that this function should be called when the request completes successfully.
  12) the reject method is used when the request could not be completed.
  13) A JavaScript Proxy is an object that wraps another object (target) and intercepts the fundamental operations of the target object.
  14) Generators are a powerful new kind of function that is able to pause its execution while also maintaining its own state. 
  15) Generators are great for iterating over a list of items one at a time so
   you can handle each item on its own before moving on to the next one
  
  */

// Symbols: a symbol is a unique and immutable data type that is often used to identify object properties.
// To create a symbol, you write Symbol() with an optional string as its description.
const sym1 = Symbol("apple");
console.log(sym1); // Symbol(apple)
console.log(typeof sym1); // symbol
console.log(sym1.description);
const sym2 = Symbol("apple");

console.log(sym1 === sym2); // false
//  because the description is only used to describe the symbol.

// const bowl = {
//   apple: { color: "red", weight: 136.078 },
//   banana: { color: "yellow", weight: 183.15 }, // overriden by the new banana property
//   orange: { color: "orange", weight: 170.097 },
//   banana: { color: "yellow", weight: 176.845 },
// };

// Symbols in an object literal
// If we want to use a symbol in an object literal {...}, we need square brackets around it.

// each property is a unique Symbol and the first banana doesn’t get overwritten by the second banana.
const bowl = {
  [Symbol("apple")]: { color: "red", weight: 136.078 },
  [Symbol("banana")]: { color: "yellow", weight: 183.15 },
  [Symbol("orange")]: { color: "orange", weight: 170.097 },
  [Symbol("banana")]: { color: "yellow", weight: 176.845 },
};

console.log(bowl);

let id = Symbol("id");
let person = {
  name: "Jack",
  // adding symbol as a key
  [id]: 123, // not "id": 123
};

console.log(person); // {name: "Jack", Symbol(id): 123}

// Symbols are not included in for...in Loop

// using for...in
for (let key in person) {
  console.log(key, person[key]); // name Jack
}

// Iteration & Iterable Protocols

// strings and arrays are examples of built-in iterables.
// Sets and Maps are other examples of built-in iterables.
//  any object that is iterable can use the new for...of loop
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (const digite of digits) {
  console.log(digite);
}

// Set: is a collection of distinct items.
// a Set is an object that lets you store unique items.
//  You can add items to a Set, remove items from a Set, and loop over a Set. These items can be either primitive values or objects.

const games = new Set();
console.log(games);
games.add("Pubg");
games.add("Call of duty");
console.log(games);
// delete all items
games.clear();

// If you want to create a Set from a list of values, you use an array:
const sessons = new Set(["Summer", "Spring", "Winter", "fall"]);
sessons.delete("fall");
console.log(sessons);
console.log(sessons.add("fall"));

// Use the .size property to return the number of items in a Set:
console.log(sessons.size); // 4

// Use the .has() method to check if an item exists in a Set.
console.log(games.has("Pubg")); // false

// Retrieving All Values
console.log(sessons.values()); //  The return value of the .values() method is a SetIterator object.

const iterator = sessons.values();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

for (const sesson of sessons) {
  console.log(sesson);
}

const myFavoriteFlavors = new Set();
myFavoriteFlavors.add("chocolate chip");
myFavoriteFlavors.add("cookies and cream");
myFavoriteFlavors.add("strawberry");
myFavoriteFlavors.add("vanilla");
myFavoriteFlavors.delete("strawberry");

/*
What is a WeakSet?
A WeakSet is just like a normal Set with a few key differences:
  1) a WeakSet can only contain objects
  2) a WeakSet is not iterable which means it can’t be looped over
  3) a WeakSet does not have a .clear() method
*/

let student1 = { name: "James", age: 26, gender: "male" };
let student2 = { name: "Julia", age: 27, gender: "female" };
let student3 = { name: "Richard", age: 31, gender: "male" };

const roster = new WeakSet([student1, student2, student3]);
console.log(roster);
student3 = null;

// …but if you try to add something other than an object, you’ll get an error!
// roster.add('Amanda');  // Invalid value used in weak set

/*

Garbage Collection:
  In JavaScript, memory is allocated when new values are created
  and is "automatically" freed up when those values are no longer needed. 
 
  WeakSets take advantage of this(garbage collection) by exclusively working with objects. 
  If you set an object to null, then you’re essentially deleting the object.
   And when JavaScript’s garbage collector runs, the memory that object previously occupied will be freed up to be used later in your program.

*/
const uniqueFlavors = new WeakSet();

const flavor1 = { flavor: "chocolate" };
const flavor2 = { flavor: "Mango" };

uniqueFlavors.add(flavor1);
uniqueFlavors.add(flavor2);
uniqueFlavors.add(flavor1);

console.log(uniqueFlavors);

// Maps
// if Sets are similar to Arrays, then Maps are similar to Objects
//  because Maps store key-value pairs similar to how objects contain named properties with values.
const employees = new Map();
console.log(employees, typeof employees);

//  set(key,value)
employees.set("james.parkes@udacity.com", {
  firstName: "James",
  lastName: "Parkes",
  role: "Content Developer",
});
employees.set("julia@udacity.com", {
  firstName: "Julia",
  lastName: "Van Cleve",
  role: "Content Developer",
});
employees.set("richard@udacity.com", {
  firstName: "Richard",
  lastName: "Kalehoff",
  role: "Content Developer",
});

console.log(employees);

// To remove key-value pairs, simply use the .delete() method.
employees.delete("richard@udacity.com");
console.log(employees);

// remove all key-values
employees.clear();
console.log(employees);

const members = new Map();

members.set("Evelyn", 75.68);
members.set("Liam", 20.16);
members.set("Sophia", 0);
members.set("Marcus", 10.25);

if (members.has("Liam")) {
  console.log("Liam key is exist in the members Map = " + members.get("Liam"));
} else {
  console.log("Liam key not exist");
}

console.log(members.get("Sophia"));
console.log(members.get("Sara"));

// Looping Through Maps

const iteratorObjForKeys = members.keys(); // return MapIterator Object for Map keys
console.log(iteratorObjForKeys);
const iteratorObjForValues = members.values(); // // return MapIterator Object for Map keys
console.log(iteratorObjForValues);

console.log(iteratorObjForKeys.next());
console.log(iteratorObjForKeys.next());

console.log(iteratorObjForValues.next());
console.log(iteratorObjForValues.next());

for (const member of members) {
  console.log(member); // array [(0)key,(1)value]
}

// using array destructuring to split the key and its vlaue
for (const member of members) {
  const [key, value] = member;
  console.log(`${key} => ${value}`);
}
console.log("__________________________________________");

// forEach method
members.forEach((key, value) => console.log(`${key} => ${value}`));

/*

What is a WeakMap?
A WeakMap is just like a normal Map with a few key differences:

1) a WeakMap can only contain objects as keys,
2) a WeakMap is not iterable which means it can’t be looped and
3) a WeakMap does not have a .clear() method.

 WeakMap take advantage of this(garbage collection) by exclusively working with objects. 
  If you set an object to null, then you’re essentially deleting the object.
   And when JavaScript’s garbage collector runs, the memory that object previously occupied will be freed up to be used later in your program.

*/

const book1 = { title: "Pride and Prejudice", author: "Jane Austen" };
const book2 = { title: "The Catcher in the Rye", author: "J.D. Salinger" };
const book3 = { title: "Gulliver’s Travels", author: "Jonathan Swift" };

const library = new WeakMap();
library.set(book1, true);
library.set(book2, true);
library.set(book3, true);
console.log(library);

// for (const iterator of library) {
//   // console.log(iterator); // TypeError: library is not iterable
// }

// library.clear();   // library.clear is not a function

// …but if you try to add something other than an object as a key, you’ll get an error!
// library.set("The Grapes of Wrath", false);  // Invalid value used as weak map key

// Promise (Asynchronous Code)

// producing code
const promise = new Promise((resolve, reject) => {
  // doing operation taking alot of time!
  setTimeout(() => {
    const condition = true;
    let data = "";
    if (condition) {
      data = "these data fetched from api call";
      resolve(data);
    } else {
      reject("error!");
    }
  }, Math.random() * 30 + 3000);
});

// consuming code
promise.then(
  // The callback to execute when the Promise is resolved.
  (value) => {
    console.log(value);
  },
  // A Promise for the completion of which ever callback is executed.
  (error) => console.log(error)
);

// Proxies
// The key to making Proxies useful is the handler object that's passed as the second object to the Proxy constructor.
// The handler object is made up of a methods that will be used for property access.
// handler – is an object that contains methods to control the behaviors of the target
// the methods inside the handler object are called traps.
// target – is an object to wrap.

const targetObj = {
  name: "Karem",
};
const handlerObj = {
  // get tarp
  get(target, property) {
    return target[property];
  },
};
let proxy = new Proxy(targetObj, handlerObj);
console.log(proxy);
proxy.name; // this code runs get method of the handler object

// user object(target)
const user = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  age: 21, // must be greater than 18
};

// handler object
const handler = {
  // get tarp
  get(target, property) {
    return property === "fullName"
      ? `${target.firstName} ${target.lastName}`
      : target[property];
  },
  // set trap
  set(target, property, value) {
    if (property === "age") {
      if (typeof value != "number") {
        throw new Error("Age must be a number.");
      }
      if (value < 18) {
        throw new Error("The user must be 18 or older.");
      }
    }
    target[property] = value;
  },
};

// a proxy object
// The proxyUser object uses the user object to store data.
// The proxyUser can access all properties of the user object.
const proxyUser = new Proxy(user, handler);

//  access the firstName and lastName properties of the user object via the proxyUser object
console.log(proxyUser.firstName);
console.log(proxyUser.lastName);
console.log(proxyUser.email);

/* NOTES:
    - When you access a property of the user object via the proxyUser object, the get() method in the handler object is called.
    - The get() trap is fired when a property of the target object is accessed via the proxy object.
    - you can use the get() trap to define computed properties for the target object
    - The computed properties are properties whose values are calculated based on values of existing properties.
    - The set() trap controls behavior when a property of the target object is set.
*/

// if you modify the original object user, the change is reflected in the proxyUser
user.firstName = "Jane";
console.log(proxyUser.firstName);
// Similarly, a change in the proxyUser object will be reflected in the original object (user):

proxyUser.firstName = "Karem";
console.log(proxyUser.firstName);
proxyUser.lastName = "Shabana";
console.log(user);
console.log(proxyUser.fullName);
console.log(proxyUser.age);
// proxyUser.age = 16;
proxyUser.age = 22;
console.log(proxyUser.age);

// Generators
/*
function getEmployee() {
  console.log("the function has started");

  const names = [
    "Amanda",
    "Diego",
    "Farrin",
    "James",
    "Kagure",
    "Kavita",
    "Orit",
    "Richard",
  ];

  for (const name of names) {
    console.log(name);
  }

  console.log("the function has ended");
}

getEmployee();
*/
// Pausable Functions
// If we do want to be able to pause a function mid-execution,
//  then we'll need a new type of function available to us in ES6 generator functions!

/*
function* getEmployee() {
  console.log("the function has started");

  const names = [
    "Amanda",
    "Diego",
    "Farrin",
    "James",
    "Kagure",
    "Kavita",
    "Orit",
    "Richard",
  ];

  for (const name of names) {
    console.log(name);
  }

  console.log("the function has ended");
}
*/

/*
  NOTES:
       -the asterisk(*) indicates that this function is actually a generator!
       -The asterisk of the generator can actually be placed anywhere between the function keyword and
        the function's name.
       -When a generator is invoked, it doesn't actually run any of the code inside the function.
       - Instead, it creates and returns an iterator

*/

// getEmployee(); // no thing happen
// const generatorIterator = getEmployee();
// when the iterator's .next() method was called it ran all of the code inside the generator.
// NOTE: The code never paused! So how do we get this magical, pausing functionality?
// console.log(generatorIterator.next());

// The Yield Keyword
//  It can only be used inside generator functions. yield is what causes the generator to pause.

function* getEmployee() {
  console.log("the function has started");

  const names = [
    "Amanda",
    "Diego",
    "Farrin",
    "James",
    "Kagure",
    "Kavita",
    "Orit",
    "Richard",
  ];

  for (const name of names) {
    console.log(name);
    yield; 
  }

  console.log("the function has ended");
}

// If we invoke the generator (which produces an iterator) and then call .next(), we'll get the following output:
const generatorIterator = getEmployee();

for (let i = 0; i < 9; i++) {
  console.log(generatorIterator.next());
}
