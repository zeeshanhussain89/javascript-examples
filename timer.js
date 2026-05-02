let count = 0;
function generateNumbers() {
  console.log(count++);
}

// generateNumbers();

setInterval(generateNumbers, 1000);

// ---------------------------------------------

let counter = 0;
function generateNumberViaTimeout() {
  console.log(counter++);
  setTimeout(generateNumberViaTimeout, 1000);
}
// function generator() {
//     setTimeout(generateNumberViaTimeout, 1000);
// }
// generator();
setTimeout(generateNumberViaTimeout, 1000);

// -----------------------------------

let count = 1;

function generateNumbers() {
  console.log(count++);
  if (count > 10) {
    clearInterval(interval);
  }
}

// generateNumbers();

let interval = setInterval(generateNumbers, 1000);

// --------------------------------------

let counter = 1;

function generateNumberViaTimeout(n) {
  console.log(counter++);
  if (counter <= n) {
    setTimeout(generateNumberViaTimeout.bind(null, n), 1000);
  }
}
// function generator() {
//     setTimeout(generateNumberViaTimeout, 1000);
// }
// generator();
setTimeout(generateNumberViaTimeout.bind(null, 5), 1000);

// ------------------------------------
