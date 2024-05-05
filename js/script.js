const STORAGE_TOKEN = "BG6WOK154AJ68UO0AQPTHWG0N5RXRC9BZCQ9TZVT";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";
let users = [];
let contacts = [];
const userName = localStorage.getItem("userName");

/**
 * adds the initials of the current logged in User to the header circle
 */
function showUserInitials() {
	let initialsElement = document.getElementById("initials");
	if (userName) {
		const initials = userName
			.split(" ")
			.map((name) => name[0])
			.join("");
		initialsElement.textContent = initials;
	} else {
		initialsElement = "G";
	}
}

const prioButtons = [
	{
		priority: "urgent",
		activePrioImg: "../img/active-urgent.png",
		inactivePrioImg: "../img/prio-urgent.png",
	},
	{
		priority: "medium",
		activePrioImg: "../img/active-medium.png",
		inactivePrioImg: "../img/prio-medium.png",
	},
	{
		priority: "low",
		activePrioImg: "../img/active-low.png",
		inactivePrioImg: "../img/prio-low.png",
	},
];

let allTasks = [];

let titleInput;
let descriptionInput;
let selectedUsers = [];
let dateInput;
let activePrio = "../img/prio-medium.png";
let prioName;
let categoryInput;
let subtasks = [];
let toDoContainer = "to-do-container";

/**
 * includes header and sidemenu on a page
 */
async function includeHTML() {
	let includeElements = document.querySelectorAll("[w3-include-html]");
	for (let i = 0; i < includeElements.length; i++) {
		const element = includeElements[i];
		file = element.getAttribute("w3-include-html"); // "includes/header.html"
		let resp = await fetch(file);
		if (resp.ok) {
			element.innerHTML = await resp.text();
		} else {
			element.innerHTML = "Page not found";
		}
	}
}

/**
 * saves a value with a key and a token on the Server
 * @param {string} key
 * @param {object} value
 * @returns
 */
async function setItem(key, value) {
	const payload = { key, value, token: STORAGE_TOKEN };
	return fetch(STORAGE_URL, {
		method: "POST",
		body: JSON.stringify(payload),
	}).then((res) => res.json());
}

/**
 * loads a value with a specific key from the Server
 * @param {string} key
 * @returns value with the corresponding key
 */
async function getItem(key) {
	const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
	return fetch(url)
		.then((res) => res.json())
		.then((res) => {
			// Verbesserter code
			if (res.data && res.data.value) {
				res.data.value = JSON.parse(res.data.value);
				return res.data.value;
			}
			throw `Could not find data with key "${key}".`;
		});
}
