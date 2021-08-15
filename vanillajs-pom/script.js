const sessions = {
	work: {
		length: 10,
		title: "Work Pom",
	},
	short: {
		length: 3,
		title: "Short Break",
	},
	long: {
		length: 5,
		title: "Long Break",
	},
};

let currentSession = "work";
let numberOfSessions = 0;
let sessionStart = undefined;
let timerTime = setTimerTime();
setTimerText(getTimerTextNode());

const body = document.querySelector("body");
body.addEventListener("click", editTimer);

const pomBtns = document.querySelectorAll(".pom-btn");
pomBtns.forEach(pomBtn => {
	pomBtn.addEventListener("click", setSession);
});

const timerBtns = document.querySelectorAll(".timer-control");
timerBtns.forEach(timerBtn => {
	timerBtn.addEventListener("click", timerControl);
});

function editTimer(e) {
	if (e.target.className === "timer-text") {
		clearInterval(sessionStart);
		const input = document.createElement("input");
		input.setAttribute("type", "text");
		input.setAttribute("value", parseInt(e.target.innerText));
		input.setAttribute("autofocus", "");
		input.addEventListener("focusout", () => {
			sessions[currentSession].length = parseInt(input.value);
			timerTime = setTimerTime();
			const span = document.createElement("span");
			span.setAttribute("class", "timer-text");
			setTimerText(span);
			input.replaceWith(span);
			updateButtons("reset");
		});
		e.target.replaceWith(input);
	}
}

function setSession(e) {
	clearInterval(sessionStart);
	updateButtons("reset");
	document.querySelector(".pom-btn.active").classList.remove("active");
	e.target.classList.add("active");
	currentSession = e.target.id;
	timerTime = setTimerTime();
	document.querySelector(".session-title").innerText = sessions[currentSession].title;
	setTimerText(getTimerTextNode());
}

function timerControl(e) {
	updateButtons(e.target.id);
	if (e.target.id == "start") {
		sessionStart = setInterval(() => {
			if (timerTime > 0) {
				timerTime--;
				console.log(timerTime);
				setTimerText(getTimerTextNode());
			} else {
				clearInterval(sessionStart);
				currentSession = currentSession == "work" ? "short" : "work";
				updateToNextSession();
			}
		}, 1000);
	} else if (e.target.id == "stop") {
		clearInterval(sessionStart);
	} else if (e.target.id == "reset") {
		clearInterval(sessionStart);
		timerTime = sessions[currentSession].length;
		setTimerText(getTimerTextNode());
	}
}

function updateToNextSession() {
	document.querySelectorAll(".pom-btn").forEach(pomBtn => {
		if (pomBtn.id == currentSession) {
			pomBtn.classList.add("active");
		} else {
			pomBtn.classList.remove("active");
		}
	});
	document.querySelector(".session-title").innerText = sessions[currentSession].title;
	timerTime = setTimerTime();
	setTimerText(getTimerTextNode());
	updateButtons("reset");
}

function updateButtons(ctrl) {
	const startBtn = document.querySelector("button#start");
	const stopBtn = document.querySelector("button#stop");
	if (ctrl == "stop") {
		startBtn.innerText = "Resume";
		startBtn.disabled = false;
		stopBtn.disabled = true;
	} else if (ctrl == "start") {
		startBtn.innerText = "Start";
		startBtn.disabled = true;
		stopBtn.disabled = false;
	} else if (ctrl == "reset") {
		startBtn.innerText = "Start";
		startBtn.disabled = false;
		stopBtn.disabled = true;
	}
	setDisabled(startBtn);
	setDisabled(stopBtn);
}

function setDisabled(btn) {
	if (btn.disabled) {
		btn.classList.add("disabled");
	} else {
		btn.classList.remove("disabled");
	}
}

function setTimerText(node) {
	let timerMinText = getMinutes(timerTime);
	let secondsLeft = getSeconds(timerTime);
	let timerSecText = formatSeconds(secondsLeft);
	timerMinText = `${getMinutes(timerTime)}`;
	secondsLeft = getSeconds(timerTime);
	timerSecText = secondsLeft >= 10 ? `${secondsLeft}` : `0${secondsLeft}`;
	node.innerText = `${timerMinText}:${timerSecText}`;
}

function setTimerTime() {
	return sessions[currentSession].length;
}

function getMinutes(seconds) {
	return Math.floor(seconds / 60);
}

function getSeconds(seconds) {
	return Math.floor(seconds % 60);
}

function formatSeconds(seconds) {
	return seconds >= 10 ? seconds : `0${seconds}`;
}

function getTimerTextNode() {
	return document.querySelector(".timer-text");
}

window.addEventListener("load", () => {
	setTimerText(getTimerTextNode());
});
