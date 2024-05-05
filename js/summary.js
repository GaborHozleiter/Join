let toDoAmount = document.getElementById('toDoAmount');
let inProgressAmount = document.querySelector('.summaryProgress');
let awaitFeedbackAmount = document.querySelector('.summaryFeedback');
let doneAmount = document.querySelector('.summaryDone');
let allTasksAmount = document.querySelector('.summaryAllTasks');
let formattedDate;
let urgentCounter = 0;

/** calls several functions and sets the counter for Tasks on Board */
async function initSummary() {
	await includeHTML();
	showUserInitials();
	allTasks = await getItem('allTasks');
	getAllCounters();
	getUrgentTasks();
	greet();
	allTasksAmount.innerHTML = allTasks.length;
	if (allTasks.length > 0) {
		findNearestDateObject();
	}
}

/**
 * iterates over every Task to find the Task with the deadline closest to the current date
 */
function findNearestDateObject() {
	const currentDate = new Date();
	let nearestDateObject;
	let nearestDateDiff = Infinity;

	allTasks.forEach((task) => {
		const taskDate = new Date(task.date);
		const diff = Math.abs(taskDate - currentDate);
		if (diff < nearestDateDiff) {
			nearestDateDiff = diff;
			nearestDateObject = task;
		}
	});
	formatDate(nearestDateObject.date);
}

/**
 * formats the date to the en-US design
 * @param {string} dateString
 */
function formatDate(dateString) {
	const date = new Date(dateString);
	const options = { year: 'numeric', month: 'long', day: 'numeric' };
	formattedDate = date.toLocaleDateString('en-US', options);
	document.getElementById('mid-row-date').innerHTML = formattedDate;
}

/**
 * iterates over all Tasks and updates counters according to their container
 * displays the numbers to the according containers
 */
function getAllCounters() {
	let taskCounts = {
		'to-do-container': 0,
		'in-progress-container': 0,
		'await-feedback-container': 0,
		'done-container': 0,
	};
	for (const key in allTasks) {
		if (allTasks.hasOwnProperty(key) && allTasks[key].hasOwnProperty('cardContainer')) {
			taskCounts[allTasks[key].cardContainer]++;
		}
	}
	toDoAmount.innerHTML = taskCounts['to-do-container'];
	inProgressAmount.innerHTML = taskCounts['in-progress-container'];
	awaitFeedbackAmount.innerHTML = taskCounts['await-feedback-container'];
	doneAmount.innerHTML = taskCounts['done-container'];
}

/**
 * gets the number of all urgent tasks in board and displays them
 */
function getUrgentTasks() {
	allTasks.forEach((task) => {
		if (task.prioName === 'urgent') {
			urgentCounter++;
		}
	});
	document.getElementById('urgent-counter').innerHTML = urgentCounter;
}

/**
 * greets the user with a certain text depending on the time of day
 */
function greet() {
	const currentTime = new Date();
	const currentHour = currentTime.getHours();
	let container = document.getElementById('greeting-text');
	let greeting;

	if (currentHour >= 3 && currentHour <= 10) {
		greeting = 'Good Morning';
	} else if (currentHour >= 11 && currentHour <= 12) {
		greeting = 'Good Day';
	} else if (currentHour >= 13 && currentHour <= 17) {
		greeting = 'Good Afternoon';
	} else {
		greeting = 'Good Evening';
	}
	container.innerHTML = greeting;
}
