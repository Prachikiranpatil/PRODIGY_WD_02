let timer; // To store the interval
let running = false; // To track if the stopwatch is running
let lapCounter = 1; // Counter for lap numbers

function startStop() {
    if (running) {
        clearInterval(timer);
        document.getElementById("startStop").innerText = "Start";
        document.getElementById("startStop").classList.remove("pause");
        running = false;
    } else {
        timer = setInterval(updateDisplay, 10);
        document.getElementById("startStop").innerText = "Pause";
        document.getElementById("startStop").classList.add("pause");
        running = true;
    }
}

function updateDisplay() {
    let display = document.getElementById("display");
    let currentTime = new Date().getTime();
    let startTime = parseInt(display.dataset.startTime) || currentTime;
    let elapsedTime = currentTime - startTime;
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    display.innerText = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
    display.dataset.startTime = startTime;
}

function reset() {
    clearInterval(timer);
    let display = document.getElementById("display");
    display.innerText = "00:00:00";
    display.dataset.startTime = null;
    document.getElementById("startStop").innerText = "Start";
    document.getElementById("startStop").classList.remove("pause");
    running = false;
    lapCounter = 1;
    document.getElementById("laps").innerHTML = "";
}

function recordLap() {
    if (!running) return;
    let display = document.getElementById("display").innerText;
    let lapList = document.getElementById("laps");
    let lapItem = document.createElement("li");
    lapItem.innerText = `Lap ${lapCounter++}: ${display}`;
    lapList.insertBefore(lapItem, lapList.firstChild);
}

function pad(num) {
    return num < 10 ? "0" + num : num;
}
