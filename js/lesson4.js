/*   What you learn :- 
      -callbacks
      -Asynchronous Programming(Promises,async/await)
   
*/

/*
  NOTES:-
    1) callback:a function that is passed to another function as a parameter.But that’s not all.
    2) Why do we need Callback Functions?
        JavaScript runs code sequentially in top-down order. However,
        there are some cases that code runs (or must run) after
        something else happens and also not sequentially.
        This is called asynchronous programming.

    3) Callbacks make sure that a function is not going to run before a task is completed
    but will run right after the task has completed. 
    It helps us develop asynchronous JavaScript code and keeps us safe from problems and errors.
            

*/

// we can pass functions as parameters to other functions and call them inside the outer functions.
function print(callback) {
  callback();
}

function test() {
  console.log("run callback");
}
print(test);

// running callback after 3 seconds
setTimeout(function () {
  console.log("Hello World");
}, 3000);

// JavaScript is an event-driven programming language.
//  We also use callback functions for event declarations.

// const btn = document.querySelector("#callback-btn");
// btn.addEventListener("click", () => alert("User has clicked on the button!"));

// callback hell

function step1(callback) {
  setTimeout(() => callback(1), 1000);
}
function step2(callback) {
  setTimeout(() => callback(2), 2000);
}
function step3(callback) {
  setTimeout(() => callback(3), 3000);
}

step1((step) => {
  console.log(`step ${step}`);
  step2((step) => {
    console.log(`step ${step}`);
    step3((step) => {
      console.log(`step ${step}`);
    });
  });
});

// To avoid this callback hell issue, ES6 introduced the promises that allow you to write asynchronous code in more manageable ways.

/*
  NOTES:-
    1) A promise in JavaScript is similar to a promise in real life.
        When we make a promise in real life, it is a guarantee that we are going to do something in the future.
      Because promises can only be made for the future.
    2) a Promise is an object. There are 3 states of the Promise object:
        -Pending: Initial State, before the Promise succeeds or fails
        -Resolved: Completed Promise
        -Rejected: Failed Promise
    3) The Promise constructor accepts a function as an argument. This function is called the executor.
    4) The executor accepts two functions with the names, by convention, resolve() and reject().
    5) When you call the new Promise(executor), the executor is called automatically.  
    6) then( ) for resolved Promises(NOTE:then() method Attaches callbacks for the resolution and/or rejection of the Promise.)
    7) catch( ) for rejected Promises(NOTE:catch method Attaches a callback for only the rejection of the Promise.)
    8) Once a new Promise object is created, it is in the pending state until it is resolved.
    To schedule a callback when the promise is either resolved or rejected,
     you call the methods of the Promise object: then(), catch(), and finally().


*/

// creating a promise
let condition = true;
const myPromise = new Promise((resolve, reject) => {
  if (condition) {
    resolve("Promise is resolved successfully.");
  } else {
    reject("Promise is rejected");
  }
});

// Chaining the promise(using the promise)
myPromise
  .then((value) => console.log(value))
  .catch((error) => console.log(error));

myPromise.then(
  (value) => console.log(value),
  (reason) => console.log(reason)
);

function makePromise(completed) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (completed) {
        resolve("I have completed learning JS.");
      } else {
        reject("I haven't completed learning JS yet");
      }
    }, 3000);
  });
}

let learnJs = makePromise(true);
learnJs.then(
  (success) => console.log(success),
  (reason) => console.log(reason)
);
// It is possible to schedule a callback to handle the fulfilled or rejected case only.
learnJs.then((success) => console.log(success));
learnJs.then(undefined, (reason) => console.log(reason));
// Internally, the catch() method invokes the then(undefined, onRejected) method.
learnJs.catch((reason) => console.log(reason));

// use finally() if you want to execute the same piece of code whether the promise is fulfilled or rejected.

learnJs
  .then((success) => console.log(success))
  .catch((reason) => console.log(reason))
  .finally(() => console.log("always run"));

// Practical JavaScript Promise example(load a JSON file from the serve)
function load(url) {
  return new Promise(function (resolve, reject) {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function (e) {
      if (this.readyState === 4) {
        if (this.status == 200) {
          resolve(this.response);
        } else {
          reject(this.status);
        }
      }
    };
    request.open("GET", url, true);
    request.send();
  });
}

const btn = document.querySelector("#btnGet");
const msg = document.querySelector("#message");
btn.onclick = function () {
  load("https://www.javascripttutorial.net/sample/promise/api.json").then(
    (response) => {
      const result = JSON.parse(response);
      msg.innerHTML = result.message;
    },
    (error) =>
      (msg.innerHTML = `Error getting the message, HTTP status: ${error}`)
  );
};

// Promise Chaining
/*
  NOTES:-
    1) you chains promises to execute asynchronous operations in sequence.
    2) The instance method of the Promise object such as then(), catch(), or finally() returns a separate promise object.
      Therefore, you can call the promise’s instance method on the return Promise.
    3) The successively calling methods in this way is referred to as the promise chaining.
    4) When you call the then() method multiple times on a promise, it is not promise chaining.
    5) If you chain promises, the catch() method will catch errors occurred in any promise.
    
    */

// create a new promise that resolves to the value 10 after 3 seconds:
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve(10), 3000);
});

p.then((value) => {
  console.log(value);
  return value * 2; // then() method returns a new Promise whose value is resolved to the return value(20)
})
  .then((value) => {
    // you can call the then() method on the return Promise
    console.log(value);
    return value * 3;
  })
  .then((value) => {
    console.log(value);
    return value * 4;
  })
  .catch((error) => console.log(error));

function generateNumber(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(num), 3000);
  });
}

generateNumber(10)
  .then((result) => {
    console.log(result); // 10
    return generateNumber(result * 2);
  })
  .then((result) => {
    console.log(result); // 20
    return generateNumber(result * 3);
  })
  .then((result) => console.log(result))
  .catch((error) => console.log(error)); // 60

/*
  Suppose that you want to perform the following asynchronous operations in sequence:
  1) Get the user from the database.
  2) Get the services of the selected user.
  3) Calculate the service cost from the user’s services.
  The following functions illustrate the three asynchronous operations:

  */
function getUser(userId) {
  return new Promise((resolve, reject) => {
    console.log("Get the user from the database.");
    setTimeout(() => {
      resolve({
        userId: userId,
        username: "Karem",
      });
    }, 1000);
  });
}

function getServices(user) {
  return new Promise((resolve, reject) => {
    console.log(`Get the services of ${user.username} from the API.`);
    setTimeout(() => {
      resolve(["Email", "VPN", "CDN"]);
    }, 3 * 1000);
  });
}

function getServiceCost(services) {
  return new Promise((resolve, reject) => {
    console.log(`Calculate the service cost of ${services}.`);
    setTimeout(() => {
      resolve(services.length * 100);
    }, 2 * 1000);
  });
}

// syntax 1: you have multiple asynchronous tasks that you want to execute in sequence. In addition, you need to pass the result of the previous step to the next one.
getUser(100)
  .then((user) => getServices(user))
  .then((services) => getServiceCost(services))
  .then((cost) => console.log(`the cost = ${cost}`));

// syntax 2: If you need to pass the result from the previous task to the next one without passing the result.
getUser(200)
  .then(getServices)
  .then(getServiceCost)
  .then((cost) => console.log(`the cost = ${cost}`));

// Promise.all()
/*
  NOTES:-
    1) a static method used to aggregate(تجميع) results from multiple asynchronous operations.
    2) Promise.all([array of promises])
    Creates a Promise that is resolved with an array of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
    3) If all the input promises resolve, it returns a new Promise that resolves to an array of resolved values from the input promises, in an iterator order.
    4) If one of the input promises rejects, it returns  a new Promise that rejects with the rejection reason from the first rejected promise
     */

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // console.log("The first promise has resolved");
    // resolve(10);
    console.log("The first promise has rejected");
    reject("Promise One Failed");
  }, 1 * 1000);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("The second promise has resolved");
    resolve(20);
    // console.log("The second promise has rejected");
    // reject("Promise Two Failed");
  }, 2 * 1000);
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("The third promise has resolved");
    resolve(30);
  }, 3 * 1000);
});

// To wait for all three promises to resolve, you use the Promise.all() method.
// When all promises have resolved, the values from these promises are passed into the callback of the then() method as an array.
Promise.all([p1, p2, p3])
  .then((results) => {
    console.log(results);
    let sum = 0;
    for (const result of results) {
      sum += result;
    }
    console.log(`The Total = ${sum}`);
  })
  .catch((error) => console.log(`The reason is ${error}`));

// Promise.race()
/*
  NOTES:-
  1) The name of Promise.race() implies that all the promises race against each other with a single winner, either resolved or rejected.
  2) a static method that accepts a list of promises and returns a promise
   that fulfills or rejects as soon as there is one promise that fulfills or rejects, with the value or reason from that promise.

*/

//  Because the first promise is faster than other promises, the return promise resolves or rejects to the value or reason from the first promise
Promise.race([
  p1,
  p2.then(
    (result) => console.log(`the result = ${result}`),
    (error) => console.log(`the error : ${error}`)
  ),
])
  .then((result) => console.log(`Resolved ${result}`))
  .catch((error) => console.error(error));

// Promise Error Handling
/*
  NOTES:-
    1) If you chain promises, the catch() method will catch errors occurred in any promise.
    2) missing the catch() method it will cause a runtime error and terminate the program.
*/

// 1) Errors ouside the Promises
/*
function getUserById(id) {
  // throw an error outside the promise
  if (typeof id !== "number" || id <= 0) {
    throw new Error("Invalid id argument");
  }
  return new Promise((resolve, reject) => {
    setTimeout(
      () =>
        resolve({
          id: id,
          username: "Karem",
        }),
      1000
    );
  });
}
handle the promise

getUserById("a")
  .then((user) => console.log(user.username))
  .catch((err) => console.log(err));
console.log("next");
console.log("next...");

Uncaught Error: Invalid id argument
it will cause a runtime error and terminate the program

When you raise an exception outside the promise, you must catch it with try/catch:
try {
  getUserById("a")
    .then((user) => console.log(user.username))
    .catch((error) => console.log(error));
} catch (error) {
  console.log(`Caught by try/catch ${error}`);
}
console.log("next");
console.log("next...");
*/

// 2) Errors inside the Promises
let authorized = false;

function getUserById(id) {
  return new Promise((resolve, reject) => {
    // throw an error insisde the promise
    if (!authorized) {
      // Throwing an error has the same effect as calling the reject()
      reject("Unauthorized access to the user data");
      // throw new Error("Unauthorized access to the user data");
    }

    resolve({
      id: id,
      username: "admin",
    });
  });
}

// If you throw an error inside the promise, the catch() method will catch it, not the try/catch.
try {
  getUserById(10)
    .then((user) => console.log(user.username))
    .catch((error) => console.log(`caught by .catch ${error}`));
  console.log("next");
} catch (error) {
  console.log(`Caught by try/catch ${error}`);
}
console.log("next..");

// JavaScript async/await
/*
  NOTES:-
    1) ES2017 introduced the async/await keywords that build on top of promises,
     allowing you to write asynchronous code that looks more like synchronous code and more readable.
    2) the async / await is syntactic sugar for promises. 
    3) you use the await keyword to wait for a Promise to settle either in resolved or rejected state. 
    And you can use the await keyword only inside an async function.
    4) The async keyword allows you to define a function that handles asynchronous operationsa and it always returns a Promise.
    5) If a promise resolves, the await promise returns the result
    . However, when the promise rejects, the await promise will throw an error as if there were a throw statement.
    6) Note that if you use the await operator outside of an async function, you will get an error.

*/

// async means that the function returns a promise and we can channing the return promise.
async function sayHi(name) {
  return `Hi ${name}`;
}
// You can also explicitly return a Promise
async function sayHello(name) {
  return Promise.resolve(`Hello ${name}`);
}

sayHi("Ali").then((value) => console.log(value));

async function display() {
  //  the await keyword instructs JavaScript engine to wait for the function (promise) to complete before displaying the message.
  let result = await sayHello("Ola");
  console.log(result);
}

display();

// The following defines an async function that calls the three asynchronous operations in sequence:
async function showServiceCost() {
  try {
    let user = await getUser(40);
    let services = await getServices(user);
    let cost = await getServiceCost(services);
    console.log(`The service cost is ${cost}`);
    return cost;
  } catch (error) {
    console.log(error);
  }
}

showServiceCost().then((value) => console.log(`value = ${value}`));

//  catching errors
async function getListItesm(id) {
  try {
    const user = await Promise.reject(new Error("Invalid list's Id = " + id));
  } catch (error) {
    // handel the errors.
    console.log(error);
  }
}

getListItesm(80);
