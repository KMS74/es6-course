// Fetch() Method:
// The Fetch API is a modern interface that allows you to make HTTP requests to servers from web browsers(Promise-based).
// When the request completes, the resource is available. At this time, the promise will resolve into a Response object.
// in Fetch() method you have to manually transform data

// return a promise that resolves into a Response object
fetch("https://www.javascripttutorial.net/sample/promise/api.json")
  .then((response) => {
    // json method returns a promise
    return response.json();
  })
  .then((json) => {
    console.log(json);
  })
  .catch((error) => console.log(error));

// In practice, you often use the async/await with the fetch() method like this:
async function fetchText() {
  try {
    let response = await fetch(
      "https://www.javascripttutorial.net/sample/promise/api.json"
    );
    if (response.status === 200) {
      let data = await response.json(); // json method returns a promise
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

fetchText()
  .then((json) => console.log(json))
  .catch((error) => console.log(error));
