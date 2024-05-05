const searchUserInput = document.querySelector("#assigned-to-input");

/**
 * initialises the addTask site
 */
async function initAddTask() {
	await includeHTML();
	showUserInitials();
	allTasks = await getItem("allTasks");
	contacts = await getItem("contacts");
}

/**
 * checks if a user clicks inside of the input field or not and closes the userList dropdown accordingly
 */
document.addEventListener("DOMContentLoaded", function () {
	document.body.addEventListener("click", function (event) {
		userList = document.getElementById("user-list");
		let inputContainer = document.querySelector("#assigned-to-input");
		let isClickInsideUserList = userList && userList.contains(event.target);
		let isClickInsideInputContainer =
			inputContainer && inputContainer.contains(event.target);

		if (!isClickInsideUserList && !isClickInsideInputContainer) {
			closeUserList(userList);
		}
	});
});

/**
 * remove input date typing and sets min value to current date
 */
document.addEventListener("click", function () {
	// Check if the input field exists
	let inputField = document.getElementById("due-date-input");
	if (inputField) {
		// Get the current date
		let currentDate = new Date().toISOString().split("T")[0];
		inputField.setAttribute("min", currentDate);
		inputField.addEventListener("keydown", function (event) {
			event.preventDefault();
		});
	}
});

/**
 * hides the userList dropdown
 * @param {HTMLElement} userList
 */
function closeUserList(userList) {
	if (userList) {
		userList.classList.add("d-none");
		document.querySelector("#assigned-arrow").src =
			"../img/arrow-drop-down.png";
	}
}
/**
 * checks if user List is already opened and either closes or opens it
 */
function openUserList() {
	let userList = document.querySelector("#user-list");
	let arrow = document.querySelector("#assigned-arrow");
	if (userList.classList.contains("d-none")) {
		userList.classList.remove("d-none");
		arrow.src = "../img/arrow-drop-up.png";
		renderUsers();
	} else {
		userList.classList.add("d-none");
		arrow.src = "../img/arrow-drop-down.png";
	}
}

/**
 *  iterates over all contacts
 * @param {HTMLElement} userList
 */
function renderUsers() {
	let userList = document.querySelector("#user-list");
	userList.innerHTML = "";
	for (let i = 0; i < contacts.length; i++) {
		const contact = contacts[i];
		if (contact.addTask == false) {
			userList.innerHTML += createUnselectedUserHtml(contact, i);
		} else {
			userList.innerHTML += createSelectedUserHtml(contact, i);
		}
	}
}

/**
 * checks if the assigned users input is empty or not
 * if it is empty it renders all users
 * if not it calls the updateAssignedUserList function
 */
function filterUsers() {
	let searchUserInput = document
		.getElementById("assigned-to-input")
		.value.toLowerCase();
	if (
		searchUserInput == null ||
		searchUserInput == "" ||
		searchUserInput < 1
	) {
		renderUsers();
	} else {
		updateAssignedUserList(searchUserInput);
	}
}

/**
 * hides all users that do not contain the search input in their name
 * @param {string} searchUserInput
 */
function updateAssignedUserList(searchUserInput) {
	for (let i = 0; i < contacts.length; i++) {
		const contactName = contacts[i].name.toLowerCase();
		let currentContainer = document.getElementById(`user${i}`);
		if (!contactName.includes(searchUserInput)) {
			currentContainer.classList.add("d-none");
		} else {
			currentContainer.classList.remove("d-none");
		}
	}
}

/**
 * checks if a user is already assigned and adjustes the design accordingly
 * @param {number} i
 */
function selectedUser(i) {
	let currentUser = document.querySelector(`#user${i}`);
	let userCapitals = document.querySelector(`#user-capitals-${i}`).textContent;
	let image = currentUser.querySelector("img");

	if (!currentUser.classList.contains("active-user")) {
		setActiveUser(currentUser, userCapitals, image, i);
		contacts[i]["addTask"] = true;
	} else {
		deactivateUser(currentUser, i, image);
		contacts[i]["addTask"] = false;
	}
}

/**
 * creates an object for every selected users
 * @param {HTMLElement} currentUser
 * @param {string} userCapitals
 * @param {HTMLElement} image
 * @param {number} i
 */
function setActiveUser(currentUser, userCapitals, image, i) {
	let selectedUserName = document.querySelector(
		`#full-user-name-${i}`
	).textContent;
	let userColor = contacts[i].color;
	currentUser.classList.add("active-user");
	image.src = "../img/checkbox-check-white.png";
	let selectedUserList = {
		userCapitals: userCapitals,
		fullUserNames: selectedUserName,
		circleColor: userColor,
	};
	selectedUsers.push(selectedUserList);
	renderSelectedUsers();
}

/**
 * removes a user from the selected Users JSON if a user is beeing unselected
 * @param {HTMLElement} currentUser
 * @param {number} i
 * @param {HTMLElement} image
 */
function deactivateUser(currentUser, i, image) {
	currentUser.classList.remove("active-user");
	image.src = "../img/Checkbox.png";
	const index = selectedUsers.findIndex(
		(currentUser) =>
			currentUser.fullUserNames ===
			document.querySelector(`#full-user-name-${i}`).textContent
	);
	if (index !== -1) {
		selectedUsers.splice(index, 1);
		renderSelectedUsers();
	}
}

/**
 * calls all priority buttons and calls functions to set the design and values accordingly
 * @param {string} priority
 */
function setPrio(priority) {
	let allBtns = document.getElementsByClassName("prio");
	setPrioColor(allBtns, priority);
	setPrioImage(priority);
}

/**
 * iterates through all Buttons and removes a possible active class after that assigns active class to selected button
 * @param {HTMLElement} allBtns list of all Buttons
 * @param {String} priority property selected button
 */
function setPrioColor(allBtns, priority) {
	for (let i = 0; i < allBtns.length; i++) {
		allBtns[i].classList.remove("active-urgent");
		allBtns[i].classList.remove("active-medium");
		allBtns[i].classList.remove("active-low");
	}
	let prioBtn = document.getElementById(priority);
	if (prioBtn) {
		prioBtn.classList.add("active-" + priority);
		prioName = priority;
	}
}

/**
 * iterates over priority-JSON and compares the selected Button with every priority.
 * If prioritys are equal it changes the img.src attr. of the buttons Image.
 * If they are not the same it resets the img.sry attr. to the original value.
 * sets activePrio to the specific src value
 * @param {string} priority
 */
function setPrioImage(priority) {
	let prioImages = document.getElementsByClassName("prio-image");
	for (let i = 0; i < prioButtons.length; i++) {
		const element = prioButtons[i];
		if (element["priority"] === priority) {
			prioImages[i].src = prioButtons[i]["activePrioImg"];
			activePrio = prioButtons[i]["inactivePrioImg"];
		} else {
			prioImages[i].src = prioButtons[i]["inactivePrioImg"];
		}
	}
}

/**
 * adjusts the subtask input icons when input is active
 */
function activateInput() {
	let addSubtask = document.getElementById("add-subtask");
	let subtasksInputActions = document.getElementById("subtask-input-actions");

	addSubtask.classList.add("d-none");
	subtasksInputActions.classList.remove("d-none");
}

/**
 * sets the focus to the subtask input if the user clicks the plus icon
 */
function setFocus() {
	document.getElementById("subtask-input").focus();
}

/**
 * deactivates the subtask input if the user clicks the cross icon
 */
function deactivateInput() {
	let addSubtask = document.querySelector("#add-subtask");
	let subtasksInputActions = document.querySelector("#subtask-input-actions");

	addSubtask.classList.remove("d-none");
	subtasksInputActions.classList.add("d-none");
	document.querySelector("#subtask-input").value = "";
}

/**
 * checks if the user pressed enter
 * prevents form submit and submits new subtask instead
 * @param {event} event
 */

function checkSubmit(event) {
	if (event.key === "Enter") {
		event.preventDefault();
		submitSubtask();
	}
}

/**
 * gets the value of the subtask input and creates a new object if the input is not empty
 */
function submitSubtask() {
	let subtaskContent = document.querySelector("#subtask-input").value;
	if (subtaskContent == "") {
		deactivateInput();
	} else {
		let newSubtask = {
			subtaskName: subtaskContent,
			done: false,
		};
		subtasks.push(newSubtask);
		document.querySelector("#subtask-input").value = "";
		renderSubtasks();
		deactivateInput();
	}
}

/**
 * deletes the currently selected subtask
 * @param {number} i
 */
function deleteSubtask(i) {
	subtasks.splice(i, 1);
	renderSubtasks();
}

/**
 * opens the edit subtask window and displays the current value in the input field
 * @param {number} i
 */
function editSubtask(i) {
	let subtaskContent = document.querySelector(`#subtask-element${i}`);
	let editContainer = document.getElementById("edit-subtask-container");
	let subtaskEditInput = document.querySelector(`#edit-subtask-${i}`);
	subtaskContent.classList.add("d-none");
	editContainer.classList.remove("d-none");
	document.getElementById(`edit-subtask-${i}`).focus();
	subtaskEditInput.value = subtasks[i].subtaskName;
}

/**
 * checks if the user pressed enter on editing a subtask
 * prevents form submit and submits subtask change instead
 * @param {number} i
 * @param {event} event
 */
function checkEditSubmit(i, event) {
	if (event.key === "Enter") {
		event.preventDefault();
		submitChange(i);
	}
}

/**
 * updates the current subtask to it's new value
 * @param {number} i
 */
function submitChange(i) {
	let newSubtaskContent = document.querySelector(`#edit-subtask-${i}`).value;
	subtasks[i].subtaskName = newSubtaskContent;
	renderSubtasks();
}

/**
 * calls validation function for all required input fields
 * redirectes the user to the board site if he is currently on add Task site
 * @param {event} event
 */
async function createTask() {
	titleInput = validateField("#title-input", "#error-title");
	descriptionInput = document.querySelector("#description-input").value;
	dateInput = validateField("#due-date-input", "#error-due-date");
	categoryInput = validateField("#category-input", "#error-category");
	let sliderBG = document.getElementById("slider-bg");

	if (titleInput && dateInput && categoryInput) {
		sliderBG.classList.remove("d-none");
		await pushTask();
	}
}

/**
 * checks if the input field is empty
 * if it is empty, the required design is beeing enabled
 * @param {string} fieldId
 * @param {string} errorId
 * @returns
 */
function validateField(fieldId, errorId) {
	let field = document.querySelector(fieldId);
	let errorContainer = document.querySelector(errorId);

	if (field.value.trim() !== "") {
		field.classList.remove("input-error");
		errorContainer.classList.add("d-none");
		return field.value.trim();
	} else {
		field.classList.add("input-error");
		errorContainer.classList.remove("d-none");
		return null;
	}
}

/**
 * gets the value of the category selection
 * @returns value of the selected option
 */
function getCategory() {
	selectElement = document.querySelector("#category-input");
	output = selectElement.value;
	return output;
}

/**
 * sets the background color for the specified category on cards
 * @param {number} taskIndex
 * @returns
 */
function setCategoryColor(taskIndex) {
	let task = allTasks[taskIndex];
	if (task.category === "User Story") {
		return "#0038FF";
	} else {
		return "#1FD7C1";
	}
}

/**
 * gets all input values and updates the allTasks JSON on the server
 */
async function pushTask() {
	let newTask = {
		title: titleInput,
		description: descriptionInput,
		users: selectedUsers,
		date: dateInput,
		priority: activePrio,
		prioName: prioName,
		category: categoryInput,
		subtasks: subtasks,
		subtaskCounter: 0,
		cardContainer: toDoContainer,
		id: allTasks.length > 0 ? allTasks[allTasks.length - 1].id + 1 : 0,
	};
	allTasks.push(newTask);
	await setItem("allTasks", allTasks);
	resetForm();
	showSlider();
}

/**
 * shows success slider if a new task was pushed successfully
 */
function showSlider() {
	document
		.querySelector(".task-added-slider")
		.classList.remove("task-added-transition-remove");
	document
		.querySelector(".task-added-slider")
		.classList.add("task-added-transition");
	setTimeout(() => {
		document
			.querySelector(".task-added-slider")
			.classList.remove("task-added-transition");
		document
			.querySelector(".task-added-slider")
			.classList.add("task-added-transition-remove");
		setTimeout(() => {
			let sliderBG = document.getElementById("slider-bg");
			sliderBG.classList.add("d-none");
			redirectToBoard();
		}, 900);
	}, 900);
}

/**
 * checks current window location and sends user to board.html
 */
async function redirectToBoard() {
	if ((window.location.href = "../html/board.html")) {
		await initBoard();
	} else {
		window.location.href = "../html/board.html";
	}
}

/**
 * resets the value of every input field and emptys arrays
 */
function resetForm() {
	resetAssignedUsers();
	document.getElementById("title-input").value = "";
	document.getElementById("description-input").value = "";
	document.getElementById("due-date-input").value = "";
	resetCategoryInput();
	selectedUsers = [];
	renderSelectedUsers();
	setPrio("medium");
	prioName = "medium";
	subtasks = [];
	toDoContainer = "to-do-container";
	renderSubtasks();
}

function resetCategoryInput() {
	let field = document.getElementById("category-input");
	if (field) {
		field.value = "1";
	}
}

/**
 * resets the addTask value for every contact in the contacts JSON
 */
function resetAssignedUsers() {
	contacts.forEach((contact) => {
		contact.addTask = false;
	});
}
