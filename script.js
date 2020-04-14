const timeControlBtns = document.querySelectorAll(".time-control");
const sessionTime = document.querySelector(".session-time");
const breakTime = document.querySelector(".break-time");
const timer = document.querySelector(".timer");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

// initialize
let inSession = true;
let paused = false;
let sessionMinutes = sessionTime.value;
let sessionSeconds = 0;
let breakMinutes = breakTime.value;
let breakSeconds = 0;

function updateDisplay(minutes, seconds) {
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  timer.textContent = `${minutes}:${seconds}`;
}

function addMinute(element) {
  let count = parseInt(element.value);
  count++;
  element.value = count;
  element === sessionTime ? (sessionMinutes = count) : (breakMinutes = count);
}

function subtractMinute(element) {
  let count = parseInt(element.value);
  count--;
  element.value = count;
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

// function to start timer countdown
function startTimer(duration) {
  let countdown = duration * 60;

  setInterval(function () {
    updateDisplay(parseInt(countdown / 60, 10), parseInt(countdown % 60, 10));
    if (paused) {
      return;
    }

    if (--countdown < 0) {
      if (inSession) {
        countdown = breakMinutes * 60;
        inSession = false;
      } else {
        countdown = duration;
        inSession = true;
      }
    }
  }, 1000);
}

function timeIt() {
  manageControlBtns(false);
  sessionMinutes = sessionTime.value;
  startBtn.removeEventListener("click", timeIt);
  startTimer(sessionMinutes);
}

startBtn.addEventListener("click", timeIt);

resetBtn.addEventListener("click", function () {
  manageControlBtns(true);
});

pauseBtn.addEventListener("click", function () {
  if(paused === true){
    paused = false;
  }
  else (paused === false){
    paused = true;
  }
});

manageControlBtns(true);

updateDisplay(sessionMinutes, sessionSeconds);