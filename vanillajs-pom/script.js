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
			const startBtn = document.querySelector("button#start");
			startBtn.innerText = "Start";
			startBtn.removeAttribute("disabled");
		});
		e.target.replaceWith(input);
	}
}

function setSession(e) {
	document.querySelector(".pom-btn.active").classList.remove("active");
	e.target.classList.add("active");
	currentSession = e.target.id;
	timerTime = setTimerTime();
	document.querySelector(".session-title").innerText = sessions[currentSession].title;
	setTimerText(getTimerTextNode());
}

function timerControl(e) {
	if (e.target.id == "start") {
		const startBtn = document.querySelector("button#start");
		startBtn.innerText = "Start";
		startBtn.setAttribute("disabled", "disabled");
		sessionStart = setInterval(() => {
			if (timerTime > 0) {
				timerTime--;
				console.log(timerTime);
				setTimerText(getTimerTextNode());
			} else {
				clearInterval(sessionStart);
				const startBtn = document.querySelector("button#start");
				startBtn.innerText = "Start";
				startBtn.removeAttribute("disabled");
				currentSession = currentSession == "work" ? "short" : "work";
				updatePom();
			}
		}, 1000);
	} else if (e.target.id == "stop") {
		clearInterval(sessionStart);
		const startBtn = document.querySelector("button#start");
		startBtn.removeAttribute("disabled");
		startBtn.innerText = "Resume";
	} else if (e.target.id == "reset") {
		clearInterval(sessionStart);
		const startBtn = document.querySelector("button#start");
		startBtn.innerText = "Start";
		startBtn.removeAttribute("disabled");
		timerTime = sessions[currentSession].length;
		setTimerText(getTimerTextNode());
	}
}

function updatePom() {
	document.querySelectorAll(".pom-btn").forEach(pomBtn => {
		if (pomBtn.id == currentSession) {
			pomBtn.classList.add("active");
		} else {
			pomBtn.classList.remove("active");
		}
		document.querySelector(".session-title").innerText = sessions[currentSession].title;
		timerTime = setTimerTime();
		setTimerText(getTimerTextNode());
	});
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
