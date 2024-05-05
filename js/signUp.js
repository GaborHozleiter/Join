let checkboxState = false;
/**
 * Initializes event listeners for UI elements related to the checkbox,
 * password input fields, and password visibility toggles upon DOM content fully loaded.
 * Only initializes on the sign-up page.
 */
if (window.location.href.includes("signUp.html")) {
 document.addEventListener("DOMContentLoaded", () => {
     checkboxState = false;
     document.querySelector(".signUp-button").disabled = true;
     const checkboxImg = document.getElementById("checkboxImg");
     checkboxImg.onclick = toggleCheckbox;
     document.getElementById("password").oninput = () =>
         handlePasswordInput("password");
     document.getElementById("confirmPw").oninput = () =>
         handlePasswordInput("confirmPw");
     document.getElementById("passwordIcon").onclick = () =>
         togglePasswordVisibility("password", "passwordIcon");
     document.getElementById("confirmPwIcon").onclick = () =>
         togglePasswordVisibility("confirmPw", "confirmPwIcon");
 });
}

/**
 * Toggles the state of the checkbox and updates the checkbox image
 * based on the current state. Enables or disables the sign-up button based on checkbox state.
 */
function toggleCheckbox() {
 checkboxState = !checkboxState;
 const checkboxImg = document.getElementById("checkboxImg");
 checkboxImg.src = checkboxState ? "../img/CheckboxCheck.png" : "../img/Checkbox.png";
 document.querySelector(".signUp-button").disabled = !checkboxState;
}

/**
 * Handles input events on password fields and updates the icon
 * to indicate whether the field is empty or contains text.
 */
function handlePasswordInput(fieldId) {
	const field = document.getElementById(fieldId);
	const iconId = fieldId + "Icon";
	const icon = document.getElementById(iconId);
	icon.src = field.value ? "../img/HidePassword.png" : "../img/Lock.png";
}

/**
 * Toggles the visibility of the password in the specified field
 * and updates the icon to reflect the current visibility state.
 */
function togglePasswordVisibility(fieldId, iconId) {
	const field = document.getElementById(fieldId);
	const icon = document.getElementById(iconId);

	if (!field.value) {
		return;
	}

	field.type = field.type === "password" ? "text" : "password";
	icon.src =
		field.type === "password"
			? "../img/HidePassword.png"
			: "../img/ShowPassword.png";
}

/**
 * Validates the form by ensuring the checkbox is checked and the passwords match.
 * Prevents form submission if validations fail.
 */
function validateForm(event) {
	event.preventDefault();
	const password = document.getElementById("password").value;
	const confirmPw = document.getElementById("confirmPw").value;

	if (!validateCheckbox() || !comparePasswords(password, confirmPw)) {
		return false;
	}
	addUser();
}

/**
 * Checks if the privacy policy checkbox is checked and alerts if not.
 */
function validateCheckbox() {
	if (!checkboxState) {
		alert("Please accept the privacy policy by clicking the checkbox.");
		return false;
	}
	return true;
}

/**
 * Compares the password and confirm password fields for equality.
 * Clears the fields and displays an error message if they do not match.
 */
function comparePasswords(password, confirmPw) {
	if (password !== confirmPw) {
		document.getElementById("password").value = "";
		document.getElementById("confirmPw").value = "";
		const wrongPwElement = document.querySelector(".wrongPw");
		wrongPwElement.style.color = "#FF8190";

		setTimeout(() => {
			wrongPwElement.style.color = "white";
		}, 3000);

		return false;
	}
	return true;
}

/**
 * Adds a new user to the users array and redirects to the login page.
 */
async function addUser() {
	let email = document.getElementById("email").value;
	let password = document.getElementById("password").value;
	let name = document.getElementById("name").value;
	createNewRegContact(name, email, "");
	let currentUsers = await getItem("users");
	if (!currentUsers) {
		currentUsers = [];
	}

	currentUsers.push({ name, email, password });
	await setItem("users", JSON.stringify(currentUsers));
	showPopup();
}

/**
 * Displays a popup message indicating successful sign-up and redirects after 1 second.
 */
function showPopup() {
	const popup = document.createElement("div");
	popup.className = "popup";
	popup.textContent = "You Signed Up successfully";

	const signUpField = document.querySelector(".signUpField");
	if (signUpField) {
		signUpField.appendChild(popup);
		popup.style.position = "absolute";
		popup.style.display = "flex";
	}

	setTimeout(() => {
		popup.style.display = "none";
		redirectToLogin();
	}, 1000);
}

/**
 * Redirects the user to the login page.
 */
function redirectToLogin() {
	window.location.href = "../html/logIn.html";
}
