// Practical JavaScript Promise.race() example

const DATA_LOAD_TIME = 5000; // 5 seconds
const TIMEOUT = 500;  // 0.5 second

function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("get data from the sever");
      const message = "Promise.race() Demo";
      resolve(message);
    }, DATA_LOAD_TIME);
  });
}

function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("timeout promise");
      reject();
    }, ms);
  });
}

function showContent(message) {
  document.querySelector("#message").textContent = message;
}

function showLoadingIndicator() {
  document.querySelector("#loader").className = "loader";
}

function hideLoadingIndicator() {
  document.querySelector("#loader").className = "";
}

// handle button click event
const btn = document.querySelector("#btnGet");
btn.addEventListener("click", () => {
  // reset UI if users click the 2nd, 3rd, ... time
  reset();
  // show content or loading indicator
  //   if the first promise takes more than 500 ms to settle, the catch() is called to show the loading indicator.
  //  Once the first promise resolves, it hides the loading indicator.
  Promise.race([
    getData()
      .then((data) => showContent(data))
      .then(hideLoadingIndicator),
    timeout(TIMEOUT),
  ]).catch(showLoadingIndicator);
});

// reset UI
function reset() {
  hideLoadingIndicator();
  showContent("");
}

