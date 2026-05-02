let counter = 1;
let timer;

const contentDiv = document.querySelector('#content');
const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const resetBtn = document.querySelector('#reset');

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

function startTimer() {
  contentDiv.innerText = counter;
  counter++;
  timer = setTimeout(startTimer, 1000);
}

function stopTimer() {
  clearTimeout(timer);
}

function resetTimer() {
  counter = 0;
  stopTimer();
  contentDiv.innerText = counter;
}
