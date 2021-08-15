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
let timerTime = 10;
let timerMinText = `${getMinutes()}`;
let timerSecText = `${getSeconds()}`;
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
	console.log(currentSession, numberOfSessions);
	if (e.target.id == "start") {
		sessionStart = setInterval(() => {
			if (timerTime > 0) {
				timerTime--;
				console.log(timerTime);
				timerMinText = `${getMinutes(timerTime)}`;
				let secondsLeft = getSeconds(timerTime);
				timerSecText = secondsLeft > 10 ? `${secondsLeft}` : `0${secondsLeft}`;
				document.querySelector(".timer-text").innerText = `${timerMinText}:${timerSecText}`;
			} else {
				clearInterval(sessionStart);
			}
		}, 1000);
	} else if (e.target.id == "stop") {
		console.log("hi");
		clearInterval(sessionStart);
	}
}

function getMinutes(seconds) {
	return Math.floor(seconds / 60);
}

function getSeconds(seconds) {
	return Math.floor(seconds % 60);
}
