const timeControlBtns = document.querySelectorAll(".time-control");
const sessionTime = document.querySelector(".session-time");
const breakTime = document.querySelector(".break-time");
const timer = document.querySelector(".timer");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const displayMinutes = document.querySelector(".display-minutes");
const displaySeconds = document.querySelector(".display-seconds");
const shortBreak = document.getElementById("shortBreak");
const longBreak = document.getElementById("longBreak");

// initialize
let inSession = true;
let paused = false;
let sessionMinutes = sessionTime.textContent;
let sessionSeconds = 0;
let breakMinutes = breakTime.textContent;
let breakSeconds = 0;

function updateDisplay(minutes, seconds) {
  seconds = seconds < 10 ? "0" + seconds : seconds;
  displayMinutes.textContent = minutes;
  displaySeconds.textContent = seconds;
  document.title = `${minutes}:${seconds}`;
}

function addMinute(element) {
  let count = parseInt(element.textContent);
  count++;
  element.textContent = count;
  element === sessionTime ? (sessionMinutes = count) : (breakMinutes = count);
}

function subtractMinute(element) {
  let count = parseInt(element.textContent);
  if (count > 1) {
    count--;
  }
  element.textContent = count;
  element === sessionTime ? (sessionMinutes = count) : (breakMinutes = count);
}

function controlTime(e) {
  if (e.target.classList.contains("up-session")) {
    addMinute(sessionTime);
    updateDisplay(sessionMinutes, sessionSeconds);
  } else if (e.target.classList.contains("down-session")) {
    subtractMinute(sessionTime);
    updateDisplay(sessionMinutes, sessionSeconds);
  } else if (e.target.classList.contains("up-break")) {
    addMinute(breakTime);
  } else {
    subtractMinute(breakTime);
  }
}

// add/remove event listener for control btns
function manageControlBtns(enabled) {
  timeControlBtns.forEach((controlBtn) => {
    if (enabled) {
      controlBtn.addEventListener("click", controlTime);
    } else {
      controlBtn.removeEventListener("click", controlTime);
    }
  });
}

let timerInterval;

// function to start timer countdown
function startTimer() {
  toggleTimerColor();

  let countdown =
    parseInt(displayMinutes.textContent * 60) +
    parseInt(displaySeconds.textContent);
  timerInterval = setInterval(function () {
    countdown--;
    updateDisplay(parseInt(countdown / 60, 10), parseInt(countdown % 60, 10));
    if (paused) {
      console.log("paused activated");
      return;
    }

    if (countdown === 0) {
      if (inSession) {
        countdown = breakMinutes * 60 + 1;
        inSession = false;
      } else {
        countdown = sessionMinutes * 60 + 1;
        inSession = true;
      }
    }
  }, 1000);
}

function timeIt() {
  paused = false;
  manageControlBtns(false);
  startBtn.removeEventListener("click", timeIt);
  startTimer();
}

function pauseTimer() {
  clearInterval(timerInterval);
  startBtn.addEventListener("click", timeIt);
}

function takeBreak(num) {
  clearInterval(timerInterval);
  updateDisplay(num, 00);
  inSession = false;
  startTimer();
}

function toggleTimerColor() {
  if (inSession == false) {
    timer.classList.add("breakActive");
    timer.classList.remove("timerActive");
  } else if (inSession == true) {
    timer.classList.add("timerActive");
    timer.classList.remove("breakActive");
  }
}

startBtn.addEventListener("click", timeIt);

resetBtn.addEventListener("click", function () {
  manageControlBtns(true);
  startBtn.addEventListener("click", timeIt);
  sessionMinutes = sessionTime.textContent;
  clearInterval(timerInterval);
  updateDisplay(sessionMinutes, sessionSeconds);
  timer.classList.remove("timerActive");
  timer.classList.remove("breakActive");
  inSession = true;
});

pauseBtn.addEventListener("click", pauseTimer);

manageControlBtns(true);

updateDisplay(sessionMinutes, sessionSeconds);

shortBreak.addEventListener("click", () => {
  takeBreak(5);
});
longBreak.addEventListener("click", () => {
  takeBreak(15);
});
