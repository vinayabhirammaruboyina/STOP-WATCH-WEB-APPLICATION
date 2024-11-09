let timerInterval;
let elapsedTime = 0; 
let isRunning = false;
let lapCount = 0;

const display = document.getElementById('display');
const lapList = document.getElementById('lapList');

document.getElementById('startBtn').onclick = () => startTimer();
document.getElementById('stopBtn').onclick = () => stopTimer();
document.getElementById('resetBtn').onclick = () => resetTimer();
document.getElementById('lapBtn').onclick = () => recordLap();

const startTimer = () => {
    if (!isRunning) {
        isRunning = true;
        toggleButtons(true);
        timerInterval = setInterval(() => {
            elapsedTime += 10;
            display.textContent = formatTime(elapsedTime);
        }, 10);
    }
};

const stopTimer = () => {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
        toggleButtons(false);
    }
};

const resetTimer = () => {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = '00:00:00.00';
    lapList.innerHTML = '';
    lapCount = 0;
    toggleButtons(false);
};

const recordLap = () => {
    if (isRunning) {
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${++lapCount}: ${formatTime(elapsedTime)}`;
        lapList.appendChild(lapItem);
    }
};

const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const milliseconds = String(ms % 1000).padStart(3, '0').slice(0, 2);
    return `${String(Math.floor(totalSeconds / 3600)).padStart(2, '0')}:${String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')}:${String(totalSeconds % 60).padStart(2, '0')}.${milliseconds}`;
};

const toggleButtons = (running) => {
    document.getElementById('startBtn').disabled = running;
    document.getElementById('stopBtn').disabled = !running;
    document.getElementById('lapBtn').disabled = !running;
};


const themeSelect = document.getElementById('themeSelect');
