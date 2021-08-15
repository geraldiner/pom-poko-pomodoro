const sessions = {
	work: {
		length: 25,
		title: "Work Pom",
	},
	short: {
		length: 5,
		title: "Short Break",
	},
	long: {
		length: 15,
		title: "Long Break",
	},
};

let currentSession = "work";
let numberOfSessions = 0;
// let timerTime = sessions[currentSession].length * 60;
let timerTime = 3;
let timerMinText = `${getMinutes(timerTime)}`;
let secondsLeft = getSeconds(timerTime);
let timerSecText = secondsLeft >= 10 ? secondsLeft : `0${secondsLeft}`;
let sessionStart = undefined;

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
		console.log(e);
		const input = document.createElement("input");
		input.setAttribute("type", "text");
		input.setAttribute("value", parseInt(e.target.innerText));
		input.setAttribute("autofocus", "");
		input.addEventListener("focusout", () => {
			sessions[currentSession].length = parseInt(input.value);
			const span = document.createElement("span");
			span.setAttribute("class", "timer-text");
			span.innerText = `${input.value}:00`;
			input.replaceWith(span);
		});
		e.target.replaceWith(input);
	}
}

function setSession(e) {
	document.querySelector(".pom-btn.active").classList.remove("active");
	e.target.classList.add("active");
	currentSession = e.target.id;
	document.querySelector(".session-title").innerText = sessions[currentSession].title;
	document.querySelector(".timer-text").innerText = `${sessions[currentSession].length}:00`;
}

function timerControl(e) {
	if (e.target.id == "start") {
		// timerTime = sessions[currentSession].length * 60;
		sessionStart = setInterval(() => {
			if (timerTime > 0) {
				timerTime--;
				console.log(timerTime);
				timerMinText = `${getMinutes(timerTime)}`;
				secondsLeft = getSeconds(timerTime);
				timerSecText = secondsLeft >= 10 ? `${secondsLeft}` : `0${secondsLeft}`;
				document.querySelector(".timer-text").innerText = `${timerMinText}:${timerSecText}`;
			} else {
				clearInterval(sessionStart);
				currentSession = currentSession == "work" ? "short" : "work";
				updatePom();
			}
		}, 1000);
	} else if (e.target.id == "stop") {
		clearInterval(sessionStart);
	} else if (e.target.id == "reset") {
		clearInterval(sessionStart);
		timerTime = sessions[currentSession].length;
		document.querySelector(".timer-text").innerText = `${sessions[currentSession].length}:00`;
	}
}

function updatePom() {
	console.log(currentSession);
	document.querySelectorAll(".pom-btn").forEach(pomBtn => {
		if (pomBtn.id == currentSession) {
			pomBtn.classList.add("active");
		} else {
			pomBtn.classList.remove("active");
		}
		document.querySelector(".session-title").innerText = sessions[currentSession].title;
		document.querySelector(".timer-text").innerText = `${sessions[currentSession].length}:00`;
		timerTime = 3;
	});
}

function getMinutes(seconds) {
	return Math.floor(seconds / 60);
}

function getSeconds(seconds) {
	return Math.floor(seconds % 60);
}

window.addEventListener("load", () => {
	document.querySelector(".timer-text").innerText = `${timerMinText}:${timerSecText}`;
});
