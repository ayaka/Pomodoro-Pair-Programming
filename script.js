const timeControlBtns = document.querySelectorAll('.timecontrol');
const sessionTime = document.querySelector('.session-time')
const breakTime = document.querySelector('.break-time')
const timer = document.querySelector('.timer')

const controlBtn = document.querySelectorAll('.controls')

const upBtn = document.querySelector('.up-session');
const downBtn = document.querySelector('.down-session'); 

const upBtnBreak = document.querySelector('.up-break');
const downBtnBreak = document.querySelector('.down-break'); 

const startBtn = document.getElementById('start');

//function to increment session minutes
let count = parseInt(sessionTime.value)
upBtn.addEventListener('click', addMinute);
downBtn.addEventListener('click', subtractMinute);

function updateDisplay(){
    timer.innerHTML = sessionTime.value;
}
function addMinute(e){
    count++;
    sessionTime.value = count;
    updateDisplay();
}

function subtractMinute(e){
    count--;
    sessionTime.value = count;
    updateDisplay();
}

//function to increment break minutes
let countBreak = parseInt(breakTime.value)

upBtnBreak.addEventListener('click', addMinuteBreak);
downBtnBreak.addEventListener('click', subtractMinuteBreak);

function addMinuteBreak(e){
    countBreak++;
    breakTime.value = countBreak;
}

function subtractMinuteBreak(e){
    countBreak--;
    breakTime.value = countBreak;
}


let d = new Date()

//function to start timer countdown
function startTimer(duration, timer) {
    let actualMinutes = duration * 60;
    var countdown = actualMinutes, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(countdown / 60, 10)
        seconds = parseInt(countdown % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timer.textContent = minutes + ":" + seconds;

        if (--countdown < 0) {
            countdown = duration; //this is where we add the break time after 0
        }
    }, 1000);
}

startBtn.addEventListener('click', function(){
    startTimer(count, timer)
})


updateDisplay()